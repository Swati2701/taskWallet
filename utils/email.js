/* eslint-disable*/
const nodemailer = require('nodemailer');
//require('dotenv').config({ path: './config.env' });

async function sendEmail(email, token, code) {
    try{
        const senderAddress = 'test@gmail.com';
        let toAddress = email;
        let subject = "verify your email";
        let html = `<!DOCTYPE>
        <html>
        <body>
        <p>Please verify your email address:</p> <b> ${token} </b>
        <p>Please use this code while login: </p> <b> ${code} </b>
        </body>
        </html>`;

        let transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
  }
          });

        let mailOptions = {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: html
        };

        let info = await transport.sendMail(mailOptions);
        return { error: false };

    } catch (error){
        console.log("send email error", error);
        return{
            error: true,
            message: "cannot send email"
        }
    }
}



async function sendTransactionDetails(TransactionsDetails, email) {
    try{
        const senderAddress = 'noreply@gmail.com';
        let toAddress = email;
        let subject = "Transaction Details";
        console.log(toAddress);
        let html = `<!DOCTYPE>
        <html>
        <body>
        <p>Succesfully transfer!! please check transaction details:</p> <b> ${TransactionsDetails} </b>
        </body>
        </html>`;

        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e6ff4e3edf8984",
                pass: "d11c3450387fe5"
  }
          });

        let mailOptions = {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: html
        };

        let info = await transport.sendMail(mailOptions);
        return { error: false };

    } catch (error){
        console.log("send email error", error);
        return{
            error: true,
            message: "cannot send email"
        }
    }
}

module.exports = { sendEmail, sendTransactionDetails };