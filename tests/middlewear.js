const jwt = require("jsonwebtoken");

function makeAuthMiddleware({ jwtSecret }) {
    return function auth(req, res, next) {
        try {
            const header = req.headers?.authorization;

            // Check if token exists
            if (!header || !header.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Missing token" });
            }

            // Extract token from header
            const token = header.slice("Bearer ".length);

            // Verify token
            const payload = jwt.verify(token, jwtSecret);

            // Attach user to request
            req.user = { id: payload.userId };

            return next();
        } catch (e) {
            return res.status(401).json({ message: "Invalid/expired token" });
        }
    };
}

module.exports = { makeAuthMiddleware };