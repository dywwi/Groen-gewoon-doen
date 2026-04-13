// ===============================
// ADMIN PANEL SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  setupNavigation();
  loadOrders();
  loadPackages();

});


// ===============================
// NAVIGATION
// ===============================

function setupNavigation() {

  const buttons = document.querySelectorAll("nav button");
  const sections = document.querySelectorAll("main section");

  function hideAll() {
    sections.forEach(s => s.style.display = "none");
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      hideAll();

      const target = button.dataset.section;
      document.getElementById(target).style.display = "block";
    });
  });

  // show first tab
  hideAll();
  if (buttons.length > 0) {
    document.getElementById(buttons[0].dataset.section).style.display = "block";
  }
}


// ===============================
// ORDERS
// ===============================

async function loadOrders() {

  const response = await fetch("/orders");
  const orders = await response.json();

  // ВАЖНО: отдельная таблица orders
  const tbody = document.querySelector("#orders-section tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  orders.forEach((order, index) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.id ?? ""}</td>
      <td>${order.prijs ?? ""}</td>
      <td>
        <select onchange="updateOrderStatus(${order.id}, this.value)">
          <option ${order.status === 'Nieuw' ? 'selected' : ''}>Nieuw</option>
          <option ${order.status === 'Akkoord' ? 'selected' : ''}>Akkoord</option>
          <option ${order.status === 'Niet akkoord' ? 'selected' : ''}>Niet akkoord</option>
        </select>
      </td>
      <td>${order.date ?? "-"}</td>
    `;

    tbody.appendChild(tr);
  });
}


// CREATE ORDER
function handleCreateOrder() {

  const order = {
    klant: document.getElementById("klant").value,
    details: document.getElementById("details").value,
    prijs: Number(document.getElementById("prijs").value),
    status: document.getElementById("status").value,
        date: new Date().toISOString().split('T')[0]
  };

  fetch("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  })
  .then(() => {
    alert("Order toegevoegd!");
    loadOrders();
  });
}


// UPDATE STATUS
function updateOrderStatus(id, status) {

  fetch(`/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(() => loadOrders());
}

async function loadPackages() {
  const response = await fetch('/packages');
  const packages = await response.json();

  const tbody = document.querySelector('#packages-section tbody');
  tbody.innerHTML = '';

  packages.forEach((pkg, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pkg.name}</td>
      <td>${pkg.description}</td>
      <td>€${pkg.price}</td>
      <td><button onclick="editPackage(${index})">Bewerk</button></td>
      <td><button onclick="deletePackage(${index})">Verwijder</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function addPackage() {
  const name = document.getElementById('package-name').value;
  const description = document.getElementById('package-description').value;
  const price = document.getElementById('package-price').value;

  if(!name || !description || !price) return alert('Vul alle velden in!');

  await fetch('/packages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });

  document.getElementById('package-name').value = '';
  document.getElementById('package-description').value = '';
  document.getElementById('package-price').value = '';

  loadPackages();
}

async function deletePackage(id) {
  if(!confirm('Weet je zeker dat je dit pakket wilt verwijderen?')) return;
  await fetch('/packages/' + id, { method: 'DELETE' });
  loadPackages();
}

async function editPackage(id) {

  const name = prompt("Nieuwe naam:")
  const description = prompt("Nieuwe beschrijving:")
  const price = prompt("Nieuwe prijs:")

  if (!name || !description || !price) return

  await fetch('/packages/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  })

  loadPackages()
}

// CreateOrder functie 
async function handleCreateOrder() {

  const klant = document.getElementById("klant").value;
  const details = document.getElementById("details").value;
  const offerte = document.getElementById("offerte").value;
  const status = document.getElementById("status").value;

  const order = {
    klant: klant,
    details: details,
    offerte: offerte,
    status: status
  };

  const response = await fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  if (response.ok) {
    alert("Order toegevoegd!");
  } else {
    alert("Er ging iets mis.");
  }
}

async function loadTarieven() {
  const response = await fetch('/tarieven')
  const data = await response.json()

  document.getElementById('prijs-gras').value = data.gras
  document.getElementById('prijs-tegels').value = data.tegels
}

async function saveTarieven() {

  const gras = document.getElementById('prijs-gras').value
  const tegels = document.getElementById('prijs-tegels').value

  await fetch('/tarieven', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gras, tegels })
  })

  alert("Opgeslagen!")
}