const path = require('path');
const env = require('dotenv');

//load env variables
env.config({path: path.resolve(process.cwd(), '.env.local')})
console.log(process.env.HEALTHY_MESSAGE);

//test game clock
async function testing() {
    const GameClock = require("./GameClock");
    const delay = 3000;
    console.log('starting clock with %d millis delay', delay);
    let clock = new GameClock(delay);

    await clock.pause();

    console.log('exiting clock after for %d millis pause', delay);
}

testing().then(r => console.log("exiting testing"));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Do you want to test sending an email (y|N)?', yes => {
    readline.close();

    if (yes === 'y' || yes === 'Y') {
        // test brevo sending email
        const SibApiV3Sdk = require('sib-api-v3-sdk');
        let defaultClient = SibApiV3Sdk.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDINBLUE_API_TOKEN;

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "My {{params.subject}}";
        sendSmtpEmail.htmlContent = "<html lang='en'><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
        sendSmtpEmail.sender = {"name": "Site Admin", "email": "administrator@akilisha.com"};
        sendSmtpEmail.to = [{"email": "mainacell@gmail.com", "name": "Zes Ty"}];
        // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
        // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
        sendSmtpEmail.replyTo = {"email": "info@akilisha.com", "name": "Info Desk"};
        sendSmtpEmail.headers = {"Some-Custom-Name": "unique-id-1234"};
        sendSmtpEmail.params = {"parameter": "My param value", "subject": "New Subject"};

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
            console.error(error);
        });
    }
});