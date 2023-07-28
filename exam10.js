class Room {
    #roomNumber;
    #type;
    #isAvailable;

    constructor(roomNumber, type) {
        this.#roomNumber = roomNumber;
        this.#type = type;
        this.#isAvailable = true;
    }

    setIsAvailabe(isAvailable) {
        this.#isAvailable = isAvailable;
    }

    get roomNumber() {
        return this.#roomNumber;
    }

    get type() {
        return this.#type;
    }

    get isAvailable() {
        return this.#isAvailable;
    }
}

class Customer{
    #name;
    #contact;

    constructor(name, contact){
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

class RoomBookingSystem {
    #rooms;
    #customers;

    constructor() {
        this.#rooms = [];
        this.#customers = [];
    }

    get rooms() {
        return this.#rooms
    }

    get customer() {
        return this.#customers;
    }

    findAvailableRooms(type) {
        return this.#rooms.filter(room => room.type === type && room.isAvailable);
    }

    findRoomByNumber(roomNumber) {
        return this.#rooms.find(room => room.roomNumber === roomNumber);
    }

    registerRoom(room) {
        this.#rooms.push(room);
    }

    registerCustomer(customer) {
        this.#customers.push(customer);
    }

    bookRoom(customerName, roomType) {
        const customer = this.#customers.find(customer => customer.name === customerName);

        if (!customer) {
            throw new Error("Customer not found.")
        }

        const availableRooms = this.findAvailableRooms(roomType);

        if (availableRooms.length === 0) {
            throw new Error("No available rooms.");
        }

        const roomToBook = availableRooms[0];
        roomToBook.bookRoom;

        const bill = {
            customerName: customer.name,
            roomNumber: roomToBook.roomNumber,
            roomType: roomToBook.type,
            totalPrice: 100, 
        };

        this.printBill(bill);
        return bill;
    }

    printBill(bill) {
        console.log('Bill Details:');
        console.log('Customer Name:', bill.customerName);
        console.log('Room Number:', bill.roomNumber);
        console.log('Room Type:', bill.roomType);
        console.log('Total Price:', bill.totalPrice);
    }
}

const room1 = new Room('101', 'single');
const room2 = new Room('201', 'double');
const room3 = new Room('301', 'suite');

const customer1 = new Customer('John', 'john@gmail.com');
const customer2 = new Customer('Mark', 'mark@gmail.com');

const roomBookingSystem = new RoomBookingSystem();

roomBookingSystem.registerRoom(room1);
roomBookingSystem.registerRoom(room2);
roomBookingSystem.registerRoom(room3);
roomBookingSystem.registerCustomer(customer1);
roomBookingSystem.registerCustomer(customer2);

const bill1 = roomBookingSystem.bookRoom(customer1.name, 'single');
const bill2 = roomBookingSystem.bookRoom(customer2.name, 'double');