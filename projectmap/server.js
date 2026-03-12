const express = require('express');
const app = express();
const port = 3000;
const { calculateQuote } = require('./quote')
const fs = require('fs')

app.use(express.json());

app.get('/orders', (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync('./data/orders.json')
  )

  res.json(orders)
})

app.post('/orders', (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync('./data/orders.json')
  )

  const newOrder = {
    id: orders.length + 1,
    ...req.body
  }

  orders.push(newOrder)

  fs.writeFileSync(
    './data/orders.json',
    JSON.stringify(orders, null, 2)
  )

  res.json({ message: 'Order saved' })
})

app.put('/orders/:id', (req, res) => {
  res.json({ message: 'Order updated' });
});

app.delete('/orders/:id', (req, res) => {
  res.json({ message: 'Order deleted' });
});

// Packages
app.get('/packages', (req, res) => {
  res.json([]);
});

app.post('/packages', (req, res) => {
  res.json({ message: 'Package created' });
});

app.put('/packages/:id', (req, res) => {
  res.json({ message: 'Package updated' });
});

app.delete('/packages/:id', (req, res) => {
  res.json({ message: 'Package deleted' });
});

app.post('/calculate', (req, res) => {
  const price = calculateQuote(req.body)
  res.json({ price })
})

// Frontend
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
