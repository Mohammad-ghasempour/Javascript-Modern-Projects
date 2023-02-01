class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td> <a href="#" class="delete">X</a> </td>`;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (confirm("Are you sure to delete this item?")) {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBook() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = Store.getBooks()
    books.forEach((book , index)=>{
        if (book.isbn === isbn){
            books.splice(index,1);
        }
    })
    localStorage.setItem('books' , JSON.stringify(books));

  }
}

//event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  e.preventDefault();

  //instantiate book
  const book = new Book(title, author, isbn);
  const ui = new UI();
  //validate form
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all inputs!", "error");
  } else {
    //instantiate UI
    ui.addBookToList(book);
    //add to local storage
    Store.addBook(book);
    //show success
    ui.showAlert("Book added!", "success");
    //clear form
    ui.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert("Book deleted successfully", "success");
  }
  e.preventDefault;
});

document.addEventListener("DOMContentLoaded", Store.displayBook);
