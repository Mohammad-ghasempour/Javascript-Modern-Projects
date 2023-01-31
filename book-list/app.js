
//book constructor
function Book (title , author , isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}

//event listeners
document.getElementById('book-form').addEventListener('submit' , function(e){
    const title = document.getElementById('title').value , 
    author = document.getElementById('author').value , 
    isbn = document.getElementById('isbn').value;
    e.preventDefault();

    //instantiate book
    const book = new Book(title , author , isbn);
    console.log(book)
} )