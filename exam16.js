class ParkingSpace {
    #spaceNumber;
    #size;
    #status;

    constructor(spaceNumber, size) {
        this.#spaceNumber = spaceNumber;
        this.#size = size;
        this.#status = "available";
    }

    get spaceNumber() {
        return this.#spaceNumber;
    }

    get size() {
        return this.#size;
    }

    get status() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }
}

class User {
    #name;
    #vehicleSize;

    constructor(name, vehicleSize) {
        this.#name = name;
        this.#vehicleSize = vehicleSize;
    }

    get name() {
        return this.#name;
    }

    get vehicleSize() {
        return this.#vehicleSize;
    }
}

class ParkingSystem {
    #parkingSpaces;
    #users;

    constructor() {
        this.#parkingSpaces =[];
        this.#users = [];
    }

    get parkingSpace() {
        return this.#parkingSpaces;
    }

    get users() {
        return this.#users;
    }

    registerParkingSpace(spaceNumber, size) {
        const parkingSpace = new ParkingSpace(spaceNumber, size);
        this.#parkingSpaces.push(parkingSpace);
    }

    registerUser(name, vehicleSize) {
        const user = new User(name, vehicleSize);
        this.#users.push(user);
    }

    reserveParkingSpace(user, spaceNumber) {
        const parkingSpace = this.#parkingSpaces.find(space => space.spaceNumber === spaceNumber);

        if (!parkingSpace || parkingSpace.status === "occupied") {
            console.log("Parking space not available.");
            return;
        }

        parkingSpace.setStatus("occupied");
        console.log(`Parking spase ${spaceNumber} reserved for ${user.name}.`);
    }

    calculateParkingFee(duration, spaceSize) {
        const hourlyRates = {
            compact: 3,
            regular: 5,
            large: 7,
        };

        if (!hourlyRates.hasOwnProperty(spaceSize)) {
            console.log("Invalid space size.");
            return 0;
        }

        const hourlyRate = hourlyRates[spaceSize];
        const totalCost = duration * hourlyRate;
        return totalCost;

        // const hourlyRate = 5;
        // return duration * hourlyRate;
    }

    generateReceipt(user, spaceNumber, duration) {
        const parkingSpace = this.#parkingSpaces.find(space => space.spaceNumber === spaceNumber);

        if (!parkingSpace) {
            console.log("Invalid space number.");
            return;
        }

        const spaceSize = parkingSpace.size;
        const totalCost = this.calculateParkingFee(duration, spaceSize);

        console.log(`
            Receips.
            User: ${user.name}
            Spase Number: ${spaceNumber}
            Spase Size: ${spaceSize}
            Duration: ${duration} hours
            Total Cost: ${totalCost}
        `);
    }
}

const parkingSystem = new ParkingSystem();

parkingSystem.registerParkingSpace(1, "compact");
parkingSystem.registerParkingSpace(2, "regular");
parkingSystem.registerParkingSpace(3, "large");

parkingSystem.registerUser("John", "compact");
parkingSystem.registerUser("Mark", "regular");

const user1 = parkingSystem.users[0];
parkingSystem.reserveParkingSpace(user1, 1);

const user2 = parkingSystem.users[1];
parkingSystem.reserveParkingSpace(user2, 2);

parkingSystem.generateReceipt(user1, 1, 3);
parkingSystem.generateReceipt(user2, 2, 4);