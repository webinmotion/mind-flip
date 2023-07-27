const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');
const uuid = require('uuid');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const {verify} = require("jsonwebtoken");

const dbConfig = new Config('local-json-db', true, false, '/');
const db = new JsonDB(dbConfig);

async function handleRegister(req, res, next) {
    const id = uuid.v4();
    const path = `/user/${id}`;
    try {
        const temp_secret = speakeasy.generateSecret();
        console.log(JSON.stringify(temp_secret));
        await db.push(path, {id, temp_secret});
        const {base32, otpauth_url} = temp_secret;
        res.json({id, secret: base32, otpauth_url});
    } catch (e) {
        next(e);
    }
}

async function handleQrcode(req, res, next) {
    const {auth_url} = req.params;
    QRCode.toDataURL(auth_url, (err, data_url) => {
        if (err) {
            next(err);
            return;
        }
        console.log(data_url);
        res.status(200).send(`<img src="${data_url}" />`)
    });
}

async function handleVerify(req, res, next) {
    const {id, mfa_code} = req.params;
    const path = `/user/${id}`;
    try {
        const user = await db.getData(path);
        const {base32: secret} = user.temp_secret;
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: mfa_code,
        });
        if (verified) {
            await db.push(path, {id, secret: user.temp_secret});
        }
        res.json({verified})
    } catch (e) {
        next(e);
    }
}

async function handleValidate(req, res, next) {
    const {id, mfa_code} = req.params;
    const path = `/user/${id}`;
    try {
        const user = await db.getData(path);
        const {base32: secret} = user.secret;
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: mfa_code,
            window: 1,
        });
        res.json({verified})
    } catch (e) {
        next(e);
    }
}

module.exports = {
    handleRegister,
    handleQrcode,
    handleVerify,
    handleValidate,
}