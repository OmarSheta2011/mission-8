class Seat {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.name = this.row + this.column;
    this.price = this.row === "C" ? 150 : 100;
    if (this.name === "A2" || this.name === "B3") {
      this.state = "reserved";
    } else {
      this.state = "available";
    }
  }

  changeState() {
    if (this.state === "available") {
      this.state = "selected";
    } else {
      this.state = "available";
    }
  }
}

const seats = {};
for (let letter of ["A", "B", "C"]) {
  for (let i = 1; i < 5; i++) {
    seats[letter + i] = new Seat(letter, i);
  }
}
console.log(seats);
export default seats;
