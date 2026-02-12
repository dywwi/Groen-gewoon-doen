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
    .catch(err => console.error('Ошибка загрузки заказов:', err));
});
