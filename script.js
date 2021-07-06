/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.fields');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Booklist {
  static display() {
    const listArr = Save.getData();
    for (let i = 0; i < listArr.length; i++) {
      const index = listArr.indexOf(listArr[i]);
      Booklist.add(listArr[i], index);
    }
  }

  static add(book, pos) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');
    const bookTitle = document.createElement('h4');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
    const author = document.createElement('span');
    author.textContent = book.author;
    bookCard.appendChild(author);
    const bookBtn = document.createElement('button');
    bookBtn.setAttribute('data-id', pos);
    bookBtn.classList.add('remove');
    bookBtn.textContent = 'Remove';
    bookCard.appendChild(bookBtn);
    bookContainer.appendChild(bookCard);
  }

  static remove(item) {
    const index = item.getAttribute('data-id');
    const newArr = Save.getData();
    if (index) {
      newArr.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(newArr));
    }
    if (item.classList.contains('remove')) {
      item.parentElement.remove();
    }
  }
}

class Save {
  static getData() {
    let dataArr;
    if (localStorage.getItem('data') === null) {
      dataArr = [];
    } else {
      dataArr = JSON.parse(localStorage.getItem('data'));
    }
    return dataArr;
  }

  static saveData(data) {
    const dataArr = Save.getData();
    dataArr.push(data);
    localStorage.setItem('data', JSON.stringify(dataArr));
  }
}

document.addEventListener('DOMContentLoaded', Booklist.display);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.elements.book.value;
  const author = form.elements.author.value;

  const book = new Book(title, author);

  form.reset();

  Save.saveData(book);

  Booklist.add(book);
});

bookContainer.addEventListener('click', (event) => {
  Booklist.remove(event.target);
});
