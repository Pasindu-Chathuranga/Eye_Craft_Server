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


class MailController {
    async EmailOrderPlaced(req, res) {
        const { customer_name, customer_email, orderItem } = req.body;
        const customerSubject = "Eye Craft - Order Confirmation";
        const customerMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa; }
            h2 { color: #5D5D5D; }
            h3 { color: #5D5D5D; margin-top: 20px; }
            p, li { line-height: 1.6; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 8px; }
            .detail-title { font-weight: bold; color: #333; }
            .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Eye Craft - Order Confirmation</h2>
            <p>Dear <strong>${orderItem.customer_name}</strong>,</p>
            <p>Thank you for your order! Here are your order details:</p>

            <h3>Order Details:</h3>
            <ul>
                <li><span class="detail-title">Eye Count:</span> ${orderItem.eye_count}</li>
                <li><span class="detail-title">Print Style:</span> ${orderItem.print_style}</li>
                <li><span class="detail-title">Size:</span> ${orderItem.size}</li>
                <li><span class="detail-title">Frame:</span> ${orderItem.frame}</li>
                <li><span class="detail-title">Effect:</span> ${orderItem.effect}</li>
                ${orderItem.duo_custom_effects ? `<li><span class="detail-title">Duo Custom Effects:</span> ${orderItem.duo_custom_effects}</li>` : ""}
                <li><span class="detail-title">Image URL:</span> <a href="${orderItem.image_url}" target="_blank">View Image</a></li>
            </ul>

            <h3>Customer Details:</h3>
            <ul>
                <li><span class="detail-title">Name:</span> ${orderItem.customer_name}</li>
                <li><span class="detail-title">Email:</span> ${orderItem.customer_email}</li>
                <li><span class="detail-title">Phone:</span> ${orderItem.customer_phone}</li>
                <li><span class="detail-title">Address:</span> ${orderItem.customer_address}, ${orderItem.customer_city}</li>
            </ul>

            <p><strong>Total Price:</strong> Rs. ${orderItem.price}.00</p>
            <p>If you have any questions or need assistance, please contact Eye Craft:</p>
            <ul>
                <li><strong>Email:</strong> <a href="mailto:eyecraftofficial@gmail.com">eyecraftofficial@gmail.com</a></li>
                <li><strong>Phone:</strong> +94 70 677 6376</li>
            </ul>

            <div class="footer">
                <p>Thank you for choosing Eye Craft!</p>
                <p>Best regards,</p>
                <p>The Eye Craft Team</p>
            </div>
        </div>
    </body>
    </html>`;

        const adminSubject = "Eye Craft - New order has been placed";
        const adminMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>New Order Notification</title>
        <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa; }
            h2 { color: #5D5D5D; }
            h3 { color: #5D5D5D; margin-top: 20px; }
            p, li { line-height: 1.6; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 8px; }
            .detail-title { font-weight: bold; color: #333; }
            .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Eye Craft - New Order Notification</h2>
            <p>Hi Admin,</p>
            <p>A new order has been placed!</p>

            <h3>Order Details:</h3>
            <ul>
                <li><span class="detail-title">Eye Count:</span> ${orderItem.eye_count}</li>
                <li><span class="detail-title">Print Style:</span> ${orderItem.print_style}</li>
                <li><span class="detail-title">Size:</span> ${orderItem.size}</li>
                <li><span class="detail-title">Frame:</span> ${orderItem.frame}</li>
                <li><span class="detail-title">Effect:</span> ${orderItem.effect}</li>
                ${orderItem.duo_custom_effects ? `<li><span class="detail-title">Duo Custom Effects:</span> ${orderItem.duo_custom_effects}</li>` : ""}
                <li><span class="detail-title">Image URL:</span> <a href="${orderItem.image_url}" target="_blank">View Image</a></li>
            </ul>

            <h3>Customer Details:</h3>
            <ul>
                <li><span class="detail-title">Name:</span> ${orderItem.customer_name}</li>
                <li><span class="detail-title">Email:</span> ${orderItem.customer_email}</li>
                <li><span class="detail-title">Phone:</span> ${orderItem.customer_phone}</li>
                <li><span class="detail-title">Address:</span> ${orderItem.customer_address}, ${orderItem.customer_city}</li>
            </ul>

            <p><strong>Total Price:</strong> Rs. ${orderItem.price}.00</p>

            <div class="footer">
                <p>Thank you,</p>
                <p>Best regards,</p>
                <p>The Eye Craft Team</p>
            </div>
        </div>
    </body>
    </html>`;

        try {
            await mailTransport.sendMail({
                from: 'eyecraftofficial@gmail.com', // sender address
                to: customer_email,
                subject: customerSubject, // Subject line
                text: customerMessage, // plain text body
                html: customerMessage, // valid text body
            });
            await mailTransport.sendMail({
                from: 'noreply-eyecraft@gmail.com', // sender address
                to: 'eyecraftofficial@gmail.com',
                subject: adminSubject, // Subject line
                text: adminMessage, // plain text body
                html: adminMessage, // valid text body
            });
            res.status(200).json({ success: true, message: 'Order confirmation email sent!' });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, message: 'Failed to send order confirmation email.' });
        }
    }
}
module.exports = new MailController();
