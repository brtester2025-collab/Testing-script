const { makeAuthMiddleware } = require('./middlewear.js')
const jwt = require('jsonwebtoken')

jest.mock('jsonwebtoken')

describe('auth middle wear (jest only)', () => {
    const jwtSecret = 'test-secret'
    let auth;

    const makeRes = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }


    beforeEach(() => {
        auth = makeAuthMiddleware({ jwtSecret })
        jest.clearAllMocks();
    })

    test('allow request with valid tokens', () => {
        jwt.verify.mockReturnValue({ userId: 'u1' });

        const req = {
            headers: { authorization: "Bearer Valid-token" }
        }

        const res = makeRes();
        const next = jest.fn();


        auth(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('Valid-token', jwtSecret)
        expect(req.user).toEqual({ id: 'u1' });
        expect(next).toHaveBeenCalledWith()
        expect(res.status).not.toHaveBeenCalledWith();
    })


    test('token is missing', () => {
        const req = { header: {} };
        const res = makeRes();
        const next = jest.fn();

        auth(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Missing token' });
        expect(next).not.toHaveBeenCalledWith();
    })

    test('if token is missing', () => {
        const req = { header: { authorization: {} } }
        const res = makeRes();
        const next = jest.fn();

        auth(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Missing token' })
        expect(next).not.toHaveBeenCalledWith()
    })
});

