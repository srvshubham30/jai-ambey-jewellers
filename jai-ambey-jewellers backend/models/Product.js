const mongoose = require('mongoose');

// Jewellery Item ka dacha (Structure) tayar kar rahe hain
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // Yahan photo ka internet link (URL) ya path aayega
        required: true
    },
    category: {
        type: String, // Jaise: Necklace, Ring, Bangles
        default: "General"
    }
}, { timestamps: true }); // Isse automatic create aur update ka time save ho jayega

module.exports = mongoose.model('Product', ProductSchema);