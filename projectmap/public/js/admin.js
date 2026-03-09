document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".admin-nav button");
  const sections = document.querySelectorAll("main section");

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = "none";
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      hideAllSections();
      const targetId = button.dataset.section;
      document.getElementById(targetId).style.display = "block";
    });
  });

  hideAllSections();
  document.getElementById("orders-section").style.display = "block";

  fetch('/orders')
    .then(response => response.json())
    .then(orders => {
      const tbody = document.querySelector('.admin-table tbody');
      tbody.innerHTML = ''; 

      orders.forEach((order, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.id}</td>
          <td>${order.klant}</td>
          <td>${order.details}</td>
          <td>${order.offerte}</td>
          <td>${order.status}</td>
          <td>${order.date}</td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error('Error:', err));
});

function handleCreateOrder() {
  const orderData = {
    klant: document.getElementById('klant').value,
    details: document.getElementById('details').value,
    offerte: Number(document.getElementById('offerte').value),
    status: document.getElementById('status').value
  };

  createOrder(orderData);
}

function createOrder(orderData) {
  fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Order added:', data);
      // loadOrders(); // если есть
    })
    .catch(err => console.error(err));
}