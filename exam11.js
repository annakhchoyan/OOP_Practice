const { executionAsyncResource } = require("async_hooks");
const { createInflateRaw } = require("zlib");

class Flight {
    #flightNumber;
    #origin;
    #destination;
    #departureDateTime;
    #totalSeats;
    #availableSeats;

    constructor(flightNumber, origin, destination, departureDateTime, totalSeats) {
        this.#flightNumber = flightNumber;
        this.#origin = origin;
        this.#destination = destination;
        this.#departureDateTime = departureDateTime;
        this.#totalSeats = totalSeats;
        this.#availableSeats = totalSeats;       
    }

    get flightNumber() {
        return this.#flightNumber;
    }

    get origin() {
        return this.#origin;
    }

    get destination() {
        return this.#destination;
    }

    get departureDateTime() {
        return this.#departureDateTime;
    }

    get totalSeats() {
        return this.#totalSeats;
    }

    get availableSears(){
        return this.#availableSeats;
    }

    bookSeats(numSeats) {
        if (numSeats <= this.#availableSeats) {
            this.#availableSeats -= numSeats;
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

class FlightBookingSystem {
    #users;
    #flights;

    constructor() {
        this.#users = [];
        this.#flights = [];
    }

    get users() {
        return this.#users;
    }

    get flights() {
        return this.#flights;
    }

    setUsers(user) {
        this.#users.push(user);
    }

    setFlights(flight) {
        this.#flights.push(flight);
    }

    registerFlight(flight) {
        // this.#flights.push(flight);
        this.setFlights(flight);
    }

    registerUser(user) {
        // this.#users.push(user);
        this.setUsers(user)
    }

    findFlightByNumber(flightNumber) {
        return this.#flights.find(flight => flightNumber === flightNumber);
    }

    findUserByName(name) {
        return this.#users.find(user => user.name === name);
    }

    searchFlights(criteria) {
        return this.#flights.filter(flight => 
            flight.origin.toLowerCase() === criteria.origin.toLowerCase() &&
            flight.destination.toLowerCase() === criteria.destination.toLowerCase() &&
            new Date(flight.departureDateTime).getTime() >= new Date(criteria.departureDateFrom).getTime() &&
            new Date(flight.departureDateTime).getTime() <= new Date(criteria.departureDateTo).getTime()
        );
    }

    bookFlight(userName, flightNumber, numSeats) {
        const flight = this.findFlightByNumber(flightNumber);
        const user = this.findUserByName(userName);

        if (!flight || !user) {
            throw new Error("Flight or user not found.");
        }

        if (flight.bookSeats(numSeats)) {
            const ticket = {
                flightNumber: flight.flightNumber,
                origin: flight.origin,
                destination: flight.destination,
                departureDateTime: flight.departureDateTime,
                bookedSeats: numSeats,
                passenger: user.name,
                contact: user.contact,
            };

            this.printTicket(ticket);
            return ticket;
        } else {
            throw new Error("No available seats for the selected flight.")
        }
    }

    printTicket(ticket) {
        console.log('Ticket Details:');
        console.log('Passenger Name:', ticket.passenger);
        console.log('Contact Information:', ticket.contact);
        console.log('Flight Number:', ticket.flightNumber);
        console.log('Origin:', ticket.origin);
        console.log('Destination:', ticket.destination);
        console.log('Departure Date & Time:', ticket.departureDateTime);
        console.log('Booked Seats:', ticket.bookedSeats);
    }
}

const flight1 = new Flight('A12', 'New York', 'Los Angeles', '2023-07-30 10:00', 100);
const flight2 = new Flight('B23', 'London', 'Berlin', '2023-08-02 15:30', 80);

const user1 = new User('John', 'john@gmail.com');

const flightBookingSystem = new FlightBookingSystem();

flightBookingSystem.registerFlight(flight1);
flightBookingSystem.registerFlight(flight2);
flightBookingSystem.registerUser(user1);

const searchCriteria = {
  origin: 'New York',
  destination: 'Los Angeles',
  departureDateFrom: '2023-07-29',
  departureDateTo: '2023-07-31'
};

const searchResults = flightBookingSystem.searchFlights(searchCriteria);
console.log('Search Results:', searchResults);

const selectedFlight = searchResults[0];
const bookedTicket = flightBookingSystem.bookFlight(user1.name, selectedFlight.flightNumber, 2);
