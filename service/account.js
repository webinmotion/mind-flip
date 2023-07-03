const { execute } = require('../repo');
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

const checkTableRecordExists = async ({ table, column, value }) => {
    return await execute(`select exists(select 1 from ${table} where ${column}=$1)`, [value]);
}

const registerNewPlayer = async ({ screen_name, email_address, player_type, city, state, country }) => {
    if (!/(guest|registered|business)/i.test(player_type)) {
        throw Error('Invalid player type. Expected one of (guest|registered|business)');
    }

    if (email_address) {
        let result = await checkTableRecordExists({ table: 'tbl_player', column: 'email_address', value: email_address });
        let { exists } = result[0];
        if (exists) {
            throw Error(`The email address '${email_address}' is already taken`)
        }
    }
    else {
        throw Error('A valid email address is a required for registration as a player');
    }

    if (screen_name) {
        let result = await checkTableRecordExists({ table: 'tbl_player', column: 'screen_name', value: screen_name });
        let { exists } = result[0];
        if (exists) {
            throw Error(`The screen name '${screen_name}' is already taken`)
        }
    }
    else {
        if (/guest/i.test(player_type)) {
            let fake_screen_name = faker.internet.userName();
            let result = await checkTableRecordExists({ table: 'tbl_player', column: 'screen_name', value: fake_screen_name });
            let { exists } = result[0];
            while (exists) {
                fake_screen_name = faker.internet.userName();
                result = await checkTableRecordExists({ table: 'tbl_player', column: 'screen_name', value: fake_screen_name });
                exists = result[0]?.exists;
            }
            screen_name = fake_screen_name;
        }
        else {
            throw Error('A screen name is required to register as a non-guest player')
        }
    }

    //looking good to start registration
    const verification_code = faker.string.uuid();
    let result = await execute(`insert into tbl_player (screen_name, email_address, verification_code, player_type, city, state, country) 
    values ($1, $2, $3, $4, $5, $6, $7) returning player_id, date_joined`,
        [screen_name, email_address, verification_code, player_type, city || '', state || '', country || '']);

    if (result?.length > 0) {
        //send email with verification email
        const verificationLink = `${process.env.SERVER_HOST_URL}/account/verify?verification_code=${verification_code}&email_address=${email_address}`;
        console.log('email verification link', verificationLink);

        //send response
        return ({ screen_name, email_address, verification_code, player_type, city, state, country, ...result[0] });
    }
    else {
        throw Error('Player record creation failed. Please report this incident through the contact page');
    }
}

const dropGuestPlayer = async (screen_name) => {
    let result = await execute(`with target_record as (select player_id from tbl_player where screen_name = $1)
    delete from tbl_player where player_id = (select player_id from target_record) returning player_id`,
        [screen_name]);
    return result[0];
}

const registerNewAccount = async ({ username, userpass, email_address }) => {
    if (!email_address) {
        throw Error('A registered email address is required to open an account');
    }
    else {
        let result = await checkTableRecordExists({ table: 'tbl_player', column: 'email_address', value: email_address });
        if (!result[0].exists) {
            throw Error(`'${email_address}' is not yet registered. Register a player first`);
        }

        let existing_player = await execute(`select player_id, verified_email, player_type from tbl_player P where P.email_address = $1`,
            [email_address]);

        let { player_id, verified_email, player_type } = existing_player[0];

        if (player_type === 'guest') {
            throw Error(`'${email_address}' is already registered as a guest player`);
        }

        //TODO: consider email verification - is it necessary during creation time or should it be addressed later on?
        // if (!verified_email) {
        //     throw Error(`'${email_address}' is already registered but still unverified`);
        // }

        let existing_username = await execute(`select exists(select 1 from tbl_account where username = $1)`, [username]);
        let { exists } = existing_username[0];
        if (exists) {
            throw Error('The username provided is already in use');
        }

        let registration = await execute(`insert into tbl_account (username, userpass, player_fk) values ($1, $2, $3::uuid) 
        returning account_id, account_role`, [username, userpass, player_id]);
        return { username, player_id, verified_email, ...registration[0] }
    }
}

const verifyRegistrationEmail = async ({ email_address, verification_code }) => {
    let result = await execute(`with target_record as (select player_id from tbl_player where email_address = $1 and verification_code = $2)
    update tbl_player set verified_email = true where player_id = (select player_id from target_record) returning verified_email`,
        [email_address, verification_code]);
    const verified_email = result[0]?.verified_email;
    return { email_address, verified: verified_email || false };
}

const resetVerificationCode = async (email_address) => {
    const verification_code = faker.string.uuid();
    let result = await execute(`with target_record as (select player_id from tbl_player where email_address = $1)
    update tbl_player set verification_code = $2, verified_email = false where player_id = (select player_id from target_record) returning verified_email`,
        [email_address, verification_code]);

    //send email with verification email
    const verificationLink = `${process.env.SERVER_HOST_URL}/account/verify?verification_code=${verification_code}&email_address=${email_address}`;
    console.log('email verification link', verificationLink);

    //send response
    const verified_email = result[0]?.verified_email;
    return { email_address, verified_email, verification_code };
}

const verifyLoginAttempt = async ({ username, password }) => {
    if (!username || !password) {
        throw Error("Username or Password missing")
    }

    let result = await execute('select * from tbl_account where username = $1', [username]);
    if (result?.length == 0) {
        throw Error("No account exists with the supplied username");
    }

    let success = await bcrypt.compare(password, result[0].userpass);
    if (!success) {
        throw Error("Login attempt was not successful");
    }

    const { account_id, is_active, player_fk, account_role } = result[0]

    return { account_id, username, is_active, player_fk, account_role };
}

const resetLoginPassword = async ({ username, password }) => {
    if (!username || !password) {
        throw Error("Username or Password missing")
    }

    let exists = await execute('select exists (select 1 from tbl_account where username = $1)', [username]);
    if (!exists) {
        throw Error("No account exists with the supplied username");
    }

    let update = await execute('update tbl_account set userpass = $1, is_active = true where username = $2 returning account_id',
        [password, username]);
    return { username, ...update[0] }
}

const fetchPlayerById = async (player_id) => {
    const result = await execute('select p.* from tbl_player p where p.player_id = $1', [player_id]);
    return (result.length > 0 && result[0]) || null;
}

module.exports = {
    registerNewPlayer,
    dropGuestPlayer,
    verifyRegistrationEmail,
    resetVerificationCode,
    registerNewAccount,
    verifyLoginAttempt,
    resetLoginPassword,
    fetchPlayerById,
}