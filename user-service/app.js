const express = require('express');
const app = express();
app.use(express.json());

let users = []; // In-memory user data

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});

