const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeAuthService({ userRepo, jwtSecret }) {
    return {
        async register({ email, password }) {
            if (!email || !password) {
                const err = new Error("Email and password are required");
                err.status = 400;
                throw err;
            }

            const existing = await userRepo.findByEmail(email);
            if (existing) {
                const err = new Error("Email already exists");
                err.status = 409;
                throw err;
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const user = await userRepo.create({ email, passwordHash });

            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

            return { user: { id: user.id, email: user.email }, token };
        },

        async login({ email, password }) {
            if (!email || !password) {
                const err = new Error("Email and password are required");
                err.status = 400;
                throw err;
            }

            const user = await userRepo.findByEmail(email);
            if (!user) {
                const err = new Error("Invalid credentials");
                err.status = 401;
                throw err;
            }

            const ok = await bcrypt.compare(password, user.passwordHash);
            if (!ok) {
                const err = new Error("Invalid credentials");
                err.status = 401;
                throw err;
            }

            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
            return { user: { id: user.id, email: user.email }, token };
        },
    };
}

module.exports = { makeAuthService };