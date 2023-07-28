class Taxi {
    #taxiNumber;
    #driverName;
    #status;
    #taxiClass;

    constructor(taxiNumber, driverName, status, taxiClass) {
        this.#taxiNumber = taxiNumber;
        this.#driverName = driverName;
        this.#status = "available";
        this.#taxiClass = taxiClass;
    }

    get taxiNumber() {
        return this.#taxiNumber;
    }

    get driverName() {
        return this.#driverName;
    }

    get status() {
        return this.#status;
    }

    get taxiClass() {
        return this.#taxiClass;
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

class TaxiSystem {
    #taxis;
    #users;

    constructor() {
        this.#taxis = [];
        this.#users = [];
    }

    get taxis() {
        return this.#taxis;
    }

    get users() {
        return this.#users;
    }

    registerTaxi(taxiNumber, driverName, taxiClass) {
        const newTaxi = new Taxi(taxiNumber, driverName, taxiClass);
        this.#taxis.push(newTaxi);
    }

    registerUser(name, contact) {
        const newUser = new User(name, contact);
        this.#users.push(newUser);
    }

    bookTaxt(userId, taxiNumber) {
        const user = this.#users.find((user) => user.contact === userId);
        const taxi = this.#taxis.find((taxi) => taxi.taxiNumber === taxiNumber);

        if (!user || !taxi) {
            console.log("User or Taxi not found.");
            return;
        }

        if (taxi.status === "available") {
            taxi.setStatus("booked");
            console.log(`${taxiNumber} taxi has been booked by ${user.name}.`);
        } else {
            console.log(`${taxiNumber} taxi is not available for boking.`);
        }
    }

    calculateFare(distance, taxiClass) {
        let fareMultiplicer;

        if (taxiClass === "start") {
            fareMultiplicer = 1;
        } else if (taxiClass === "comfort") {
            fareMultiplicer = 1.8;
        } else if (taxiClass === "business") {
            fareMultiplicer = 3;
        } else {
            fareMultiplicer = 1;
        }

        return distance * fareMultiplicer;
    }

    generateReceipt(distance, taxiClass, taxiNumber, userName) {
        const fare = this.calculateFare(distance, taxiClass);

        console.log("Receipt.");
        console.log(`Taxi Number: ${taxiNumber}`);
        console.log(`User Name: ${userName}`);
        console.log(`Distance Traceled: ${distance}km`);
        console.log(`Taxi Class: ${taxiClass}`);
        console.log(`Fare: ${fare}`);
    }
}

const taxiSystem = new TaxiSystem();

taxiSystem.registerTaxi("T11", "John", "comfort");
taxiSystem.registerTaxi("T22", "Mark", "buisness");

taxiSystem.registerUser("Ane", "ane@gmail.com");
taxiSystem.registerUser("Bob", "bob@gmail.com");

taxiSystem.bookTaxt("ane@mail.com", "T11");

const distanceTraveled = 20;
const taxiClassUsed = "comfort";
const taxiNumberUsed = "TX123";
const userName = "Alice";
taxiSystem.generateReceipt(distanceTraveled, taxiClassUsed, taxiNumberUsed, userName);