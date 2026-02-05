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

      const targetId = button.dataset.section;

      hideAllSections();

      document.getElementById(targetId).style.display = "block";
    });
  });

  hideAllSections();
  document.getElementById("orders-section").style.display = "block";
});
