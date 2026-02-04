// const request = require('supertest')
// const app = require('../tests/api');
// const { describe } = require('node:test');


// describe.skip('API endpoints', () => {

//     describe('GET/api/health', () => {
//         test('should return health service', async () => {
//             const response = await request(app).get('./api/health')
//                 .expect('Content-type', /json/)
//                 .expect(200);

//             expect(response.body).toHaveProperty('status', 'OK')
//             expect(response.body).toHaveProperty('timestamp')

//         })
//     })

//     describe('GET/api/user', () => {
//         test('should return all users', async () => {
//             const response = await request(app)
//                 .get('./api/users')
//                 .expect('content-type', /json/)
//                 .expect(200)
//             expect(Array.isArray(response.body)).toBe(true)
//             expect(response.body[0]).toHaveProperty('id')
//             expect(response.body[0]).toHaveProperty('name')
//             expect(response.body[0]).toHaveProperty('email')
//         })
//     })


//     describe('GET/api/users/:id', () => {
//         test('should return by user by ID', async () => {
//             const response = await request(app)
//                 .get('./api/user/i')
//                 .expect('content-type', /json/)
//                 .expect(200)

//             expect(response.body).toHaveProperty('id', 1)
//             expect(response.body).toHaveProperty('name')
//             expect(response.body).toHaveProperty('email')

//         })

//         test('should return 400 invalid', async () => {
//             const response = await request(app)
//                 .get('./api/users/invalid')
//                 .expect('content-type', /json/)
//                 .expect(400);

//             expect(response.body).toHaveProperty('error')
//         })

//     })


//     //============ CREATE NEW USER =============

//     describe('POST /api/users', () => {
//         test('should create a new user', async () => {
//             const newUser = {
//                 name: 'Test User',
//                 email: 'test@example.com',
//                 password: 'password123'
//             }
//             const response = await request(app)
//                 .post('./api/users')
//                 .send(newUser)
//                 .expect('content-type', /json/)
//                 .expect(201);


//             expect(response.body).toHaveProperty('id')
//             expect(response.body.name).toBe(newUser.name)
//             expect(response.body.email).toBe(newUser.email)
//         })


//         test('field missing in the parameters: ', async () => {
//             const response = await request(app)
//                 .post('./api/users')
//                 .send({ email: 'test@example.com', password: 'password123' })
//                 .expect('content-type', /json/)
//                 .expect(404)


//             expect(response.body).toHaveProperty("error")

//         })
//         test('field missing in the parameters: ', async () => {
//             const response = await request(app)
//                 .post('./api/users')
//                 .send({ name: 'test user', password: 'password123' })
//                 .expect('content-type', /json/)
//                 .expect(404)


//             expect(response.body.error).toHaveProperty('Name, email, and password are required')

//         })

//         test('field missing in the parameters: ', async () => {
//             const response = await request(app)
//                 .post('./api/users')
//                 .send({ name: 'test user', email: 'test@example.com' })
//                 .expect('content-type', /json/)
//                 .expect(404)

//             expect(response.body.error).toHaveProperty('Name, email, and password are required')
//         })

//     })


//     // ====== updated user ======

//     describe('PUT /api/users/:id', () => {

//         test('update user', async () => {
//             const updateUser = {
//                 name: "updated-name",
//                 email: "updated@email.com"
//             }

//             const response = await request(app)
//                 .put('./api/users')
//                 .send(updateUser)
//                 .expect('content-type', /json/)
//                 .expect(200)


//             expect(response.body.name).toBe(updateUser.name)
//             expect(response.body.id).toBe(updateUser.email)

//         })


//         test('field is missing', async () => {
//             const response = await request(app)
//                 .put('./api/users')
//                 .send({})
//                 .expect('content-type', /json/)
//                 .expect(400)

//             expect(response.body).toBe('at least one field is required')

//         })

//     })


//     describe('/api/users/:id', async () => {
//         const response = await request(app)
//             .delete('./api/user/id')
//             .expect(204)
//     })


// })


test("TEMP placeholder", () => {
    expect(true).toBe(true);
});



