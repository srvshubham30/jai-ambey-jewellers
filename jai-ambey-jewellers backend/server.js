// // 1. Sabse pehle jaruri tools ko import kar rahe hain
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // 2. Middlewares (Server ko data samajhne me madad karte hain)
// app.use(cors()); // Isse frontend humare backend se connect ho payega
// app.use(express.json()); // Isse server JSON data (text/prices) ko samajh payega

// // 3. Ek sample route (Check karne ke liye ki server chal raha hai ya nahi)
// app.get('/', (req, res) => {
//     res.send('Jai Ambey Jewellers ka Backend Server Chal Raha Hai! 🚀');
// });

// // 4. Fake Database (Abhi ke liye local dummy data - jab tak MongoDB nahi jodte)
// let jewelleryProducts = [
//     { id: 1, name: "Gold Necklace", price: 150000, img: "https://via.placeholder.com/300" },
//     { id: 2, name: "Diamond Ring", price: 45000, img: "https://via.placeholder.com/300" }
// ];

// // 5. API Route: Is raste se Frontend aapke saare products dekh payega
// app.get('/api/products', (req, res) => {
//     res.json(jewelleryProducts);
// });

// // 6. API Route: Is raste se aap naya product, photo aur price jod payenge
// app.post('/api/products', (req, res) => {
//     const newProduct = req.body; // Jo naya item aap bhejenge
//     jewelleryProducts.push(newProduct); // Wo list me jud jayega
//     res.json({ message: "Jewellery Item successfully add ho gaya!", currentStore: jewelleryProducts });
// });

// // 7. Server ko start karna (Port 5000 par)
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server running smoothly on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Humne jo Product model banaya tha, use import kar rahe hain
// const Product = require('./models/Product');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // 1. MongoDB Database Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("📢 MongoDB Database se connection kamyab raha! 💎"))
// .catch((err) => console.log("❌ Database connection error: ", err));

// // Sample Home Route
// app.get('/', (req, res) => {
//     res.send('Jai Ambey Jewellers Backend Server with MongoDB is Live! 🚀');
// });

// // 2. API Route: Database se saare products lekar frontend ko dikhana
// app.get('/api/products', async (req, res) => {
//     try {
//         const allProducts = await Product.find(); // Database se sab nikalega
//         res.json(allProducts);
//     } catch (error) {
//         res.status(500).json({ message: "Data fetch karne me dikkat hui", error });
//     }
// });

// // 3. API Route: Naya product database me save karna (Aapki photo aur price)
// app.post('/api/products', async (req, res) => {
//     try {
//         const { name, price, image, category } = req.body;

//         // Naya product tayar kiya
//         const newJewellery = new Product({
//             name,
//             price,
//             image,
//             category
//         });

//         // Database me save kar diya
//         const savedJewellery = await newJewellery.save();
//         res.status(201).json({ message: "Jewellery successfully save ho gayi!", data: savedJewellery });
//     } catch (error) {
//         res.status(500).json({ message: "Product save nahi ho paya", error });
//     }
// });

// // Server Start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/.env' });

const Product = require('./models/Product');
const User = require('./models/User');



const Order = require('./models/Order');





const protect = require('./middleware/authMiddleware'); 

const app = express();

// CORS Settings (Full Permission)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body Parser Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("📢 MongoDB Database se connection kamyab raha! 💎"))
.catch((err) => console.log("❌ Database connection error: ", err));


// ==========================================
//          --- ADMIN AUTH ROUTES ---
// ==========================================

// 1. Admin Register Route
app.post('/api/admin/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username aur Password dono zaroori hain!" });
        }
        
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Admin already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new User({ username, password: hashedPassword });
        await newAdmin.save();

        return res.status(201).json({ message: "Admin Account successfully ban gaya!" });
    } catch (error) {
        return res.status(500).json({ message: "Server error during registration", error: error.message });
    }
});

// 2. Admin Login Route (Fixed & Streamlined)
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username aur Password fill karein!" });
        }

        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Galat Username!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Galat Password!" });
        }

        const secret = process.env.JWT_SECRET || "MY_FALLBACK_SECRET_123";
        const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '1d' });
        
        return res.status(200).json({ token, message: "Welcome Sandeep Kumar! Login Successful." });
    } catch (error) {
        return res.status(500).json({ message: "Server login error", error: error.message });
    }
});


// ==========================================
//          --- PRODUCT ROUTES ---
// ==========================================

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.json(allProducts);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

// Add new product (Protected)
app.post('/api/products', protect, async (req, res) => {
    try {
        const { name, price, image, category } = req.body;
        const newJewellery = new Product({ name, price, image, category });
        const savedJewellery = await newJewellery.save();
        return res.status(201).json({ message: "Jewellery successfully added by Admin!", data: savedJewellery });
    } catch (error) {
        return res.status(500).json({ message: "Error saving product", error: error.message });
    }
});

// ==========================================
//          --- ORDER ROUTES 🛒 ---
// ==========================================

app.post('/api/orders/place-order', async (req, res) => {
    try {
        const { shippingAddress, items, amount } = req.body;

        // Validation check
        if (!shippingAddress || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Address ya items missing hain!" });
        }

        // Database ke liye object banana
        const newOrder = new Order({
            shippingAddress: shippingAddress,
            items: items,
            totalAmount: amount
        });

        // MongoDB me save karna
        const savedOrder = await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "Order successfully database me save ho gaya!",
            orderId: savedOrder._id
        });

    } catch (error) {
        console.error("Order save error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});








// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Caught Global Error:", err);
    res.status(500).json({ message: "Internal Server Error Occurred", error: err.message });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));