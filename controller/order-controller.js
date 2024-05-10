const { Order } = require("../model/order-modal");
const nodemailer = require('nodemailer');

class OrderController {
    // Add Order Item
    async addOrderItem(req, res) {
        const orderItem = new Order(req.body);
        try {
            await orderItem.save();
            res.status(201).json({ success: true });
            console.log('✓ Successfully added order item : ', orderItem);
            sendEmailToAdmin(orderItem)
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
            console.log('x Error adding order item : ', err);
        }
    }

    // Retrieve Order Items
    async getOrderItems(req, res) {
        try {
            const orderItems = await Order.find();
            res.json(orderItems);
            console.log('✓ Successfully retrieved order items : ', orderItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error retrieving order items : ', err);
        }
    }

    async sendEmailToAdmin(orderItem) {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Setup email data
        let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: orderItem.customer_email,
            subject: 'Eye Craft  -  Your Order has been added',
            text: `A new order has been added with the following details:
            \n${JSON.stringify(orderItem)} 
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('✉️ Email sent to admin');
    }


    // Update Order Item
    async updateOrderItem(req, res) {
        const { customer_name, customer_email, customer_phone, customer_address, customer_city, eye_count, print_style, size, frame, effect, duo_custom_effects, image_url } = req.body; // Destructure fields from request body
        const { id } = req.params; // Extract id from request parameters

        try {
            let orderItem = await Order.findById(id); // Find order item by id
            if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

            // Update order item fields
            orderItem.eye_count = eye_count;
            orderItem.print_style = print_style;
            orderItem.size = size;
            orderItem.frame = frame;
            orderItem.effect = effect;
            orderItem.duo_custom_effects = duo_custom_effects;
            orderItem.image_url = image_url;
            orderItem.customer_name = customer_name;
            orderItem.customer_email = customer_email;
            orderItem.customer_phone = customer_phone;
            orderItem.customer_address = customer_address;
            orderItem.customer_city = customer_city;

            await orderItem.save(); // Save the updated order item
            res.json({ success: true }); // Respond with success message
            console.log('✓ Successfully updated order item : ', orderItem);
        } catch (err) {
            res.status(500).json({ error: err.message }); // Handle errors
            console.log('x Error updating order item : ', err);
        }
    }

    // Delete Order Item
    async deleteOrderItem(req, res) {
        const { id } = req.params;

        try {
            const orderItem = await Order.findByIdAndDelete(id);
            if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

            res.json({ success: true });
            console.log('✓ Successfully deleted order item : ', orderItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error deleting order item : ', err);
        }
    }
}

module.exports = new OrderController();