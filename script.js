import seats from "./seat.js";
import { reset } from "./seat.js";
// -------------------------------------------------
const seatsGrid = document.querySelector(".seats-grid");
const summary = document.querySelector(".booking-summary-wrraper");
let selectedSeats = [];
let seatsCount = 0;
let TotalPrice = 0;
let selectedSeatsHTML = "";
let isBooking = true;
// -------------------------------------------------
function generateSeats() {
  let seatsHTML = "";
  seatsHTML += ``;
  for (let [seatName, seatProps] of Object.entries(seats)) {
    seatsHTML += `<div class="seat ${seatProps.row} column-${seatProps.column} ${seatProps.state === "reserved" && "reserved"} ${seatProps.state === "selected" && "selected"}"
      data-price="${seatProps.price}"
    >${seatName}</div>`;
  }
  seatsGrid.innerHTML = seatsHTML;
}

function generateSummary() {
  selectedSeats = [...document.querySelectorAll(".selected")];
  selectedSeatsHTML = selectedSeats.length
    ? selectedSeats.map((seat) => `<p>${seat.textContent}</p>`).join(" ")
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
            <span class="seats">${selectedSeatsHTML}</span>
          </div>
          <div class="seats-count">
            <span>Count:</span>
            <span> ${seatsCount}/ 3</span>
          </div>
          <div class="total-price">
            <span>Total Price:</span>
            <span>${TotalPrice} EGP</span>
          </div>

    `;
  summary.innerHTML = summaryHTML;
}

function generatePage() {
  generateSeats();
  generateSummary();

  if (isBooking) {
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
        seat.classList.toggle("selected");
        generateSummary();
      });
    });
  }
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (isBooking) {
    if (!selectedSeats.length) {
      document
        .querySelector(".zero-selected-feedback")
        .classList.remove("non-visible");
      document.querySelector(".zero-selected-feedback").textContent =
        "Please Select any seat";
      return;
    }

    alert(
      `succesfuly booked ${selectedSeats.map(
        (seat) => seat.textContent,
      )} with total of ${TotalPrice} EGP `,
    );
    selectedSeats.forEach((seat) => {
      let matchingSeat;
      for (let [seatName, seatProps] of Object.entries(seats)) {
        if (seat.textContent === seatName) {
          matchingSeat = seatProps;
        }
      }
      matchingSeat.changeState(true);
    });
    isBooking = false;
    generatePage();

    document.querySelectorAll(".seat").forEach((seat) => {
      seat.classList.add("unclickable");
    });
    document.querySelector(".submit-booking-btn").style.opacity = "0.7";
    document.querySelector(".submit-booking-btn").style.cursor = "unset";
  }
});

document.querySelector("form").addEventListener("reset", (e) => {
  e.preventDefault();
  reset();
  document
    .querySelector(".zero-selected-feedback")
    .classList.add("non-visible");
  isBooking = true;
  document.querySelector(".submit-booking-btn").style.opacity = "1";
  document.querySelector(".submit-booking-btn").style.cursor = "pointer";
  generatePage();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    reset();
    document
      .querySelector(".zero-selected-feedback")
      .classList.add("non-visible");
    isBooking = true;
    document.querySelector(".submit-booking-btn").style.opacity = "1";
    document.querySelector(".submit-booking-btn").style.cursor = "pointer";
    generatePage();
  }
});

generatePage();
