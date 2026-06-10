const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Header se token nikalenge
    const token = req.header('Authorization');

    // Agar token nahi hai toh access mana
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied! Aap admin nahi hain." });
    }

    try {
        // Token ko verify karenge (Bearer token format handle karne ke liye split kiya hai)
        const actualToken = token.split(" ")[1] || token;
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        
        req.user = decoded;
        next(); // Agar sab sahi hai, toh agle kaam par bhejo
    } catch (err) {
        res.status(401).json({ message: "Token sahi nahi hai!" });
    }
};