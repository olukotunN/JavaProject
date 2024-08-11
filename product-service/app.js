const express = require('express');
const app = express();
app.use(express.json());

let products = []; // In-memory product catalog

app.post('/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).send(product);
});

app.get('/products', (req, res) => {
    res.status(200).send(products);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});

