const filterBtns = document.querySelectorAll(".filter-btn");
const activityTexts = document.querySelectorAll(".activity");
const currentHoursElements = document.querySelectorAll(".current-hours");
const previousHoursElements = document.querySelectorAll(".previous-hours");

const clearTextContent = (elements) => {
  elements.forEach((element) => (element.textContent = ""));
};

const clearActivityCards = () => {
  clearTextContent(activityTexts);
  clearTextContent(currentHoursElements);
  clearTextContent(previousHoursElements);
};

const removeActiveClassFromButtons = () => {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
};

const updateActivityCard = (index, title, current, previous) => {
  if (activityTexts[index]) activityTexts[index].textContent = title;
  if (currentHoursElements[index]) currentHoursElements[index].textContent = `${current}hrs`;
  if (previousHoursElements[index]) previousHoursElements[index].textContent = previous;
};

const populateDOM = (data, filter = "daily") => {
  data.forEach((activity, index) => {
    const { title, timeframes } = activity;
    const { current, previous } = timeframes[filter];
    updateActivityCard(index, title, current, previous);
  });
};

const handleFilterButtonClick = (data, filter, button) => {
  clearActivityCards();
  removeActiveClassFromButtons();
  button.classList.add("active");
  populateDOM(data, filter);
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data.json");
    return response.json();
  })
  .then((data) => {
    populateDOM(data);

    filterBtns.forEach((btn) => {
      const filter = btn.dataset.filter;
      btn.addEventListener("click", () => handleFilterButtonClick(data, filter, btn));
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
