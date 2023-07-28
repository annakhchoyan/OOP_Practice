class Table {
    #tableNumber;
    #seatingCapacity;
    #status;

    constructor(tableNumber, seatingCapacity, status) {
        this.#tableNumber = tableNumber;
        this.#seatingCapacity = seatingCapacity;
        this.#status = "available";
    }

    get tableNumber() {
        return this.#tableNumber;
    }

    get seatingCapacity() {
        return this.#seatingCapacity;
    }

    get static() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
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

class TableReservationSystem {
    #tables;
    #users;
    #reservations;

    constructor() {
        this.#tables = [];
        this.#users = [];
        this.#reservations = [];
    }

    get tables() {
        return this.#tables;
    }

    get users() {
        return this.#users;
    }

    get reservations() {
        return this.#reservations;
    }

    registerTable(tableNumber, seatingCapacity) {
        const newTable = new Table(tableNumber, seatingCapacity);
        this.#tables.push(newTable);
    }

    registerUser(name, contact) {
        const newUser = new User(name, contact);
        this.#users.push(newUser);
    }

    bookTable(userId, seatingCapacity) {
        const user = this.#users.find((user) => user.contact === userId);

        if (!user) {
            console.log("User not found!");
            return;
        }

        const availableTables = this.#tables.filter((table) => table.status === "available");
        const availableTablesByCapacity = availableTables.filter((table) => table.seatingCapacity >= seatingCapacity);
        
        if (availableTablesByCapacity.length === 0) {
            console.log("No availabe tables.");
            return;
        }

        const selectedTable = availableTablesByCapacity[0];
        selectedTable.setStatus("booked");

        this.#reservations.push({
            user: user.name,
            tableNumber: selectedTable.tableNumber,
            seatingCapacity: selectedTable.seatingCapacity,
            reservationDate: new Date().toLocaleDateString(),
        });

        console.log(`Table ${selectedTable.tableNumber} has been booked by ${user.name}.`);
    }

    generateReport(date) {
        const reservationsOnDate = this.#reservations.filter((reservation) => reservation.reservationDate === date);

        console.log(`Reservation Report for ${date}:`);
        if (reservationsOnDate.length === 0) {
        console.log("No reservations found for this date.");
        } else {
        reservationsOnDate.forEach((reservation) => {
            console.log(`Table ${reservation.tableNumber} - ${reservation.user} (Capacity: ${reservation.seatingCapacity})`);
        });
        }
    }
}

const tableReservationSystem = new TableReservationSystem();

tableReservationSystem.registerTable(1, 4);
tableReservationSystem.registerTable(2, 6);

tableReservationSystem.registerUser("Alice", "alice@example.com");
tableReservationSystem.registerUser("Bob", "bob@example.com");

tableReservationSystem.bookTable("alice@example.com", 4);
tableReservationSystem.bookTable("bob@example.com", 6);

tableReservationSystem.generateReport(new Date().toLocaleDateString());