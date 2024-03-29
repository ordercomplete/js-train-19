// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створення базового об'єкту "Book"
class Book {
  constructor(title, author, pages) {
    this.title = title || "Загальна Книга";
    this.author = author || "Анонім";
    this.pages = pages || 0;
    this.read = function () {
      console.log("Ви читаєте " + this.title + " від " + this.author);
    };
  }
}

// Створюємо об'єкт Book
const book1 = new Book("Пригоди", "Джон Сміт", 300);

console.log("Завдання: 1 ==============================");

// Виводимо в консоль Об'єкт: Book
console.log("Об'єкт: Book");
console.log(book1);

// Виводимо в консоль прототип Об'єкту: Book
console.log("Прототип об'єкту: Book");
console.log(Book.prototype);

// Викликаємо функцію read об'єкту Book
book1.read();
// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book
let Novel = Object.create(Book);

// Додаємо властивість genre
Novel.genre = "Новела";

console.log("Завдання: 2 ==============================");

// Виводимо в консоль Об'єкт: Novel
console.log("Об'єкт: Novel");
console.log(Novel);

// Виводимо в консоль прототип Об'єкту: Novel
console.log("Прототип об'єкта: Novel");
console.log(Object.getPrototypeOf(Novel));

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography
let Biography = new Book("Загальна Біографія", "Біограф", 200);

// Зміна прототипу об'єкта Biography на об'єкт Novel
Object.setPrototypeOf(Biography, Novel.prototype);

console.log("Завдання: 3 ==============================");

// Виведення об'єкта Biography в консоль
console.log("Об'єкт: Biography");
console.log(Biography);

// Перевірка чи є Novel прототипом об'єкта Biography та виведення результату в консоль
console.log(
  "Чи є Novel прототипом об'єкта Biography: " +
    (Object.getPrototypeOf(Biography) === Novel.prototype)
);

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

class ScienceBook extends Book {
  constructor(title, author, pages, info) {
    super(title, author, pages);
    let _info = info;

    Object.defineProperty(this, "info", {
      configurable: false,
      enumerable: true, // неможливо видалити

      set: function (value) {
        if (value) {
          throw new Error(
            "Cannot assign to read only property 'info' of object '#<ScienceBook>'"
          );
        }
      },
      get: function () {
        return `Про книгу "${this.title}": "${_info}"`;
      },
    });
  }
}

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер, який присвоє властивості info значення, яке отримує при виклику; помилку більше не отримуємо, але при спробі вивести значення _info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

// Створення об'єкта ScienceBook
let scienceBook = new ScienceBook(
  "Фізика 101",
  "Альберт Ейнштейн",
  300,
  "написана в 1915 році"
);
console.log("Завдання: 4 ==============================");

// Використання класу ScienceBook та обробка помилки
try {
  // Виведення властивості info та налаштувань в консоль
  console.log(scienceBook._info);

  // Спроба змінити захищену властивість 'info'
  scienceBook.info = "написана в 1925 році"; // тут повинна виникнути помилка
} catch (error) {
  console.error(error.message); // виведення повідомлення про помилку: "Cannot assign to read only property 'info' of object '#<ScienceBook>'"
} finally {
  // У випадку помилки пропонуємо ввести правильні дані
  // Виводимо в консоль властивість info
  console.log(scienceBook.info);
  // Виводимо в консоль налаштування властивости info
  console.log(Object.getOwnPropertyDescriptor(scienceBook, "info"));
}

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook
class Textbook extends ScienceBook {
  constructor(title, author, pages, info) {
    super(title, author, pages, info);
  }

  read() {
    console.log(
      `Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info}`
    );
  }
}

// Перевизначаємо метод read(), відповідно з дописом вище

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |
let textbook = new Textbook(
  "Фізика у Вищій Школі",
  "Дж. Д. Джонс",
  400,
  "Навчальний посібник для учнів середньої чи вищої школи"
);

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook
textbook.read();

// console.log(Object.getOwnPropertyDescriptor(textbook, "info"));

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media
let Media = {
  format: "Загальний Формат",
  length: 0,
  play() {
    console.log(
      `Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`
    );
  },
};
/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media
let Song = Object.create(Media);
// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

Song.artist = "Загальний Виконавець";
Song.title = "Загальна Пісня";

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song
Song.play();
Song = {
  format: "Загальний Формат",
  length: 0,
  artist: "Загальний Виконавець",
  title: "Загальна Пісня",
  play() {
    console.log(
      `Зараз відтворюється пісня "${this.title}" виконавця ${this.artist} у форматі ${this.format} з тривалістю ${this.length} секунд`
    );
  },
};
Song.play();
