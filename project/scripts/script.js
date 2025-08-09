// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const footer = document.querySelector("footer");

  // Toggle menu visibility
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking a nav link (mobile)
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
      }
    });
  });

  // Insert current year in footer
  const year = new Date().getFullYear();
  const yearSpan = document.createElement("span");
  yearSpan.textContent = `© ${year} DIJESAM TECHNOLOGY`;
  footer.appendChild(yearSpan);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});
