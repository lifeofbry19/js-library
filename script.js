const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
const addBookBtn = document.querySelector(".add-book-btn > button");
const bookFormDiv = document.querySelector(".book-form-div");
const form = document.querySelector(".add-book-form");
const bookTitle = document.querySelector('input[name="title"]');
const bookAuthor = document.querySelector('input[name="author"]');
const bookPages = document.querySelector('input[name="pages"]');
const bookRead = document.querySelector('input[type="checkbox"]');
const libraryContainer = document.querySelector(".library-container");
const removeBtn = document.querySelector(".remove");

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
    addBookBtn.classList.toggle("active");
    if (addBookBtn.classList.contains("active")) {
      addBookBtn.textContent = "X";
    } else {
      addBookBtn.textContent = "add book";
    }
  });
  form.addEventListener("submit", addToLibraryArray);
}

function addToLibraryArray() {
  let read = false;
  bookFormDiv.classList.toggle("active");
  addBookBtn.classList.toggle("active");
  if (addBookBtn.classList.contains("active")) {
    addBookBtn.textContent = "X";
  } else {
    addBookBtn.textContent = "add book";
  }
  console.log("form submitted");
  console.log(`book read? ${bookRead.value}`);
  if (bookRead.value === "on") {
    read = true;
  }
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    read
  );

  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  createBook(newBook);
  form.reset();
}

function displayLibrary() {
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((bookCard) => {
    libraryContainer.removeChild(bookCard);
  });
  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

function createBook(book) {
  // take each element in the library array and display them all on cards
  let index = myLibrary.indexOf(book);

  let bookDiv = document.createElement("div");
  let titleP = document.createElement("p");
  let authorP = document.createElement("p");
  let pagesP = document.createElement("p");
  let readDiv = document.createElement("div");
  let removeBtn = document.createElement("div");

  bookDiv.classList.add("book-card");
  libraryContainer.appendChild(bookDiv);
  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(pagesP);
  bookDiv.appendChild(readDiv);
  bookDiv.appendChild(removeBtn);

  bookDiv.setAttribute("data-index", index);
  removeBtn.classList.add("remove");
  removeBtn.textContent = "remove";
  readDiv.setAttribute("id", "read-btn");

  let readBtn = document.querySelector("#read-btn");
  titleP.textContent = book.title;
  authorP.textContent = book.author;
  pagesP.textContent = book.pages;
  if (book.read) {
    readDiv.textContent = "Read";
    readDiv.style.backgroundColor = "#63da63";
  } else {
    readDiv.textContent = "Not Read";
    readDiv.style.backgroundColor = "#e04f63";
  }

  removeBtn.addEventListener("click", (e) => {
    console.log(index);
    myLibrary.splice(index, 1);
    displayLibrary();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });

  readDiv.addEventListener("click", (e) => {
    console.log(index);
    book.read = !book.read;
    console.log(book);
    displayLibrary();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });
}

onLoad();
displayLibrary();
