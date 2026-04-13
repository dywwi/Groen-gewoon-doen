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
app.post('/orders', (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync('./data/orders.json')
  )

  const { gras, tegels, heg, prijs, date, status } = req.body

  const newOrder = {
    id: Date.now(), // или orders.length + 1
    gras,
    tegels,
    heg,
    prijs,
    date,
    status: status || "nieuw"
  }

  orders.push(newOrder)

  fs.writeFileSync(
    './data/orders.json',
    JSON.stringify(orders, null, 2)
  )

  res.json({ message: 'Order saved', order: newOrder })
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
  const packages = JSON.parse(
    fs.readFileSync('./data/packages.json')
  )
  res.json(packages)
})

app.post('/packages', (req, res) => {

  const { name, description, price } = req.body

  const packages = JSON.parse(
    fs.readFileSync('./data/packages.json')
  )

  const newPackage = {
    id: Date.now(),
    name,
    description,
    price: Number(price)
  }

  packages.push(newPackage)

  fs.writeFileSync(
    './data/packages.json',
    JSON.stringify(packages, null, 2)
  )

  res.json({ message: 'Package toegevoegd', package: newPackage })
})

app.put('/packages/:id', (req, res) => {

  const id = Number(req.params.id)
  const { name, description, price } = req.body

  let packages = JSON.parse(
    fs.readFileSync('./data/packages.json')
  )

  packages[id] = {
    ...packages[id],
    name,
    description,
    price: Number(price)
  }

  fs.writeFileSync(
    './data/packages.json',
    JSON.stringify(packages, null, 2)
  )

  res.json({ message: 'Package updated' })
})

app.delete('/packages/:id', (req, res) => {

  const id = Number(req.params.id)

  let packages = JSON.parse(
    fs.readFileSync('./data/packages.json')
  )

  packages.splice(id, 1)

  fs.writeFileSync(
    './data/packages.json',
    JSON.stringify(packages, null, 2)
  )

  res.json({ message: 'Package verwijderd' })
})

app.post('/calculate', (req, res) => {
  const price = calculateQuote(req.body)
  res.json({ price })
})

app.get('/tarieven', (req, res) => {
  const tarieven = JSON.parse(
    fs.readFileSync('./data/tarieven.json')
  )
  res.json(tarieven)
})
app.post('/tarieven', (req, res) => {

  const { gras, tegels } = req.body

  const tarieven = {
    gras: Number(gras),
    tegels: Number(tegels)
  }

  fs.writeFileSync(
    './data/tarieven.json',
    JSON.stringify(tarieven, null, 2)
  )

  res.json({ message: 'Tarieven opgeslagen' })
})

// Frontend
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
