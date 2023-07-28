class Customer {
    #name;
    #contactInformation;
    #meterNumber;

    constructor(name, contactInformation, meterNumber) {
        this.#name = name;
        this.#contactInformation = contactInformation;
        this.#meterNumber = meterNumber;
    }

    get name() {
        return this.#name;
    }

    get contactInformation() {
        return this.#contactInformation;
    }

    get meterNumber() {
        return this.#meterNumber;
    }
}

class ElectricityUsage {
    #customer;
    #period;
    #consuption;

    constructor(customer, period, consumption) {
        this.#customer = customer;
        this.#period = period;
        this.#consuption = consumption;
    }

    get customer() {
        return this.#customer;
    }

    get period() {
        return this.#period;
    }

    get consumption() {
        return this.#consuption;
    }
}

class BillCalculator {
    #ratePerUnit;

    constructor(ratePerUnit) {
        this.#ratePerUnit = ratePerUnit;
    }

    calculateBill(usage) {
        return usage.consumption * this.#ratePerUnit
    }
}

class BillGenerator {
    generateBill(usage, billAmount) {
        console.log("Electricity Bill");
        console.log("----------------");
        console.log(`Name: ${usage.customer.name}`);
        console.log(`Contact Information: ${usage.customer.contactInformation}`);
        console.log(`Meter Number: ${usage.customer.meterNumber}`);
        console.log("Electricity Usage:");
        console.log(`Period: ${usage.period}`);
        console.log(`Consumption: ${usage.consumption} units`);
        console.log(`------------`);
        console.log(`Total Amount Due: $${billAmount}`);
    }
}

const customer = new Customer("John", "john@gmail.com", "1234");
const usage = new ElectricityUsage(customer, "June", 150);
const billCalculator = new BillCalculator(0.15);
const billAmount = billCalculator.calculateBill(usage);
const billGenerator = new BillGenerator();

billGenerator.generateBill(usage, billAmount);
