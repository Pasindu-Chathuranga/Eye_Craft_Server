const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        order: {
            Eye_Count: { type: String },
            Print_Style: { type: String },
            Sizes: { type: String },
            Effects: { type: String },
            Status: { type: String },
            Frames: { type: String }
        },
        customer: {
            name: { type: String },
            address: { type: String },
            contact: { type: String },
            email: { type: String }
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = { Order };
