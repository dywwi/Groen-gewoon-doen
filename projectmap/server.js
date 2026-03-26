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

//form
app.post("/orders", (req, res) => {

  const { gras, tegels, heg } = req.body;

  const newOrder = {
    id: Date.now(),
    gras,
    tegels,
    heg,
    status: "nieuw"
  };

  const orders = require("./data/orders.json");

  orders.push(newOrder);

  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2));

  res.send("Order ontvangen!");

});

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

  const orders = JSON.parse(
    fs.readFileSync('./data/orders.json')
  )

  const id = Number(req.params.id)

  const order = orders.find(o => o.id === id)

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  // update fields
  order.status = req.body.status
  order.date = new Date().toISOString().split('T')[0]

  fs.writeFileSync(
    './data/orders.json',
    JSON.stringify(orders, null, 2)
  )

  res.json({ message: 'Order updated', order })
})

app.delete('/orders/:id', (req, res) => {
  res.json({ message: 'Order deleted' });
});

// Packages
app.get('/packages', (req, res) => {
  const data = fs.readFileSync('packages.json');
  const packages = JSON.parse(data);
  res.json(packages);
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
