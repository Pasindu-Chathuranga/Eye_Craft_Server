const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
	host: 'sandbox.smtp.mailtrap.io',
	port: 587,
    secure: false,  
	auth: {
		user: '2d2b03d329700d',
		pass: '9d81b78d0a99c4',
	},
});

const SendOrderPlacedEmail = async ({ receipients, subject, message }) => {
	return await mailTransport.sendMail({
		from: 'eyecraftofficial@gmail.com', // sender address
		to: 'sgcreationspc@gmail.com', // list of receivers
		subject: subject, // Subject line
		text: message, // plain text body
		html: message, // valid text body
	});
}

module.exports = { SendOrderPlacedEmail };