class Member {
    #name;
    #contact;
    #membershipLevel;
    #membershipExpiry;
    #usageLog;

    constructor(name, contact, membershipLevel) {
        this.#name = name;
        this.#contact = contact;
        this.#membershipLevel = membershipLevel;
        this.#membershipExpiry = new Date();
        this.#membershipExpiry.setDate(this.#membershipExpiry.getDate() + 30);
        this.#usageLog = {
            fitness: 0,
            massage: 0,
            pool: 0,
        };
    }

    get name() {
        return this.#name;
    }

    get contact() {
        return this.#contact;
    }

    get membershipLevel() {
        return this.#membershipLevel;
    }

    get membershipExpiry() {
        return this.#membershipExpiry;
    }

    get usageLog() {
        return this.#usageLog;
    }

    checkUsage(area) {
        const allowedEntries = this.membershipLevel === "standard" ? 12 : this.membershipLevel === "premium" ? 24 : Infinity;
        return this.#usageLog[area] < allowedEntries;
    }
    
    increaseUsage(area) {
        this.#usageLog[area]++;
    }
    
    generateMonthlyStatistics() {
        console.log(`Monthly Statistics for ${this.#name}`);
        for (const area in this.#usageLog) {
            console.log(`${area} - Entries: ${this.#usageLog[area]}`);
        }
    }

    upgradeMembership() {
        const currentMembership = this.membershipLevel;

        if (currentMembership === "standard") {
            this.#membershipLevel = "premium";
            console.log(`${this.#name} upgraded membership to premium.`);
        } else if (currentMembership === "premium") {
            this.#membershipLevel = "all included";
            console.log(`${this.#name} upgraded membership to all included.`);
        } else {
            console.log(`${this.#name} is already on the highest membership level.`);
        }
    }
    
    downgradeMembership() {
        const currentMembership = this.membershipLevel;

        if (currentMembership === "premium") {
            this.#membershipLevel = "standard";
            console.log(`${this.#name} downgraded membership to standard.`);
        } else if (currentMembership === "all included") {
            this.#membershipLevel = "premium";
            console.log(`${this.#name} downgraded membership to premium.`);
        } else {
            console.log(`${this.#name} is already on the lowest membership level.`);
        }
    }
}

class Club {
    #members;

    constructor() {
        this.#members= [];
    }

    addMember(member) {
        this.#members.push(member);
    }

    get members() {
        return this.#members;
    }

    findMemberByName(name) {
        return this.#members.find(member => member.name === name);
    }

    trackUsage(member, area) {
        if (member.checkUsage(area)) {
            member.increaseUsage(area);
            console.log(`${member.name} used ${area}`);
        } else {
            console.log(`${member.name} has exceeded allowed entries for ${area}`);
        }
    }

    calculateMonthlyFees(member) {
        const membershipLevel = member.membershipLevel;
        const standardFee = 100;
        const premiumFee = 150;
        const allIncludedFee = 200;

        if (membershipLevel === "standard") {
            return standardFee;
        } else if (membershipLevel === "premium") {
            return premiumFee;
        } else if (membershipLevel === "all included") {
            return allIncludedFee;
        } else {
            console.log("Invalid membership level.");
            return 0;
        }
    }
}

const club = new Club();
const member1 = new Member("John", "john@gmail.com", "standard");
const member2 = new Member("Mark", "mark@gmail.com", "premium");

club.addMember(member1);
club.addMember(member2);

club.trackUsage(member1, "fitness");
club.trackUsage(member1, "fitness");
club.trackUsage(member1, "pool");
club.trackUsage(member1, "massage");

club.trackUsage(member2, "pool");
club.trackUsage(member2, "pool");
club.trackUsage(member2, "pool");
club.trackUsage(member2, "pool");

member1.generateMonthlyStatistics();
member2.generateMonthlyStatistics();

const monthlyFee1 = club.calculateMonthlyFees(member1);
const monthlyFee2 = club.calculateMonthlyFees(member2);

console.log(`${member1.name} monthly fee: $${monthlyFee1}`);
console.log(`${member2.name} monthly fee: $${monthlyFee2}`);