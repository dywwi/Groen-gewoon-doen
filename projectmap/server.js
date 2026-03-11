const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

// Orders
app.get('/orders', (req, res) => {
  res.json([
 { id: 1, klant: 'Jan', details: 'Product A', offerte: '€100', status: 'Nieuw', date: '2026-02-12' },
    { id: 2, klant: 'Piet', details: 'Product B', offerte: '€200', status: 'Verwerkt', date: '2026-02-13' }
  ]);
});

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
  res.json({ message: 'Order created' });
});

app.put('/orders/:id', (req, res) => {
  res.json({ message: 'Order updated' });
});

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

// Frontend
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
