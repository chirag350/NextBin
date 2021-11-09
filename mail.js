const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
/**
 * Sends the verification email.
 * @param {String} email 
 * @param {String} username 
 * @param {String} identity 
 * @returns {Boolean} true if the email was sent, false otherwise.
 */
export async function sendEmail(email, username, identity) {
    var message = {
        from: `no-reply@${process.env.SMTP_DOMAIN}`,
        to: email,
        subject: `Verify your account`,
        text: `Hello there ${username},\n\nPlease verify your email here: ${process.env.BIN_URL}/api/verify?username=${username}&token=${identity}\n\nIf you didn't register, please ignore this email.`,
        html: `<p>Hello there ${username},\n\nPlease verify your email here: <a href="${process.env.BIN_URL}/api/verify?username=${username}&token=${identity}">Here</a>\n\nIf you didn't register, please ignore this email.</p>`
    };
    transporter.sendMail(message, (err, info) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}