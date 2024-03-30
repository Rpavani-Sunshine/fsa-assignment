const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticate;