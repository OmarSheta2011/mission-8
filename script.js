import Seat from "./seat.js";
// -------------------------------------------------
const seatsGrid = document.querySelector(".seats-grid");
const summary = document.querySelector(".booking-summary");
let selectedSeats = [];
let seatsCount = 0;
let TotalPrice = 0;
let selectedSeatsHTML;
// -------------------------------------------------
function generateSeats() {
  let seatsHTML = "";
  seatsHTML += `
  ${Seat("A", 1)} ${Seat("A", 2)} ${Seat("A", 3)} ${Seat("A", 4)}
  ${Seat("B", 1)} ${Seat("B", 2)} ${Seat("B", 3)} ${Seat("B", 4)}
  ${Seat("C", 1)} ${Seat("C", 2)} ${Seat("C", 3)} ${Seat("C", 4)}
  `;
  const A2 = document.querySelector(".A.column-2");
  const B3 = document.querySelector(".B.column-3");
  return seatsHTML;
}

function generateSummary() {
  selectedSeats = [...document.querySelectorAll(".selected")];
  console.log(selectedSeats);
  selectedSeatsHTML = selectedSeats.length
    ? selectedSeats.map((seat) => `<p>${seat.textContent}</p>`)
    : "";
  seatsCount = selectedSeats.length;

  selectedSeats.forEach((seat) => {
    seat.classList.contains("C") ? (TotalPrice += 150) : (TotalPrice += 100);
  });

  const summaryHTML = `
    <h2 class="summary-title">Booking Summary</h2>
    <div id="selected-seats"><span>Selected-seats</span> <span>${selectedSeatsHTML}</span></div>
    <div class="seats-count"><span>Count:</span> <span> ${seatsCount}/ 3</span></div>
    <div class="total-price"><span>Total Price:</span> <span>${TotalPrice} EGP</span></div>
    <button class="submit-booking-btn">Submit Booking</button>
    <div class="zero-selected-feedback"></div>`;
  return summaryHTML;
}

function generatePage() {
  seatsGrid.innerHTML = generateSeats();
  summary.innerHTML = generateSummary();
  document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", function select() {
      if (seat.classList.contains("reserved")) return;
      if (selectedSeats.length + 1 === 4)
        alert("You can Only choose 3 seats at a time.");
      seat.classList.toggle("selected");
      console.log(seatsCount);
      summary.innerHTML = generateSummary();
    });
  });
  document
    .querySelector(".submit-booking-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      if (!selectedSeats.length) {
        document.querySelector(".zero-selected-feedback").textContent =
          "PleaseSelect any seat";
        return;
      }
      alert(
        `succesfuly booked ${selectedSeatsHTML} with total of ${TotalPrice} EGP `,
      );
    });
}

generatePage();
