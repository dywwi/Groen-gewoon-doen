const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Orders
app.get('/orders', (req, res) => {
  res.json([
 { id: 1, klant: 'Jan', details: 'Product A', offerte: '€100', status: 'Nieuw', date: '2026-02-12' },
    { id: 2, klant: 'Piet', details: 'Product B', offerte: '€200', status: 'Verwerkt', date: '2026-02-13' }
  ]);
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

// Frontend
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
