// const express = require('express');
// const app = express();

// app.use(express.json());

// // Sample routes
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'OK', timestamp: new Date() });
// });

// app.get('/api/users', async (req, res) => {
//     try {
//         const users = [
//             { id: 1, name: 'John', email: 'john@example.com' },
//             { id: 2, name: 'Jane', email: 'jane@example.com' }
//         ];
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/api/users/:id', async (req, res) => {
//     const { id } = req.params;

//     if (isNaN(id)) {
//         return res.status(400).json({ error: 'Invalid user ID' });
//     }

//     const user = { id: parseInt(id), name: 'John', email: 'john@example.com' };

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json(user);
// });

// app.post('/api/users', async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: 'Name, email, and password are required' });
//     }

//     const newUser = { id: Date.now(), name, email };
//     res.status(201).json(newUser);
// });

// app.put('/api/users/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;

//     if (!name && !email) {
//         return res.status(400).json({ error: 'At least one field is required' });
//     }

//     const updatedUser = { id: parseInt(id), name, email };
//     res.status(200).json(updatedUser);
// });

// app.delete('/api/users/:id', async (req, res) => {
//     const { id } = req.params;
//     res.status(204).send();
// });

// module.exports = app;