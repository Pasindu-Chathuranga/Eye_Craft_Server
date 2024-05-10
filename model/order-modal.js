const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        order_id: { type: String }, 
        customer_name: { type: String },
        customer_email: { type: String },
        customer_address: { type: String },
        customer_phone: { type: Number },
        customer_city: { type: String },
        order_status:{ type: String },
        image_url: { type: String },
        eye_count: { type: String },
        print_style: { type: String },
        size: { type: String },
        effect: { type: String },
        frame: { type: String },
        duo_custom_effects: { type: String },    

    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = { Order };
