function generateOrderEmail(order, type = 'add', forAdmin = false) {
    const isClient = !forAdmin;
    const greeting = isClient ? `Dear ${order.customer.name || 'Customer'}` : 'Hello Eyecraft Admin';

    const headerText = {
        add: isClient ? "Thank you for your order!" : "New Order Received!",
        update: isClient ? "Your order has been updated" : "An Order Has Been Updated",
        delete: isClient ? "Your order has been cancelled" : "An Order Has Been Deleted"
    }[type];

    const themeColor = {
        add: "#f44336",
        update: "#f44336",
        delete: "#f44336"
    }[type];

    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
                
                <!-- Eyecraft Title -->
                <div style="background-color: #fff; padding: 20px; text-align: center; border-bottom: 2px solid ${themeColor};">
                    <h1 style="font-size: 24px; color: ${themeColor}; margin: 0;">Eyecraft</h1>
                </div>

                <div style="background-color: ${themeColor}; padding: 20px;">
                    <h2 style="color: #fff; margin: 0;">${headerText}</h2>
                </div>
                <div style="padding: 30px;">
                    <p style="font-size: 16px;">${greeting},</p>
                    <p style="font-size: 15px; line-height: 1.6;">${{
            add: "We’ve received your order and it’s currently being processed. You’ll receive updates once it’s shipped.",
            update: "Some details of your order have been successfully updated.",
            delete: "We’re sorry to see your order go. Your cancellation has been confirmed."
        }[type]}</p>

                    <hr style="margin: 30px 0;" />

                    <h3 style="color: ${themeColor}; margin-bottom: 10px;">Order Summary</h3>
                    <p><strong>Order ID:</strong> ${order._id}</p>
                    <p><strong>Name:</strong> ${order.customer.name || "N/A"}</p>
                    <p><strong>Email:</strong> ${order.customer.email || "N/A"}</p>
                    <p><strong>Status:</strong> ${order.order.Status || "N/A"}</p>
                    <p><strong>Frames:</strong> ${order.order.Frames || "N/A"}</p>

                    ${order.order.Eye_Count || order.order.Print_Style || order.order.Sizes || order.order.Effects ? `
                        <h4 style="margin-top: 20px;">Order Details:</h4>
                        <ul style="padding-left: 20px; margin: 10px 0;">
                            ${order.order.Eye_Count ? `<li>Eye Count: ${order.order.Eye_Count}</li>` : ''}
                            ${order.order.Print_Style ? `<li>Print Style: ${order.order.Print_Style}</li>` : ''}
                            ${order.order.Sizes ? `<li>Sizes: ${order.order.Sizes}</li>` : ''}
                            ${order.order.Effects ? `<li>Effects: ${order.order.Effects}</li>` : ''}
                        </ul>
                    ` : ''}

                    <hr style="margin: 30px 0;" />

                    <p style="font-size: 14px;">If you have any questions, reach out to us at 
                        <a href="mailto:support@eyecraft.com" style="color: ${themeColor}; text-decoration: none;">support@eyecraft.com</a> .
                    </p>
                    <p style="color: #aaa; font-size: 12px; margin-top: 20px;">&copy; ${new Date().getFullYear()} Eyecraft. All rights reserved.</p>
                </div>
            </div>
        </div>
    `;
}

module.exports = { generateOrderEmail };
