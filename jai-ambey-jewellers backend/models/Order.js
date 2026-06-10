const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // 1. Customer ki Address Details
    shippingAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    
    // 2. Jo Jewellery Items customer ne khareede (Aapke localstorage wale items)
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String }, // Product ki photo ka link
            category: { type: String, default: 'Jewellery' }
        }
    ],
    
    // 3. Order ki Baaki Details
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
    paymentStatus: { type: String, default: 'Unpaid' }, // Abhi ke liye Unpaid, jab payment integration hoga tab Paid ho jayega
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);