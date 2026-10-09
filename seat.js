export default function Seat(row, column) {
  return `<div class="seat ${row} column-${column} ${row + column === "A2" || row + column === "B3" ? "reserved" : ""}">${row + column}</div>`;
}
