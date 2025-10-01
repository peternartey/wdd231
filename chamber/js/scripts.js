document.addEventListener("DOMContentLoaded", function () {
  console.log("Peter Nartey Chamber site loaded.");

  const gridButton = document.querySelector("#gridView");
  const listButton = document.querySelector("#listView");

  const displayArea = document.querySelector(".directory-display");
  const serviceList = document.getElementById("serviceList");

  if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
      // Directory section toggle
      if (displayArea) {
        displayArea.classList.add("grid");
        displayArea.classList.remove("list");
      }

      // Service list toggle
      if (serviceList) {
        serviceList.classList.add("grid");
        serviceList.classList.remove("list");
      }

      // Active state styling
      gridButton.classList.add("active");
      listButton.classList.remove("active");
    });

    listButton.addEventListener("click", () => {
      if (displayArea) {
        displayArea.classList.add("list");
        displayArea.classList.remove("grid");
      }

      if (serviceList) {
        serviceList.classList.add("list");
        serviceList.classList.remove("grid");
      }

      listButton.classList.add("active");
      gridButton.classList.remove("active");
    });
  }
});
