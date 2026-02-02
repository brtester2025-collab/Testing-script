// services/userService.js
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData) {
        if (!userData.email || !userData.password) {
            throw new Error('Email and password are required');
        }

        if (!this.isValidEmail(userData.email)) {
            throw new Error('Invalid email format');
        }

        if (userData.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        return await this.userRepository.create(userData);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
}

module.exports = UserService;