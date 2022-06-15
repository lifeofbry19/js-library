let myLibrary = [];
const addBookBtn = document.querySelector(".add-book-btn");
const bookFormDiv = document.querySelector(".book-form-div");
const form = document.querySelector(".add-book-form");
const bookTitle = document.querySelector('input[name="title"]');
const bookAuthor = document.querySelector('input[name="author"]');
const bookPages = document.querySelector('input[name="pages"]');
const bookRead = document.querySelector('input[type="checkbox"]');
const libraryContainer = document.querySelector(".library-container");

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let readYet;
    this.read ? (readYet = "has been read") : (readYet = "not read yet");
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readYet}`;
  };
}

function onLoad() {
  addBookBtn.addEventListener("click", () => {
    bookFormDiv.classList.toggle("active");
  });
  form.addEventListener("submit", addToLibraryArray);
}

function addToLibraryArray() {
  let read = false;
  bookFormDiv.classList.toggle("active");
  console.log("form submitted");
  if (bookRead.value === "on") {
    read = true;
  }
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    read
  );

  console.log(newBook);
  myLibrary.push(newBook);
  console.log(myLibrary);
  displayLibrary();
  form.reset();
}

function addBookToLibraryArr() {
  // return <li> with a book element that gets added to html
  // add to the myLibrary array
}

function displayLibrary() {
  // take each element in the library array and display them all on cards
  newestElem = myLibrary[myLibrary.length - 1];

  let bookDiv = document.createElement("div");
  let titleP = document.createElement("p");
  let authorP = document.createElement("p");
  let pagesP = document.createElement("p");
  let readDiv = document.createElement("div");

  libraryContainer.appendChild(bookDiv);
  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(pagesP);
  bookDiv.appendChild(readDiv);

  titleP.textContent = newestElem.title;
  authorP.textContent = newestElem.author;
  pagesP.textContent = newestElem.pages;
  readDiv.textContent = newestElem.read ? "Read" : "Not Read";
  if (newestElem.read === true) {
    readDiv.classList.add("read");
  } else {
    readDiv.classList.add("not-read");
  }
}

onLoad();
