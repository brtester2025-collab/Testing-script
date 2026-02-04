const { makeAuthService } = require('./authservice.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { describe } = require('node:test');


jest.mock('bcryptjs')
jest.mock('jsonwebtoken');


describe('AuthService', () => {
    const jwtSecret = 'test-secret';
    let userRepo;
    let authservice;

    beforeEach(() => {
        userRepo = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        }


        authservice = makeAuthService({ userRepo, jwtSecret })
        jest.clearAllMocks();
    })



    describe("register", () => {
        test("register success", async () => {

            userRepo.findByEmail.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue("hashed-pass")
            userRepo.create.mockResolvedValue({ id: 'u1', email: 'a@test.com' })
            jwt.sign.mockReturnValue('jwt-token')


            const result = await authservice.register({
                email: 'a@test.com',
                password: 'pass1234',
            })

            expect(userRepo.findByEmail).toHaveBeenCalledWith('a@test.com')
            expect(bcrypt.hash).toHaveBeenCalledWith('pass1234', 10)
            expect(userRepo.create).toHaveBeenCalledWith({
                email: 'a@test.com',
                passwordHash: 'hashed-pass'
            });

            expect(jwt.sign).toHaveBeenCalledWith({ userId: 'u1' }
                , jwtSecret,
                {
                    expiresIn: '1h'
                }
            )
            expect(result).toEqual({
                user: { id: 'u1', email: 'a@test.com' },
                token: 'jwt-token',
            })
        })



        test('Invalid register email and password', async () => {
            await expect(authservice.register({ email: '', password: '' }))
                .rejects.toMatchObject({
                    message: 'Email and password are required',
                    status: 400,
                })
            expect(userRepo.findByEmail).not.toHaveBeenCalledWith()
        })

        test('User is already exists', async () => {

            userRepo.findByEmail.mockResolvedValue({
                // id: '1',
                email: 'a@test.com'
            })



            await expect(authservice.register({ email: 'a@test.com', password: 'x' }))
                .rejects.toMatchObject({
                    message: 'Email already exists',
                    status: 409,
                })

            expect(userRepo.create).not.toHaveBeenCalledWith()
            // expect(jwt.sign).not.toHaveBeenCalledWith()

        })



    })


    describe('Login success', () => {

        test('login username and password', async () => {
            userRepo.findByEmail.mockResolvedValue({
                id: 'u1',
                email: 'a@test.com',
                passwordHash: 'hashed',
            });
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('jwt-token')



            const result = await authservice.login({
                email: 'a@test.com'
                ,
                password: 'pass1234'

            })

            expect(userRepo.findByEmail).toHaveBeenCalledWith('a@test.com')
            expect(bcrypt.compare).toHaveBeenCalledWith('pass1234', 'hashed')
            expect(result).toEqual({
                user: { id: 'u1', email: 'a@test.com' },
                token: 'jwt-token',
            })

        })

        //

        test('login fail-> user not found', async () => {

            userRepo.findByEmail.mockResolvedValue(null)
            await expect(
                authservice.login({ email: 'x@test.com', password: 'any' }))
                .rejects.toMatchObject({
                    message: "Invalid credentials",
                    status: 401
                })


            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(jwt.sign).not.toHaveBeenCalled()


        })



        test('login fail-> password not found', async () => {

            userRepo.findByEmail.mockResolvedValue({
                id: 'u1',
                email: 'a@test.com',
                passwordHash: "hashed",
            })
            bcrypt.compare.mockResolvedValue(false)
            await expect(
                authservice.login({ email: 'a@test.com', password: 'wrong' })
            ).rejects.toMatchObject({
                message: 'Invalid credentials',
                status: 401
            })
            expect(jwt.sign).not.toHaveBeenCalled();
        })






        test('invalid email and password', async () => {
            await expect(authservice.login({ email: '', password: '' }))
                .rejects.toMatchObject({
                    message: 'Email and password are required',
                    status: 400
                })
            expect(userRepo.findByEmail).not.toHaveBeenCalled()
        })




    })

});