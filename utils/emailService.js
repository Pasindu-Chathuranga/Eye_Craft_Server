const nodemailer = require("nodemailer");
const { generateOrderEmail } = require("./emailTemplates");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderEmail = async (order, type = 'add') => {
    const subjectMap = {
        add: '🛒 New Order Placed',
        update: '🔄 Order Updated',
        delete: '❌ Order Deleted'
    };
    const subject = `${subjectMap[type]} - Order ID: ${order._id}`;

    const adminEmail = process.env.ADMIN_EMAIL;

    // Send to client
    await transporter.sendMail({
        from: `"Eyecraft" <${process.env.EMAIL_USER}>`,
        to: order.customerEmail,
        subject,
        html: generateOrderEmail(order, type, false)
    });

    // Send to admin
    await transporter.sendMail({
        from: `"Eyecraft" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject,
        html: generateOrderEmail(order, type, true)
    });
};

module.exports = { sendOrderEmail };
