const { Image } = require("../model/image-modal");

class ImageController {
    // Add Image Item
    async addImageItem(req, res) {
        const imageItem = new Image(req.body);
        try {
            await imageItem.save();
            res.status(201).json({ success: true });
            console.log('✓ Successfully added image item : ', imageItem);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
            console.log('x Error adding image item : ', err);
        }
    }

    // Retrieve Image Items
    async getImageItems(req, res) {
        try {
            const imageItems = await Image.find();
            res.json(imageItems);
            console.log('✓ Successfully retrieved image items : ', imageItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error retrieving image items : ', err);
        }
    }

    // Update Image Item
    async updateImageItem(req, res) {
        const { eye_count, print_style, size, frame, effect, duo_custom_effects, image_url, price } = req.body;
        const { id } = req.params;

        try {
            let imageItem = await Image.findById(id);
            if (!imageItem) return res.status(404).json({ message: 'Image item not found' });

            imageItem.eye_count = eye_count;
            imageItem.print_style = print_style;
            imageItem.size = size;
            imageItem.frame = frame;
            imageItem.effect = effect;
            imageItem.duo_custom_effects = duo_custom_effects;
            imageItem.image_url = image_url;
            imageItem.price = price

            await imageItem.save();
            res.json({ success: true });
            console.log('✓ Successfully updated image item : ', imageItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error updating image item : ', err);
        }
    }

    // Delete Image Item
    async deleteImageItem(req, res) {
        const { id } = req.params;

        try {
            const imageItem = await Image.findByIdAndDelete(id);
            if (!imageItem) return res.status(404).json({ message: 'Image item not found' });

            res.json({ success: true });
            console.log('✓ Successfully deleted image item : ', id);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log('x Error deleting image item : ', err);
        }
    }
}

module.exports = new ImageController();
