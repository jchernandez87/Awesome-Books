/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.fields');
const mainList = document.querySelector('.main-list');
const mainAdd = document.querySelector('.main-add');
const mainContact = document.querySelector('.main-contact');
const listBtn = document.querySelector('button[data-btn="list-btn"]');
const addBtn = document.querySelector('button[data-btn="add-btn"]');
const contactBtn = document.querySelector('button[data-btn="contact-btn"]');
const today = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const monthText = document.querySelector('.month');
monthText.textContent = currentMonth();
const day = document.querySelector('.day');
day.textContent = `${today.getDay()}th`;
const year = document.querySelector('.year');
year.textContent = `${today.getFullYear()},`;
const hour = document.querySelector('.hour');
let hours = today.getHours();
hours %= 12;
hours = hours || 12;
hour.textContent = `${hours}: ${today.getMinutes()}`;
const AmPm = document.querySelector('.am-pm');
const test = today.getHours() >= 12 ? 'pm' : 'am';
AmPm.textContent = `${test}`;

function currentMonth() {
  let str = '';
  for (let i = 1; i < months.length; i++) {
    if (today.getMonth() === i) {
      str = months[i];
    }
  }
  return str;
}

listBtn.addEventListener('click', () => {
  mainList.classList.remove('hidden');
  mainAdd.classList.remove('show');
  mainContact.classList.remove('show');
});

addBtn.addEventListener('click', () => {
  mainAdd.classList.add('show');
  mainList.classList.add('hidden');
  mainContact.classList.remove('show');
});

contactBtn.addEventListener('click', () => {
  mainList.classList.add('hidden');
  mainContact.classList.add('show');
  mainAdd.classList.remove('show');
});

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
    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('aboutContainer');
    bookCard.appendChild(aboutContainer);
    const bookTitle = document.createElement('h4');
    bookTitle.textContent = `"${book.title}"`;
    aboutContainer.appendChild(bookTitle);
    const author = document.createElement('span');
    author.textContent = `by ${book.author}`;
    aboutContainer.appendChild(author);
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
