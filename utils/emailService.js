const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { generateOrderPDF } = require("./pdfService");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'sgcreationspc@gmail.com',
        pass: 'Sg@9riffing'
    }
});

// Send email with PDF attachment
const sendOrderEmail = async (order, isUpdate = false) => {
    const { customer_name, customer_email, customer_address, customer_phone, order_status } = order;
    const subject = isUpdate ? `Your order has been updated` : `New order confirmation`;
    const message = `
        Hello ${customer_name},

        ${isUpdate ? "Your order has been updated." : "Thank you for your order!"}

        Order Details:
        - Name: ${customer_name}
        - Email: ${customer_email}
        - Address: ${customer_address}
        - Phone: ${customer_phone}
        - Status: ${order_status || 'Pending'}

        Regards,
        UrbanRoute Team
    `;

    // Generate the PDF file
    const pdfPath = path.join(__dirname, `../invoices/Order-${order._id}.pdf`);
    await generateOrderPDF(order, pdfPath);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [customer_email, process.env.ADMIN_EMAIL],
        subject,
        text: message,
        attachments: [
            {
                filename: `Order-${order._id}.pdf`,
                path: pdfPath
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✓ Email sent to:", mailOptions.to);

        // Clean up the generated PDF after sending
        fs.unlinkSync(pdfPath);
    } catch (error) {
        console.log("x Failed to send email:", error.message);
    }
};

module.exports = { sendOrderEmail };
