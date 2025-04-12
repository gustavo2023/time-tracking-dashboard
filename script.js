const filterBtns = document.querySelectorAll(".filter-btn");
const activityTexts = document.querySelectorAll(".activity");
const currentHoursElements = document.querySelectorAll(".current-hours");
const previousHoursElements = document.querySelectorAll(".previous-hours");

const clearActivityCards = () => {
  activityTexts.forEach((activity) => (activity.textContent = ""));
  currentHoursElements.forEach((current) => (current.textContent = ""));
  previousHoursElements.forEach((previous) => (previous.textContent = ""));
};

const removeActivityClass = () => {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
};

const populateDOM = (data, filter = "daily") => {
  data.forEach((activity, index) => {
    const { title, timeframes } = activity;
    const { current, previous } = timeframes[filter];

    // Assign the title to the corresponding activityText element
    if (activityTexts[index]) {
      activityTexts[index].textContent = title;
    }

    // Assign the current and previous hours to the corresponding elements
    if (currentHoursElements[index]) {
      currentHoursElements[index].textContent = `${current}hrs`;
    }
    if (previousHoursElements[index]) {
      previousHoursElements[index].textContent = previous;
    }
  });
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.error("Failed to fetch data.json");

    return response.json();
  })
  .then((data) => {
    populateDOM(data);

    filterBtns.forEach((btn) => {
      const filter = btn.dataset.filter;
      btn.addEventListener("click", () => {
        clearActivityCards();
        removeActivityClass();
        btn.classList.add("active");
        populateDOM(data, filter);
      });
    });
  });
