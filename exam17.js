class Donor {
    #name;
    #contact;
    #bloodType;

    constructor(name, contact, bloodType) {
        this.#name = name;
        this.#contact = contact;
        this.#bloodType = bloodType;
    }

    get name() {
        return this.#name;
    }

    get contact() {
        return this.#contact;
    }

    get bloodType() {
        return this.#bloodType;
    }
}

class BloodUnit {
    #bloodType;
    #count;
    #date;

    constructor(bloodType, count, date) {
        this.#bloodType = bloodType;
        this.#count = count;
        this.#date = date;
    }

    get bloodType() {
        return this.#bloodType;
    }

    get count() {
        return this.#count;
    }

    get date() {
        return this.#date;
    }

    set count(value) {
        this.#count = value;
    }
}

class BloodBank {
    #donors;
    #inventory;
    #history;

    constructor() {
        this.#donors = [];
        this.#inventory = [];
        this.#history = [];
    }

    get donors() {
        return this.#donors;
    }

    get inventory() {
        return this.#inventory;
    }

    get history() {
        return this.#history;
    }

    addInventory(existingUnitIndex, count) {
        this.#inventory[existingUnitIndex].count += count;
    }

    subInventory(existingUnitIndex, count) {
        this.#inventory[existingUnitIndex].count -= count;
    }

    registerDonor(name, contact, bloodType) {
        const donor = new Donor(name, contact, bloodType);
        this.#donors.push(donor);
    }

    addBloodUnit(bloodType, count, date) {
        const existingUnitIndex = this.#inventory.findIndex((unit) => unit.bloodType === bloodType);
        if (existingUnitIndex !== -1) {
            // this.#inventory[existingUnitIndex].count += count;
            this.addInventory(existingUnitIndex, count);
        } else {
            const bloodUnit = new BloodUnit(bloodType, count, date);
            this.#inventory.push(bloodUnit);
        }

        this.#history.push({operation: "add", bloodType, count, date});
    }

    utilizeBloodUnit(bloodType, count, date) {
        const existingUnitIndex = this.#inventory.findIndex((unit) => unit.bloodType === bloodType);

        if (existingUnitIndex !== -1) {
            if (this.#inventory[existingUnitIndex].count >= count) {
                // this.#inventory[existingUnitIndex].count -= count;
                this.subInventory(existingUnitIndex, count);
                this.#history.push({operation: "utilize", bloodType, count, date});
                return true;
            }
        }
        return false;
    }

    generateInventoryReport() {
        const report = {};

        for (let unit of this.#inventory) {
            if (!report[unit.bloodType]){
                report[unit.bloodType] = unit.count;
            } else {
                report[unit.bloodType] += unit.count;
            }
        }
        return report;
    }

    generateLowStockReport(threshold) {
        const lowStockBloodTypes = [];
        const inventoryReport= this.generateInventoryReport();

        for (let bloodType in inventoryReport) {
            if (inventoryReport.hasOwnProperty(bloodType)) {
                const count = inventoryReport[bloodType];

                if (count <= threshold) {
                    lowStockBloodTypes.push(bloodType);
                }
            }
        }
        return lowStockBloodTypes;
    }
}

const bloodBank = new BloodBank();

bloodBank.registerDonor("John", "093939393", "A+");
bloodBank.registerDonor("Mark", "094949494", "B+");

bloodBank.addBloodUnit("A+", 5, new Date("2023-06-06"));
bloodBank.addBloodUnit("B+", 4, new Date("2023-07-07"));

const utilizationSuccess = bloodBank.utilizeBloodUnit("A+", 3, new Date());
console.log("Utilization success:", utilizationSuccess);

const inventoryReport = bloodBank.generateInventoryReport();
console.log("Blood Inventory Report:");
console.log(inventoryReport);

const lowStockBloodTypes = bloodBank.generateLowStockReport(5);
console.log("Blood Types with Low Stock:");
console.log(lowStockBloodTypes);