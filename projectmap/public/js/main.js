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