class TravelPackage {
  #destination;
  #price;
  #availableSlots;
  #bookedSlots;

  constructor(destination, price, availableSlots) {
    this.#destination = destination;
    this.#price = price;
    this.#availableSlots = availableSlots;
    this.#bookedSlots = 0;
  }

  get destination() {
    return this.#destination;
  }

  get price() {
    return this.#price;
  }

  get availablieSlots() {
    return this.#availableSlots;
  }

  get bookedSlots() {
    return this.#bookedSlots;
  }

  bookSlot() {
    if (this.#availableSlots > 0) {
      this.#availableSlots--;
      this.#bookedSlots++;
      return true;
    }
    return false;
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
  #travelPackage;

  constructor(user, travelPackage) {
    this.#user = user;
    this.#travelPackage = travelPackage;
  }

  get user() {
    return this.#user;
  }

  get travelPackage() {
    return this.#travelPackage;
  }

  printTicket() {
    console.log(`User: ${this.#user.name}`);
    console.log(`Contact: ${this.#user.contact}`);
    console.log(`Destination: ${this.#travelPackage.destination}`);
    console.log(`Price: $${this.#travelPackage.price}`);
  }
}

class BookingSystem {
  #travelPackages;
  #users;

  constructor() {
    this.#travelPackages = [];
    this.#users = [];
  }

  get travelPackages() {
    return this.#travelPackages;
  }

  get users() {
    return this.#users;
  }

  registerTravelPackage(destination, price, availableSlots) {
    const travelPackage = new TravelPackage(destination, price, availableSlots);
    this.#travelPackages.push(travelPackage);
    return this.#travelPackages;
  }

  registerUser(name, contact) {
    const user = new User(name, contact);
    this.#users.push(user);
  }

  searchByPrice(maxPrice) {
    return this.#travelPackages.filter((travelPackage) => travelPackage.price <= maxPrice);
  }

  searchBySlots(minSlots) {
    return this.#travelPackages.filter((travelPackage) => travelPackage.availableSlots >= minSlots);
  }

  viewItinerary(travelPackageIndex) {
    const travelPackage = this.#travelPackages[travelPackageIndex];
    console.log(`Destination: ${travelPackage.destination}`);
    console.log(`Price: $${travelPackage.price}`);
    console.log(`Available Slots: ${travelPackage.availableSlots}`);
    console.log(`Booked Slots: ${travelPackage.bookedSlots}`);
  }

  bookSlot(userIndex, travelPackageIndex) {
    const user = this.#users[userIndex];
    const travelPackage = this.#travelPackages[travelPackageIndex];

    if (travelPackage.bookSlot()) {
      const ticket = new Ticket(user, travelPackage);
      ticket.printTicket();
    } else {
      console.log("Sorry, no slots available for this travel package.");
    }
  }
}

const bookingSystem = new BookingSystem();

bookingSystem.registerTravelPackage("Paris", 1000, 10);
bookingSystem.registerTravelPackage("Tokyo", 2000, 5);
bookingSystem.registerTravelPackage("New York", 1500, 8);

bookingSystem.registerUser("Alice", "alice@gmail.com");
bookingSystem.registerUser("Bob", "bob@gmail.com");

const maxPrice = 1500;
const matchedPackagesByPrice = bookingSystem.searchByPrice(maxPrice);
console.log(matchedPackagesByPrice);

const minSlots = 5;
const matchedPackagesBySlots = bookingSystem.searchBySlots(minSlots);
console.log(matchedPackagesBySlots);

const travelPackageIndex = 0;
bookingSystem.viewItinerary(travelPackageIndex);

const userIndex = 0;
bookingSystem.bookSlot(userIndex, travelPackageIndex);
bookingSystem.bookSlot(userIndex, travelPackageIndex);
bookingSystem.registerUser("Eve", "eve@gmail.com");

const users = bookingSystem.users;
console.log(users);

const bookings = bookingSystem.users.map((user, index) => {
  const travelPackage = bookingSystem.travelPackages[index];
  return new Ticket(user, travelPackage);
});

bookings.forEach((booking) => {
  console.log("Ticket");
  booking.printTicket();
});