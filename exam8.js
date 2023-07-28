class Book {
  #title;
  #author;
  #genre;
  #price;
  #quantityInStock;

  constructor(title, author, genre, price, quantityInStock) {
    this.#title = title;
    this.#author = author;
    this.#genre = genre;
    this.#price = price;
    this.#quantityInStock = quantityInStock;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get genre() {
    return this.#genre;
  }

  get price() {
    return this.#price;
  }

  get quantityInStock() {
    return this.#quantityInStock;
  }

  reduceStock(quantity) {
    if (this.#quantityInStock >= quantity) {
      this.#quantityInStock -= quantity;
      return true;
    }
    return false;
  }
}

class Customer {
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

class ShoppingCart {
  #items;

  constructor() {
    this.#items = [];
  }

  // get items() {
  //   return this.#items;
  // }

  addItem(book, quantity) {
    this.#items.push({book, quantity});
  }

  removeItem(book) {
    const index = this.#items.findIndex(item => item.book === book);

    if (index !== -1) {
      this.#items.splice(index, 1);
    }
  }

  getTotalCost() {
    let totalCost = 0;
    for (let item of this.#items) {
      totalCost += item.book.price * item.quantity;
    }
    return totalCost;
  }

  checkout() {
    for (let item of this.#items) {
      if (!item.book.reduceStock(item.quantity)) {
        throw new Error(`Not enough stock available.`);
      }
    }
    return this.#items;
  }

  clearCart() {
    this.#items = [];
  }
}

class BookStore {
  #books;
  #customers;
  #purchases;

  constructor() {
    this.#books = [];
    this.#customers = [];
    this.#purchases = [];
  }

  registerBook(title, author, genre, price, quantityInStock) {
    const book = new Book(title, author, genre, price, quantityInStock);
    this.#books.push(book);
  }

  registerCustomer(name, contact) {
    const customer = new Customer(name, contact);
    this.#customers.push(customer);
  }

  searchBooksByTitle(title) {
    return this.#books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  getBookByTitle(title) {
    return this.#books.find(book => book.title.toLowerCase() === title.toLowerCase());
  }

  getCustomerByName(name) {
    return this.#customers.find(customer => customer.name.toLowerCase() === name.toLowerCase());
  }

  purchaseBooks(customer, shoppingCart) {
    const purchaseDetails = {
      customer: customer.name,
      totalAmount: shoppingCart.getTotalCost(),
      books: shoppingCart.checkout(),
    };

    this.#purchases.push(purchaseDetails);
    shoppingCart.clearCart();
    return purchaseDetails;
  }

  printPurchaseHistory() {
    for (const purchase of this.#purchases) {
      console.log(`Customer: ${purchase.customer}`);
      console.log(`Total Amount: $${purchase.totalAmount.toFixed(2)}`);
      console.log("Purchased Books:");
      for (const item of purchase.books) {
        console.log(`- ${item.book.title} (Quantity: ${item.quantity})`);
      }
    }
  }
}

const bookStore = new BookStore();

bookStore.registerBook("Book 1", "Author 1", "Genre 1", 20.99, 50);
bookStore.registerBook("Book 2", "Author 2", "Genre 2", 15.99, 30);
bookStore.registerBook("Book 3", "Author 3", "Genre 1", 25.50, 40);

bookStore.registerCustomer("John Doe", "john@example.com");

const customer = bookStore.getCustomerByName("John Doe");
const shoppingCart = new ShoppingCart();
shoppingCart.addItem(bookStore.getBookByTitle("Book 1"), 2);
shoppingCart.addItem(bookStore.getBookByTitle("Book 3"), 1);

const totalCost = shoppingCart.getTotalCost();
console.log(`Total Cost: $${totalCost.toFixed(2)}`);

try {
    const purchaseDetails = bookStore.purchaseBooks(customer, shoppingCart);
    console.log("Purchase Successful!");
    console.log(purchaseDetails);
} catch (error) {
    console.log("Purchase Failed:", error.message);
}

console.log("Purchase History:");
bookStore.printPurchaseHistory();
