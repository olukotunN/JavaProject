const express = require('express');
const app = express();
app.use(express.json());

let orders = []; // In-memory orders

app.post('/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).send(order);
});

app.get('/orders', (req, res) => {
    res.status(200).send(orders);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});

