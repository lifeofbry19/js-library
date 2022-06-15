const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
const addBookBtn = document.querySelector(".add-book-btn");
const bookFormDiv = document.querySelector(".book-form-div");
const form = document.querySelector(".add-book-form");
const bookTitle = document.querySelector('input[name="title"]');
const bookAuthor = document.querySelector('input[name="author"]');
const bookPages = document.querySelector('input[name="pages"]');
const bookRead = document.querySelector('input[type="checkbox"]');
const libraryContainer = document.querySelector(".library-container");
const readBtn = document.querySelector('#read-btn');
const removeBtn = document.querySelector('.remove');

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

  console.log(newBook);
  myLibrary.push(newBook);
  console.log(myLibrary);
  createBook(newBook);
  form.reset();
}

function displayLibrary() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(bookCard => {
    libraryContainer.removeChild(bookCard)
  })
  for (let i=0; i < myLibrary.length; i++){
      createBook(myLibrary[i]);
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  console.log(myLibrary)
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
  
  bookDiv.classList.add('book-card')
  libraryContainer.appendChild(bookDiv);
  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(pagesP);
  bookDiv.appendChild(readDiv);
  bookDiv.appendChild(removeBtn);

  bookDiv.setAttribute('data-index', index);
  removeBtn.classList.add('remove');
  removeBtn.textContent = 'remove';
  readDiv.setAttribute('id', 'read-btn');

  let readBtn = document.querySelector('#read-btn')
  titleP.textContent = book.title;
  authorP.textContent = book.author;
  pagesP.textContent = book.pages;
  readDiv.textContent = book.read ? "Read" : "Not Read";
  if (book.read === true) {
    readDiv.classList.add("read");
  } else {
    readDiv.classList.add("not-read");
  }

  removeBtn.addEventListener('click', (e) => {
    console.log(e);
    let cardDiv = e.path[1];
    console.log(cardDiv);
    while(cardDiv.firstChild) {
      cardDiv.removeChild(cardDiv.firstChild)
    }
    libraryContainer.removeChild(cardDiv);
    myLibrary.splice(index, 1);
    displayLibrary();
  });

  readBtn.addEventListener('click', () => {
    if (readDiv.classList.contains('read')) {
      readDiv.classList.remove('read')
      readDiv.classList.add('not-read')
    } else {
      readDiv.classList.remove('not-read')
      readDiv.classList.add('read')
    }
  });

}


onLoad();
displayLibrary();