const fs = require('fs')

function loadRates() {
  const data = fs.readFileSync('./data/rates.json')
  return JSON.parse(data)
}

function calculateQuote(input) {
  const rates = loadRates()

  let total = 0

  total += input.gras * rates.gras
  total += input.tegels * rates.tegels
  total += input.heg * rates.heg

  if (input.optie1) total += rates.extraOptie1
  if (input.optie2) total += rates.extraOptie2

  return total
}

module.exports = { calculateQuote }