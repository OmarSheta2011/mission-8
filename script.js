import seats from "./seat.js";
// -------------------------------------------------
const seatsGrid = document.querySelector(".seats-grid");
const summary = document.querySelector(".booking-summary");
let selectedSeats = [];
let seatsCount = 0;
let TotalPrice = 0;
let selectedSeatsHTML = "";
// -------------------------------------------------
function generateSeats() {
  let seatsHTML = "";
  seatsHTML += ``;
  for (let [seatName, seatProps] of Object.entries(seats)) {
    seatsHTML += `<div class="seat ${seatProps.row} column-${seatProps.column} ${seatProps.state === "reserved" && "reserved"} ${seatProps.state === "selected" && "selected"}"
      data-price="${seatProps.price}"
    >${seatProps.name}</div>`;
  }
  seatsGrid.innerHTML = seatsHTML;
}

function generateSummary() {
  selectedSeats = [...document.querySelectorAll(".selected")];
  selectedSeatsHTML = selectedSeats.length
    ? selectedSeats.map((seat) => `<p>${seat.textContent}</p>`)
    : "";
  seatsCount = selectedSeats.length;

  TotalPrice = 0;
  selectedSeats.forEach((seat) => {
    seat.classList.contains("C") ? (TotalPrice += 150) : (TotalPrice += 100);
  });

  const summaryHTML = `
    <h2 class="summary-title">Booking Summary</h2>
    <div class="selected-seats">
      <span>Selected-seats</span>
      <span class='seats'>${selectedSeatsHTML}</span></div>
    <div class="seats-count">
      <span>Count:</span>
      <span> ${seatsCount}/ 3</span></div>
    <div class="total-price">
      <span>Total Price:</span>
      <span>${TotalPrice} EGP</span></div>
    <button class="submit-booking-btn">Submit Booking</button>
    <div class="zero-selected-feedback non-visible"></div>`;
  summary.innerHTML = summaryHTML;
}

function generatePage() {
  generateSeats();
  generateSummary();

  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", function select(e) {
      if (seat.classList.contains("reserved")) return;
      if (
        selectedSeats.length + 1 === 4 &&
        !e.target.classList.contains("selected")
      ) {
        alert("You can Only choose 3 seats at a time.");
        return;
      }
      let matchingSeat;
      for (let [seatName, seatProps] of Object.entries(seats)) {
        if (seat.textContent === seatName) {
          matchingSeat = seatProps;
        }
      }
      matchingSeat.changeState();
      console.log(matchingSeat);
      seat.classList.toggle("selected");

      generateSummary();
    });
  });
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedSeats.length) {
    document
      .querySelector(".zero-selected-feedback")
      .classList.remove("non-visible");
    document.querySelector(".zero-selected-feedback").textContent =
      "Please Select any seat";
    return;
  }
  console.log(selectedSeats);
  alert(
    `succesfuly booked ${selectedSeats.map(
      (seat) => seat.textContent,
    )} with total of ${TotalPrice} EGP `,
  );
  seatsCount = 0;
  TotalPrice = 0;
  selectedSeatsHTML = "";
  generatePage();
});

generatePage();
