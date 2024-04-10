const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/config');

const isTokenProvided = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided', statusCode:0 });
    }
    next();
}

const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, JWT_SECRET, async(err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Authentication failed", statusCode:0});
        }
        req.user = payload;
        next()
    })
}

module.exports = {
    requireAdminLogin : [
        isTokenProvided,
        isAuthenticated
    ],
    requireUserLogin : [
        isTokenProvided,
        isAuthenticated
    ]
}
