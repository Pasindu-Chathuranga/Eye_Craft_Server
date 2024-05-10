const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        image_id: { type: String },
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

const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
