const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (req.body.isAdmin) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }

    });
};

module.exports = adminAuth;