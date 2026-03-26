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

  const buttons = document.querySelectorAll(".admin-nav button");
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
      <td>${order.klant ?? ""}</td>
      <td>${order.details ?? ""}</td>
      <td>€${order.offerte ?? ""}</td>
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
    offerte: Number(document.getElementById("offerte").value),
    status: document.getElementById("status").value
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


// ===============================
// PACKAGES CRUD
// ===============================

async function loadPackages() {

  const response = await fetch("/packages");
  const packages = await response.json();

  const tbody = document.querySelector("#packages-section tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  packages.forEach(pkg => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${pkg.name}</td>
      <td>${pkg.description}</td>
      <td>€${pkg.price}</td>
      <td><button onclick="editPackage(${pkg.id})">Bewerk</button></td>
      <td><button onclick="deletePackage(${pkg.id})">Verwijder</button></td>
    `;

    tbody.appendChild(row);
  });
}


// CREATE
async function addPackage() {

  const name = document.getElementById("package-name").value;
  const description = document.getElementById("package-description").value;
  const price = document.getElementById("package-price").value;

  if (!name || !description || !price) {
    alert("Vul alle velden in!");
    return;
  }

  await fetch("/packages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price })
  });

  loadPackages();
}


// DELETE
async function deletePackage(id) {

  if (!confirm("Weet je zeker?")) return;

  await fetch(`/packages/${id}`, {
    method: "DELETE"
  });

  loadPackages();
}


// UPDATE (быстрый способ)
async function editPackage(id) {

  const newPrice = prompt("Nieuwe prijs:");

  if (!newPrice) return;

  await fetch(`/packages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price: newPrice })
  });

  loadPackages();
}


// ===============================
// NAVIGATION TO INDEX
// ===============================

function goToIndex() {
  window.location.href = "/index.html";
}

window.goToIndex = goToIndex;