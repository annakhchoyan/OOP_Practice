class Book {
  #title;
  #author;
  #genre;
  #isAvailable;

  constructor(title, author, genre) {
    this.#title= title;
    this.#author = author;
    this.#genre = genre;
    this.#isAvailable = true;
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

  get isAvailable() {
    return this.#isAvailable;
  }

  set isAvailable(value) {
    this.#isAvailable = value;
  }
}

class Member {
  #name;
  #contactInformation;
  #borrowedBooks;

  constructor(name, contactInformation) {
    this.#name = name;
    this.#contactInformation = contactInformation;
    this.#borrowedBooks = [];
  }

  get name() {
    return this.#name;
  }

  get contactInformation() {
    return this.#contactInformation;
  }

  get borrowedBooks() {
    return this.#borrowedBooks;
  }

  borroweBook(book) {
    if (book.isAvailable) {
      book.isAvailable = false;
      this.#borrowedBooks.push(book);
      console.log(`Book "${book.title}" successfully borrowed by ${this.#name}.`);
    } else {
      console.log(`Book "${book.title}" is not available.`);
    }
  }

  returnBook(book) {
    const index = this.#borrowedBooks.indexOf(book);

    if (index !== -1) {
      this.#borrowedBooks.splice(index, 1);
      book.isAvailable = true;
      console.log(`Book "${book.title}" successfully returned by ${this._name}.`);
    } else {
      console.log(`You have not borrowed the book "${book.title}".`);
    }
  }
}

class Library {
  #books;
  #members;
  
  constructor() {
    this.#books = [];
    this.#members = [];
  }

  get members() {
    return this.#members;
  }

  get books() {
    return this.#books;
  }

  registerBook(title, author, genre) {
    const book = new Book(title, author, genre);
    this.#books.push(book);
    console.log(`Book "${title}" registered successfully.`);
  }

  registerMember(name, contactInformation) {
    const member = new Member(name, contactInformation);
    this.#members.push(member);
    console.log(`Member "${name}" registered successfully.`);
  }

  searchBooksByTitle(title) {
    const foundBooks = this.#books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    if (foundBooks.length > 0) {
      console.log(`Books with title "${title}"`);
      foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
    } else { 
      console.log(`No books found with title "${title}".`);
    }
  }

  searchBooksByAuthor(author) {
    const foundBooks = this.#books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    if (foundBooks.length > 0) {
      console.log(`Books by author "${author}":`);
      foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
    } else {
      console.log(`No books found by author "${author}".`);
    }
  }

  searchBooksByGenre(genre) {
    const foundBooks = this.#books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
    if (foundBooks.length > 0) {
      console.log(`Books in genre "${genre}":`);
      foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
    } else {
      console.log(`No books found in genre "${genre}".`);
    }
  }

  borrowBook(memberName, bookTitle) {
    const member = this.#members.find(member => member.name === memberName);
    if (member) {
      const book = this.#books.find(book => book.title === bookTitle);
      if (book) {
        member.borroweBook(book);
      } else {
        console.log(`Book "${bookTitle}" not found.`);
      }
    } else {
      console.log(`Member "${memberName}" not found.`);
    }
  }

  returnBook(memberName, bookTitle) {
    const member = this.#members.find(member => member.name === memberName);
    if (member) {
      const book = member.borrowedBooks.find(book => book.title === bookTitle);
      if(book) {
        member.returnBook(book);
      } else {
        console.log(`You have not borrowed the book "${bookTitle}".`);
      }
    } else {
      console.log(`Member "${memberName}" not found.`);
    }
  }
}

const library = new Library();

// Register books
library.registerBook('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic');
library.registerBook('To Kill a Mockingbird', 'Harper Lee', 'Classic');
library.registerBook('1984', 'George Orwell', 'Dystopian');
library.registerBook('Pride and Prejudice', 'Jane Austen', 'Romance');

// Register members
library.registerMember('John Doe', 'john@example.com');
library.registerMember('Jane Smith', 'jane@example.com');

// Search books
library.searchBooksByTitle('To Kill a Mockingbird');
library.searchBooksByAuthor('George Orwell');
library.searchBooksByGenre('Classic');

// Borrow and return books
library.borrowBook('John Doe', 'The Great Gatsby');
library.borrowBook('Jane Smith', 'To Kill a Mockingbird');
library.borrowBook('Jane Smith', '1984');
library.returnBook('John Doe', 'The Great Gatsby');
library.returnBook('Jane Smith', 'To Kill a Mockingbird');

// Search borrowed books by member
const johnBooks = library.members.find(member => member.name === 'John Doe').borrowedBooks;
console.log(`Books borrowed by John Doe: ${johnBooks.length}`);
johnBooks.forEach(book => console.log(`- ${book.title}`));



// class Book {
//   constructor(title, author, genre) {
//     this._title = title;
//     this._author = author;
//     this._genre = genre;
//     this._isAvailable = true;
//   }

//   get title() {
//     return this._title;
//   }

//   get author() {
//     return this._author;
//   }

//   get genre() {
//     return this._genre;
//   }

//   get isAvailable() {
//     return this._isAvailable;
//   }

//   set isAvailable(value) {
//     this._isAvailable = value;
//   }
// }

// class Member {
//   constructor(name, contactInfo) {
//     this._name = name;
//     this._contactInfo = contactInfo;
//     this._borrowedBooks = [];
//   }

//   get name() {
//     return this._name;
//   }

//   get contactInfo() {
//     return this._contactInfo;
//   }

//   get borrowedBooks() {
//     return this._borrowedBooks;
//   }

//   borrowBook(book) {
//     if (book.isAvailable) {
//       book.isAvailable = false;
//       this._borrowedBooks.push(book);
//       console.log(`Book "${book.title}" successfully borrowed by ${this._name}.`);
//     } else {
//       console.log(`Book "${book.title}" is not available.`);
//     }
//   }

//   returnBook(book) {
//     const index = this._borrowedBooks.indexOf(book);
//     if (index !== -1) {
//       this._borrowedBooks.splice(index, 1);
//       book.isAvailable = true;
//       console.log(`Book "${book.title}" successfully returned by ${this._name}.`);
//     } else {
//       console.log(`You have not borrowed the book "${book.title}".`);
//     }
//   }
// }

// class Library {
//   constructor() {
//     this._books = [];
//     this._members = [];
//   }

//   registerBook(title, author, genre) {
//     const book = new Book(title, author, genre);
//     this._books.push(book);
//     console.log(`Book "${title}" registered successfully.`);
//   }

//   registerMember(name, contactInfo) {
//     const member = new Member(name, contactInfo);
//     this._members.push(member);
//     console.log(`Member "${name}" registered successfully.`);
//   }

//   searchBooksByTitle(title) {
//     const foundBooks = this._books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
//     if (foundBooks.length > 0) {
//       console.log(`Books with title "${title}":`);
//       foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
//     } else {
//       console.log(`No books found with title "${title}".`);
//     }
//   }

//   searchBooksByAuthor(author) {
//     const foundBooks = this._books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
//     if (foundBooks.length > 0) {
//       console.log(`Books by author "${author}":`);
//       foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
//     } else {
//       console.log(`No books found by author "${author}".`);
//     }
//   }

//   searchBooksByGenre(genre) {
//     const foundBooks = this._books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
//     if (foundBooks.length > 0) {
//       console.log(`Books in genre "${genre}":`);
//       foundBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
//     } else {
//       console.log(`No books found in genre "${genre}".`);
//     }
//   }

//   borrowBook(memberName, bookTitle) {
//     const member = this._members.find(member => member.name === memberName);
//     if (member) {
//       const book = this._books.find(book => book.title === bookTitle);
//       if (book) {
//         member.borrowBook(book);
//       } else {
//         console.log(`Book "${bookTitle}" not found.`);
//       }
//     } else {
//       console.log(`Member "${memberName}" not found.`);
//     }
//   }

//   returnBook(memberName, bookTitle) {
//     const member = this._members.find(member => member.name === memberName);
//     if (member) {
//       const book = member.borrowedBooks.find(book => book.title === bookTitle);
//       if (book) {
//         member.returnBook(book);
//       } else {
//         console.log(`You have not borrowed the book "${bookTitle}".`);
//       }
//     } else {
//       console.log(`Member "${memberName}" not found.`);
//     }
//   }
// }

// // Example usage:

// const library = new Library();

// // Register books
// library.registerBook('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic');
// library.registerBook('To Kill a Mockingbird', 'Harper Lee', 'Classic');
// library.registerBook('1984', 'George Orwell', 'Dystopian');
// library.registerBook('Pride and Prejudice', 'Jane Austen', 'Romance');

// // Register members
// library.registerMember('John Doe', 'john@example.com');
// library.registerMember('Jane Smith', 'jane@example.com');

// // Search books
// library.searchBooksByTitle('To Kill a Mockingbird');
// library.searchBooksByAuthor('George Orwell');
// library.searchBooksByGenre('Classic');

// // Borrow and return books
// library.borrowBook('John Doe', 'The Great Gatsby');
// library.borrowBook('Jane Smith', 'To Kill a Mockingbird');
// library.borrowBook('Jane Smith', '1984');
// library.returnBook('John Doe', 'The Great Gatsby');
// library.returnBook('Jane Smith', 'To Kill a Mockingbird');

// // Search borrowed books by member
// const johnBooks = library._members.find(member => member.name === 'John Doe').borrowedBooks;
// console.log(`Books borrowed by John Doe: ${johnBooks.length}`);
// johnBooks.forEach(book => console.log(`- ${book.title}`));
