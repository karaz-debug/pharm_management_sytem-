// auth middleware
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }
    try {
        let secretKey = "165371566132632461543261543516426184721abghdghjsvdbn"
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).json({
            message: 'Invalid token.'
        });
    }
};

module.exports = auth;

