function generateOrderEmail(order, type = 'add', forAdmin = false) {
    const isClient = !forAdmin;
    const greeting = isClient ? `Dear ${order.customerName || 'Customer'}` : 'Hello Eyecraft Admin';

    const header = {
        add: isClient ? "Thank you for your order!" : "New order received!",
        update: isClient ? "Your order has been updated" : "An order has been updated",
        delete: isClient ? "Your order has been cancelled" : "An order has been deleted"
    }[type];

    const color = {
        add: "#19baa2",
        update: "#ffc107",
        delete: "#f44336"
    }[type];

    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: ${color}; margin-bottom: 5px;">${header}</h2>
            <p>${greeting},</p>
            <p>${{
            add: "We’ve received your order and it’s being processed.",
            update: "Your order details have been successfully updated.",
            delete: "Your order has been successfully removed from our system."
        }[type]}</p>

            <hr style="margin: 20px 0;" />

            <h3>Order Summary</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Name:</strong> ${order.customerName || "N/A"}</p>
            <p><strong>Email:</strong> ${order.customerEmail || "N/A"}</p>
            <p><strong>Total:</strong> $${order.total || 0}</p>

            ${Array.isArray(order.order) ? `
                <h4 style="margin-top: 15px;">Items:</h4>
                <ul>
                    ${order.order.map(item => `<li>${item.name} x ${item.quantity} - $${item.price}</li>`).join('')}
                </ul>
                
            ` : ''}

            <hr style="margin: 20px 0;" />
            <p style="font-size: 14px;">If you have any questions, please contact us at <a href="mailto:support@eyecraft.com">support@eyecraft.com</a>.</p>
            <p style="color: #888; font-size: 12px;">&copy; ${new Date().getFullYear()} Eyecraft. All rights reserved.</p>
        </div>
    `;
}

module.exports = { generateOrderEmail };
