class Delivery {
    #item;
    #origin;
    #destination;
    #deliveryTime;
    #status;

    constructor(item, origin, destination, deliveryTime) {
        this.#item = item;
        this.#origin = origin;
        this.#destination = destination;
        this.#deliveryTime = deliveryTime;
        this.#status = "Pending";
    }

    get item() {
        return this.#item;
    }

    get origin() {
        return this.#origin;
    }

    get destination() {
        return this.#destination;
    }

    get deliveryTime() {
        return this.#deliveryTime;
    }

    get status() {
        return this.#status;
    }

    setUpdeateStatus(status) {
        this.#status = status;
    }

    generateReceipt() {
        console.log("Delivery.");
        console.log(`Item: ${this.#item}`);
        console.log(`Origin: ${this.#origin}`);
        console.log(`Destination: ${this.#destination}`);
        console.log(`DeliveryTime: ${this.#deliveryTime}`);
        console.log(`Status: ${this.#status}`);
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

class DeliverySystem {
    #deliveries;
    #users;

    constructor() {
        this.#deliveries = [];
        this.#users =[];
    }

    get deliveries() {
        return this.#deliveries;
    }

    get users() {
        return this.#users;
    }

    registerUser(name, contact) {
        const user = new User(name, contact);
        this.#users.push(user);
        return user;
    }

    registerDelivery(item, origin, destination, deliveryTime) {
        const delivery = new Delivery(item, origin, destination, deliveryTime);
        this.#deliveries.push(delivery);
        return delivery;
    }

    trackDelivery(deliveryIndex) {
        return this.#deliveries[deliveryIndex].status;
    }

    updateStatus(delivery, status) {
        if(this.#deliveries.includes(delivery)) {
            delivery.setUpdeateStatus(status);
        } else {
            console.log("Delivery not found.");
        }
    }

    // deliveryTimeSort() {
    //     this.#deliveries.sort((a, b) => {
    //         const timeA = new Date(a.deliveryTime);
    //         const timeB = new Date(b.deliveryTime);
    //         if (timeA > timeB) {
    //             return "Delay!";
    //         } else return timeA - timeB;
    //     });
    // }
    
}

const deliverySystem = new DeliverySystem();

const user1 = deliverySystem.registerUser("Anna", "anna@gmail.com");
const delivery1 = deliverySystem.registerDelivery("Book", "Bookstore", "Anna", "2023-07-23 15:32");

deliverySystem.updateStatus(delivery1, "In transit.")

const receipt = delivery1.generateReceipt();



