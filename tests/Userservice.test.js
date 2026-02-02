const UserService = require('../Service/Userservice.js')
describe('UserService', () => {


    let userServices;
    let mockRepository


    beforeEach(() => {

        mockRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()

        }
        userServices = new UserService(mockRepository)
    })

    afterEach(() => {
        jest.clearAllMocks();
    })


    // Create User 

    describe('create user', () => {
        const validUserData = {
            email: "test@example.com",
            password: "password123",
            name: 'John Doe'
        }

        test("should create successfully", async () => {
            mockRepository.findByEmail.mockResolvedValue(null);
            mockRepository.create.mockResolvedValue({ id: 1, ...validUserData });

            const result = await userServices.createUser(validUserData)
            expect(result).toHaveProperty('id')
            expect(result.email).toBe(validUserData.email)
            expect(mockRepository.create).toHaveBeenCalledWith(validUserData)
        })

        test('should throw error when email missing token', async () => {
            const InvalidData = { password: 'password123' }
            await expect(userServices.createUser(InvalidData)).rejects.toThrow('Email and password are required')

        })

        test('should throw error when the password is missing', async () => {
            const InvalidData = { email: 'test@example.com' }
            await expect(userServices.createUser(InvalidData)).rejects.toThrow('Email and password are required')

        })

        test('should throw error when the error email format', async () => {
            const InvalidData = { email: 'invalid-email', password: 'password123' }
            await expect(userServices.createUser(InvalidData)).rejects.toThrow('Invalid email format')
        })

        test('should throw error when the password length is short', async () => {
            const InvalidData = { email: 'test@example.com', password: '123' }
            await expect(userServices.createUser(InvalidData)).rejects.toThrow('Password must be at least 8 characters')
        })


        test('should throw error when the user already exists', async () => {
            mockRepository.findByEmail.mockResolvedValue({
                id: 1,
                email: validUserData.email
            })

            await expect(userServices.createUser(validUserData))
                .rejects
                .toThrow('User already exists')
        })
    })


    // Email validation test



    describe('isValidEmail', () => {
        test.each([
            ['test@example.com', true],
            ['user.name@domaim.org', true],
            ['user+tag@example.co.uk', true],
            ['invalid-email', false],
            ['@example.com', false],
            ['test@', false],
            ['test@.com', false],
            ['', false]
        ])('should validate the email', (email, expected) => {
            expect(userServices.isValidEmail(email)).toBe(expected)
        })
    })



})