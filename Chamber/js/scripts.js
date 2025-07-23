// Placeholder for future interactivity
document.addEventListener("DOMContentLoaded", function () {
  console.log("Peter Nartey Chamber site loaded.");
  const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const displayArea = document.querySelector(".directory-display");

gridButton.addEventListener("click", () => {
  displayArea.classList.add("grid");
  displayArea.classList.remove("list");
});

listButton.addEventListener("click", () => {
  displayArea.classList.add("list");
  displayArea.classList.remove("grid");
});

});
