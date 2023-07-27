const USERNAME_REGEX = /^[a-zA-Z][a-z-A-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_ADDR_REGEX = /^\b[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}\b$/;

export function validateUsername(username, onComplete) {
    if (!username) {
        onComplete('username is a required field');
    } else if (!USERNAME_REGEX.test(username)) {
        onComplete('username should be 4 to 24 characters long, must begin with a letter, and have only the following valid characters - letters, digits, underscores or hyphens');
    } else {
        onComplete();
    }
}

export function validatePassword(password, onComplete) {
    if (!password) {
        onComplete('password is a required field');
    } else if (!PASSWORD_REGEX.test(password)) {
        onComplete('password should be 8 to 24 characters long, and should contain a lowercase letter, uppercase letter, a digit and one of these special characters - !@#$%');
    } else {
        onComplete();
    }
}

export function validateEmailAddress(email_address, onComplete) {
    if (!email_address) {
        onComplete('email address is a required field');
    } else if (!EMAIL_ADDR_REGEX.test(email_address)) {
        onComplete('email address format is not valid');
    } else {
        onComplete();
    }
}

export function validateScreenName(screen_name, onComplete) {
    if (!screen_name) {
        onComplete('screen name is a required field');
    } else {
        onComplete();
    }
}