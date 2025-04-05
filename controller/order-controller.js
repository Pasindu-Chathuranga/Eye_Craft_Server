// controllers/OrderController.js
const { Order } = require("../model/order-modal");
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

    // Update Order
    async updateOrder(req, res) {
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
