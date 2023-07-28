class Customer {
    #name;
    #contactInformation;
    #interactionHistory;

    constructor(name, contactInformation, interactionHistory) {
        this.#name = name;
        this.#contactInformation = contactInformation;
        this.#interactionHistory = [];
    }

    get name() {
        return this.#name;
    }

    get contactInformation() {
        return this.#contactInformation;
    }

    get interactionHistory() {
        return this.#interactionHistory;
    }

    addInteraction(interaction) {
        this.#interactionHistory.push(interaction);
    }

    generateReport() {
        console.log(`Customer Nume: ${this.#name}`);
        console.log(`Contact Information: ${this.#contactInformation}`);
        console.log("Interaction History:");
        this.#interactionHistory.forEach((interaction, index) => {
            console.log(`Interaction ${index + 1}:`);
            console.log(`Type: ${interaction.type}`);
            console.log(`Date: ${interaction.date}`);
            console.log(`User: ${interaction.user}`);
            console.log(`Details: ${interaction.details}`);
        });
    }
}

class Interaction {
    #type;
    #date;
    #user;
    #details;

    constructor(type, date, user, details) {
        this.#type = type;
        this.#date = date;
        this.#user = user;
        this.#details = details;
    }

    get type() {
        return this.#type;
    }

    get date() {
        return this.#date;
    }

    get user() {
        return this.#user;
    }

    get details() {
        return this.#details;
    }
}

class Sale extends Interaction {
    #amount;
    #warrantyPeriod;

    constructor(type, date, user, details, amount, warrantyPeriod) {
        super(type, date, user, details);
        this.#amount = amount;
        this.#warrantyPeriod = warrantyPeriod;
    }

    get amount() {
        return this.#amount;
    }

    get warrantyPeriod() {
        return this.#warrantyPeriod;
    }
}

class WarrantyService extends Interaction {
    #serviceCost;

    constructor(type, date, user, details, serviceCost) {
        super(type, date, user, details);
        this.#serviceCost = serviceCost;
    }

    get serviceCost() {
        return this.#serviceCost;
    }
}

class Complaint extends Interaction {
    constructor(type, date, user, details) {
        super(type, date, user, details);
    }
}

const customer = new Customer("John", "john@gmail.com");

const sale1 = new Sale("Sale", "2023-07-10", "Alice", "Product A", 100, 1);
const warrantyService1 = new WarrantyService("Warranty Service", "2023-07-11", "Bob", "Repair", 50);
const complaint1 = new Complaint("Complaint", "2023-07-12", "Charlie", "Defective product");

customer.addInteraction(sale1);
customer.addInteraction(warrantyService1);
customer.addInteraction(complaint1);

customer.generateReport();