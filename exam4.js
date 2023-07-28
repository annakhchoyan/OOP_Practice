class Restaurant {
  #name;
  #menu;
  #location;

  constructor(name, menu, location) {
    this.#name = name;
    this.#menu = menu;
    this.#location = location;
  }

  get name() {
    return this.#name;
  }

  get menu() {
    return this.#menu;
  }

  get location() {
    return this.#location;
  }
}

class Customer {
  #name;
  #contact;
  #preferredPaymentMethod;

  constructor(name, contact, preferredPaymentMethod) {
    this.#name = name;
    this.#contact = contact;
    this.#preferredPaymentMethod = preferredPaymentMethod;
  }

  get name() {
    return this.#name;
  }

  get contact() {
    return this.#contact;
  }

  get preferredPaymentMethod() {
    return this.#preferredPaymentMethod;
  }
}

class Order {
  #customer;
  #restaurant;
  #items;
  #status;
  #estimatedDeliveryTime;

  constructor(customer, restaurant, items) {
    this.#customer = customer;
    this.#restaurant = restaurant;
    this.#items = items;
    this.#status = "Preparing";
    this.#estimatedDeliveryTime = null;
  }

  get customer() {
    return this.#customer;
  }

  get restaurant() {
    return this.#restaurant;
  }

  get items() {
    return this.#items;
  }

  get status() {
    return this.#status;
  }

  get estimatedDeliveryTime() {
    return this.#estimatedDeliveryTime;
  }

  setStatus(status) {
    this.#status = status;
  }

  setEstimatedDeliveryTime(time) {
    this.#estimatedDeliveryTime = time;
  }

  calculateTotalAmount() {
    let totalAmount = 0;
    this.#items.forEach(item => { totalAmount += item.price; });
    return totalAmount;
  }
}

const restaurant = new Restaurant("Delicious Delights", ["Burger", "Pizza", "Pasta"], "123 Main St");
const customer = new Customer("John", "john@gmail.com", "Credit Card");
const items = [
  { name: "Burger", price: 10.99 },
  { name: "Pizza", price: 12.99 },
  { name: "Coke", price: 2.99 }
];

const order = new Order(customer, restaurant, items);

order.setStatus("Dispatched");
order.setEstimatedDeliveryTime("30 minutes");

console.log("Order Details:");
console.log("Customer:", order.customer.name);
console.log("Restaurant:", order.restaurant.name);
console.log("Items:", order.items);
console.log("Status:", order.status);
console.log("Estimated Delivery Time:", order.estimatedDeliveryTime);
console.log("Total Amount Due:", order.calculateTotalAmount());

