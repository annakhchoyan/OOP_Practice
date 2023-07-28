class Movie {
  #title;
  #duration;
  #rating;
  #showtimes;
  #bookedSeats;

  constructor(title, duration, rating, showtimes) {
    this.#title = title;
    this.#duration = duration;
    this.#rating = rating;
    this.#showtimes = showtimes;
    this.#bookedSeats = new Map(); // Map to store booked seats for each showtime
  }

  get title() {
    return this.#title;
  }

  get duration() {
    return this.#duration;
  }

  get rating() {
    return this.#rating;
  }

  get showtimes() {
    return this.#showtimes;
  }

  get bookedSeats() {
    return this.#bookedSeats;
  }

  isShowtimeAvailable(showtime) {
    return this.#bookedSeats.has(showtime) ? this.#bookedSeats.get(showtime).length < 10 : true;
  }

  bookSeat(showtime, seatNumber) {
    if (!this.#bookedSeats.has(showtime)) {
      this.#bookedSeats.set(showtime, []);
    }

    if (this.#bookedSeats.get(showtime).length >= 10) {
      return false; // Showtime is fully booked
    }

    this.#bookedSeats.get(showtime).push(seatNumber);
    return true; // Booking successful
  }
}

class User {
  #name;
  #contact;

  constructor(name, contact) {
    this.#name = name;
    this.#contact = contact;
  }

  get name() {
    return this.#name;
  }

  get contact() {
    return this.#contact;
  }
}

class Ticket {
  #user;
  #movie;
  #showtime;
  #seatNumber;

  constructor(user, movie, showtime, seatNumber) {
    this.#user = user;
    this.#movie = movie;
    this.#showtime = showtime;
    this.#seatNumber = seatNumber;
  }

  get user() {
    return this.#user;
  }

  get movie() {
    return this.#movie;
  }

  get showtime() {
    return this.#showtime;
  }

  get seatNumber() {
    return this.#seatNumber;
  }

  printTicket() {
    console.log("----- Ticket -----");
    console.log(`User: ${this.#user.name}`);
    console.log(`Contact: ${this.#user.contact}`);
    console.log(`Movie Title: ${this.#movie.title}`);
    console.log(`Showtime: ${this.#showtime}`);
    console.log(`Seat Number: ${this.#seatNumber}`);
    console.log("-------------------");
  }
}

class MovieTicketBookingSystem {
  #movies;
  #users;

  constructor() {
    this.#movies = [];
    this.#users = [];
  }

  get movies() {
    return this.#movies;
  }

  get users() {
    return this.#users;
  }

  registerMovie(title, duration, rating, showtimes) {
    const movie = new Movie(title, duration, rating, showtimes);
    this.#movies.push(movie);
    return this.#movies;
  }

  registerUser(name, contact) {
    const user = new User(name, contact);
    this.#users.push(user);
    return user;
  }

  searchMoviesByTitle(searchTitle) {
    return this.#movies.filter((movie) => movie.title.toLowerCase().includes(searchTitle.toLowerCase()));
  }

  searchMovieShowtimes(movieIndex) {
    const movie = this.#movies[movieIndex];
    return movie.showtimes;
  }

  bookTicket(userIndex, movieIndex, showtimeIndex, seatNumber) {
    const user = this.#users[userIndex];
    const movie = this.#movies[movieIndex];
    const showtime = movie.showtimes[showtimeIndex];

    if (!movie.isShowtimeAvailable(showtime)) {
      console.log("Sorry, the selected showtime is fully booked.");
      return false;
    }

    if (movie.bookSeat(showtime, seatNumber)) {
      const ticket = new Ticket(user, movie, showtime, seatNumber);
      ticket.printTicket();
      return true;
    } else {
      console.log("Sorry, the selected seat is not available.");
      return false;
    }
  }
}

const bookingSystem = new MovieTicketBookingSystem();

bookingSystem.registerMovie("Avengers: Endgame", "3h 2m", "PG-13", ["2023-07-10 14:00", "2023-07-10 18:00"]);
bookingSystem.registerMovie("Inception", "2h 28m", "PG-13", ["2023-07-10 16:30", "2023-07-10 20:00"]);
bookingSystem.registerMovie("The Dark Knight", "2h 32m", "PG-13", ["2023-07-10 15:15", "2023-07-10 19:15"]);

const user1 = bookingSystem.registerUser("Alice", "alice@gmail.com");
const user2 = bookingSystem.registerUser("Bob", "bob@gmail.com");

const searchTitle = "Avengers";
const matchedMovies = bookingSystem.searchMoviesByTitle(searchTitle);
console.log(matchedMovies);

const movieIndex = 0;
const showtimes = bookingSystem.searchMovieShowtimes(movieIndex);
console.log(showtimes);

const userIndex = 0;
const showtimeIndex = 0;
const seatNumber = "A1";
bookingSystem.bookTicket(userIndex, movieIndex, showtimeIndex, seatNumber);

const user3 = bookingSystem.registerUser("Eve", "eve@gmail.com");
const movieIndex2 = 1;
const userIndex2 = 1;
const showtimeIndex2 = 1;
const seatNumber2 = "B3";
bookingSystem.bookTicket(userIndex2, movieIndex2, showtimeIndex2, seatNumber2);
