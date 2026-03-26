let laatstePrijs = 0
async function berekenOfferte() {

  const data = {
    gras: Number(document.getElementById('gras').value),
    tegels: Number(document.getElementById('tegels').value),
    heg: Number(document.getElementById('heg').value),
  }

  const response = await fetch('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  laatstePrijs = result.price

  document.getElementById('prijs').innerText =
    "€ " + result.price
}
async function bestelOfferte() {

  const order = {
    gras: Number(document.getElementById('gras').value),
    tegels: Number(document.getElementById('tegels').value),
    heg: Number(document.getElementById('heg').value),
    prijs: laatstePrijs,
    status: "Nieuw",
    date: new Date().toISOString().split('T')[0]
  }

  await fetch('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })

  alert("Bestelling opgeslagen!")
}
document.addEventListener("DOMContentLoaded", loadOrders)

async function loadOrders() {

  const response = await fetch('/orders')
  const orders = await response.json()

  const tbody = document.querySelector('.orders-table tbody')
  tbody.innerHTML = ''

  orders.forEach(order => {

    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td><input type="radio" name="selectedOrder" value="${order.id}"></td>
      <td>${order.id}</td>
      <td>Custom order</td>
      <td>€ ${order.prijs || order.offerte}</td>
      <td>${order.status}</td>
      <td>${order.date}</td>
    `

    tbody.appendChild(tr)
  })
}
async function updateStatus(newStatus) {

  const selected = document.querySelector(
    'input[name="selectedOrder"]:checked'
  )

  if (!selected) {
    alert("Selecteer eerst een order")
    return
  }

  const orderId = selected.value

  await fetch(`/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: newStatus
    })
  })

  loadOrders()
}
function goToAdmin() {
  window.location.href = "/admin.html";
}