// controllers/OrderController.js
const { Order } = require("../model/order-modal");
<<<<<<< HEAD
const { sendOrderEmail } = require("../utils/emailService");

class OrderController {
    // Add Order
    async addOrder(req, res) {
        const newOrder = new Order(req.body);
        try {
            await newOrder.save();

            // Send email to customer and admin
            await sendOrderEmail(newOrder);

            res.status(201).json({ success: true });
            console.log('✓ Successfully added order : ', newOrder);
=======


class OrderController {
    // Add Order Item
    async addOrderItem(req, res) {
        const orderItem = new Order(req.body);
        console.log(orderItem)
        try {
            await orderItem.save();   
            res.status(201).json({ success: true });
            console.log('✓ Successfully added order item : ', orderItem);
>>>>>>> 467b91b3fd3e9ab60de953aa37f1630f850b25eb
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
            console.log('x Error adding order : ', err);
        }
    }

    // Get Orders
    async getOrders(req, res) {
        try {
            const orders = await Order.find();
            res.json(orders);
            console.log('✓ Successfully retrieved orders : ', orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error retrieving orders : ', err);
        }
    }

<<<<<<< HEAD
    // Update Order
    async updateOrder(req, res) {
=======
    // Update Order Item
    async updateOrderItem(req, res) {
        const { customer_name, customer_email, customer_phone, customer_address, customer_city, eye_count, print_style, size, frame, effect, duo_custom_effects, image_url, price, order_status } = req.body; // Destructure fields from request body
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
            orderItem.price = price;
            orderItem.order_status = order_status;

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
>>>>>>> 467b91b3fd3e9ab60de953aa37f1630f850b25eb
        const { id } = req.params;
        try {
            let order = await Order.findById(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            order.set(req.body);
            await order.save();

            // Send update email to customer and admin
            await sendOrderEmail(order, true);

            res.json({ success: true });
            console.log('✓ Successfully updated order : ', order);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error updating order : ', err);
        }
    }

    // Delete Order
    async deleteOrder(req, res) {
        const { id } = req.params;
        try {
            const order = await Order.findByIdAndDelete(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            res.json({ success: true });
            console.log('✓ Successfully deleted order : ', id);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error deleting order : ', err);
        }
    }
}

module.exports = new OrderController();
