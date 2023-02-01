//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td> <a href="#" class="delete">X</a> </td>`;
  list.appendChild(row);
};
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
UI.prototype.showAlert = function(message , className){
const div = document.createElement('div');
div.className=`alert ${className}`;
div.appendChild(document.createTextNode(message));
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
container.insertBefore(div, form);
setTimeout(function (){
  document.querySelector('.alert').remove();
}, 3000)
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
   ui.showAlert('Please fill in all inputs!' , 'error');
  } else {
    //instantiate UI
    ui.addBookToList(book);

    //show success
    ui.showAlert('Book added!' , 'success');

    //clear form
    ui.clearFields();
  }
});
