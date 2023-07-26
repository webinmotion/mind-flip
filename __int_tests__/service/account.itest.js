const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('dotenv').config({ path: path.join(process.cwd(), '.env.test.local') });
const { execute } = require('../../repo');
const { registerNewPlayer, verifyRegistrationEmail, resetVerificationCode, dropGuestPlayer, registerNewAccount } = require('../../service/account');

describe("Testing database queries against live database", () => {

    /**
     * Initialize database
     */
    beforeAll(async () => {
        const schema = fs.readFileSync(path.resolve(process.cwd(), 'schema/mind-flip.sql'),
            { encoding: 'utf8', flag: 'r' });

        const statements = schema.split(";");
        for (let statement of statements) {
            let res = await execute(statement.trim(), []);
            console.log(res);
        };
    });

    test('using an unknown player_type should throw an error', async () => {
        const parameters = { player_type: 'bad player type' };
        await expect(registerNewPlayer(parameters)).rejects.toThrow(
            "Invalid player type. Expected one of (guest|registered|business)"
        );
    });

    test('registering guest player without an email should throw an error', async () =>  {
        const parameters = { player_type: 'guest' };
        await expect(registerNewPlayer(parameters)).rejects.toThrow(
            "A valid email address is a required for registration as a player"
        );
    });

    async function nonGuestWithoutScreenName() {
        var res = await registerNewPlayer({ player_type: 'registered' });
        console.log(res);
    }

    // nonGuestWithoutScreenName();

    async function conflictingScreenName() {
        var res = await registerNewPlayer({ player_type: 'guest', screen_name: 'crocked pots' });
        console.log(res);
    }

    // conflictingScreenName();

    async function successfulGuestRegistration() {
        var res = await registerNewPlayer({ player_type: 'guest', screen_name: 'doughnuts', email_address: 'happy.camper@venus.com' });
        console.log(res);
    }

    // successfulGuestRegistration();

    async function emailVerificationWithInvalidCode(email_address, verification_code) {
        var res = await verifyRegistrationEmail(email_address, verification_code);
        console.log(res);
    }

    // emailVerificationWithInvalidCode('happy.camper@venus.com', 'fake code');

    async function emailVerificationWithValidCode(email_address, verification_code) {
        var res = await verifyRegistrationEmail(email_address, verification_code);
        console.log(res);
    }

    // emailVerificationWithValidCode('happy.camper@venus.com', '1c99644b-e515-4a91-b25c-02f7403ee57f');

    async function resetVerificationCodeWithInvalidEmail(email_address) {
        var res = await resetVerificationCode(email_address);
        console.log(res);
    }

    // resetVerificationCodeWithInvalidEmail('fake_email@domain.com');

    async function resetVerificationCodeWithValidEmail(email_address) {
        var res = await resetVerificationCode(email_address);
        console.log(res);
    }

    // resetVerificationCodeWithValidEmail('happy.camper@venus.com');

    async function dropPlayerUsingInvalidScreenName(email_address) {
        var res = await dropGuestPlayer(email_address);
        console.log(res);
    }

    // dropPlayerUsingInvalidScreenName('fake screen name');

    async function dropPlayerUsingValidScreenName(email_address) {
        var res = await dropGuestPlayer(email_address);
        console.log(res);
    }

    // dropPlayerUsingValidScreenName('doughnuts');

    async function registerAccountWithoutEmail() {
        var res = await registerNewAccount({});
        console.log(res);
    }

    // registerAccountWithoutEmail();

    async function successfulNonGuestRegistration(player) {
        var res = await registerNewPlayer(player);
        console.log(res);
    }

    // successfulNonGuestRegistration({ player_type: 'registered', screen_name: 'doughnuts', email_address: 'happy.camper@venus.com' });

    async function registerAccountUsingInvalidEmail(creds) {
        var res = await registerNewAccount(creds);
        console.log(res);
    }

    // registerAccountUsingInvalidEmail({username: 'thirsty_whale', email_address: 'fake_email@domain.com'});

    async function registerAccountUsingUnverifiedEmail(creds) {
        var res = await registerNewAccount(creds);
        console.log(res);
    }

    // registerAccountUsingUnverifiedEmail({username: 'thirsty_whale', email_address: 'happy.camper@venus.com'});

    async function emailVerificationWithValidCode(email_address, verification_code) {
        var res = await verifyRegistrationEmail(email_address, verification_code);
        console.log(res);
    }

    // emailVerificationWithValidCode('happy.camper@venus.com', '003022c0-252b-483f-b646-1e8a801cd933');

    async function registerAccountHavingUsernameConflict(creds) {
        var res = await registerNewAccount(creds);
        console.log(res);
    }

    // registerAccountHavingUsernameConflict({username: 'thirsty_whale', email_address: 'happy.camper@venus.com', userpass: 'dancing robots'});

    async function registerAccountSuccessfully(creds) {
        var res = await registerNewAccount(creds);
        console.log(res);
    }

    // registerAccountSuccessfully({username: 'blue_ribbons', email_address: 'happy.camper@venus.com', userpass: 'dancing robots'});

});