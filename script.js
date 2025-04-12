const filterBtns = document.querySelectorAll(".filter-btn");
const activityTexts = document.querySelectorAll(".activity");
const currentHoursElements = document.querySelectorAll(".current-hours");
const previousHoursElements = document.querySelectorAll(".previous-hours");

const clearActivityCards = () => {
  activityTexts.forEach((activity) => (activity.textContent = ""));
  currentHoursElements.forEach((current) => (current.textContent = ""));
  previousHoursElements.forEach((previous) => (previous.textContent = ""));
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.error("Failed to fetch data.json");

    return response.json();
  })
  .then((data) => {
    populateDOM(data); // TODO: Populate DOM with data
  });

clearActivityCards();
