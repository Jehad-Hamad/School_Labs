# Task 2 Cheat Sheet -- CS3990 Assignment 7

## What Was Task 2 About?

Task 2 was worth **15 points** and was all about building a **dynamic news feed** using JavaScript **classes**, **arrays of objects**, **DOM manipulation**, and **template literals**. You were given a fixed HTML template (you were NOT allowed to change the HTML) and had to use JavaScript to:

1. Store news data (image paths, titles, text) in an **array of objects**
2. Create a **`News` class** with a `render()` method that builds HTML, a `show()` method that injects it into the DOM, an `incLikes()` method that tracks/displays likes, and a `hide()` method that visually "grays out" a news item
3. Write a **`generatenews()` function** that grabs the empty `<p>` tags from the DOM and fills them with news content by creating `News` instances
4. Wire up **LIKE** and **HIDE** buttons using `onclick` inline event handlers

The key skills tested: classes, constructors, methods, `innerHTML`, `getElementById`, `querySelectorAll`, template literals, `forEach`, inline styles via JS, and the `disabled` property.

---

## The HTML Structure (index.html) -- Line by Line

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task2 - Jehad Hamad</title>
  </head>
  <body>
    <div id="app">
      <p>Last news</p>
      <div id="content">
        <p></p>       <!-- Slot for news item 0 -->
        <p></p>       <!-- Slot for news item 1 -->
        <p></p>       <!-- Slot for news item 2 -->
      </div>
      <input id="myBtn" type="button" value="click me" />
    </div>
    <script src="src/index1.js"></script>
  </body>
</html>
```

### How JS hooks into this HTML

| HTML Element | ID / Selector | How JS uses it |
|---|---|---|
| `<div id="app">` | `#app` | Outer wrapper. Not directly used by JS in this task, but structures the page. |
| `<div id="content">` | `#content` | JS uses `document.querySelectorAll('#content p')` to grab the 3 empty `<p>` tags inside it. |
| Three `<p></p>` tags | Selected via `#content p` | These are the **empty containers** that each get filled with one news item's HTML via `innerHTML`. |
| `<input id="myBtn">` | `#myBtn` | A button that exists in the template. Not used by the current JS code (it was part of the template you couldn't change). |
| `<script src="src/index1.js">` | N/A | Loads the JS file. Placed at the bottom of `<body>` so the DOM is ready when the script runs. |

**Key point:** The `<script>` tag is at the **bottom** of `<body>`. This means by the time JS executes, all the HTML elements above it already exist in the DOM. That's why we can safely call `document.querySelectorAll('#content p')` without needing `DOMContentLoaded`.

---

## The JavaScript (src/index1.js) -- Everything Explained

### 1. The Data Array: `arrRecourses`

```js
let arrRecourses = [
  {
    srcImg: 'Images/1.png',
    newsTitle: 'FISHHHH',
    newsContent: 'I LOVE FISH',
  },
  {
    srcImg: 'Images/2.png',
    newsTitle: 'CATTT',
    newsContent: 'I LOVE CATSSS SO MUCH',
  },
  {
    srcImg: 'Images/3.png',
    newsTitle: 'THE GOAT',
    newsContent: 'IT MUST GET BETTER IT HAS TO GET BETTER SO ELSE',
  },
];
```

**WHAT:** An array of 3 objects. Each object holds the data for one news item: an image source path, a title, and content text.

**WHY:** The assignment required you to store image resources, titles, and content in a "list of objects." This separates **data** from **logic** -- the `News` class handles rendering, and this array just holds the raw info.

**HOW to reuse:**
```js
// Pattern: array of objects for any collection of data
let products = [
  { name: 'Laptop', price: 999, image: 'img/laptop.png' },
  { name: 'Phone',  price: 699, image: 'img/phone.png' },
];
```

**Gotcha:** Each object uses the **same keys** (`srcImg`, `newsTitle`, `newsContent`). If you misspell a key when accessing it later (like `newsTitle` vs `newstitle`), you get `undefined` with no error. JS is case-sensitive!

---

### 2. The `News` Class

#### 2a. The Constructor

```js
class News {
  constructor(title, imgSrc, content, id) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.content = content;
    this.likes = 0;       // starts at 0, not passed in
    this.id = id;          // used to create unique IDs for DOM elements
  }
```

**WHAT:** `constructor` is the special method that runs when you do `new News(...)`. It takes 4 arguments and saves them as properties on the new object. It also initializes `this.likes` to 0.

**WHY:** Every news item needs its own title, image, content, and a unique ID. The `id` is crucial because we're going to generate HTML with element IDs like `"news-0"`, `"news-1"`, etc. Without unique IDs, we couldn't target specific elements later.

**HOW to reuse:**
```js
class Product {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.quantity = 0;  // default value, not a parameter
  }
}
let p = new Product('Laptop', 999, 0);
```

---

#### 2b. The `render()` Method

```js
render() {
  return `
    <div id="news-${this.id}">
      <h3 id="title-${this.id}">${this.title}</h3>
      <span id="likes-${this.id}"></span>
      <br>
      <img id="img-${this.id}" src="${this.imgSrc}" width="200">
      <p id="text-${this.id}">${this.content}</p>
      <span>Likes: <span id="count-${this.id}">0</span></span>
      <br>
      <button id="likeBtn-${this.id}" onclick="newsItems[${this.id}].incLikes()">LIKE</button>
      <button onclick="newsItems[${this.id}].hide()">HIDE</button>
    </div>
  `;
}
```

**WHAT:** Returns a **string** of HTML using a **template literal** (backtick string). It builds a complete news card with a title, likes display, image, text, like count, and two buttons.

**WHY:** The assignment said to create a `render()` method that produces a block (div) containing title, image, paragraph, like counter, LIKE button, and HIDE button. Template literals let you embed `${expressions}` directly in the string -- way cleaner than string concatenation.

**Key techniques inside `render()`:**

| Technique | Example | Purpose |
|---|---|---|
| Template literal | `` `Hello ${name}` `` | Embed JS expressions inside strings |
| Dynamic IDs | `id="news-${this.id}"` | Every element gets a unique ID so we can target it later with `getElementById` |
| `onclick` attribute | `onclick="newsItems[${this.id}].incLikes()"` | Inline event handler -- when button is clicked, calls the method on the correct News instance |
| `this` keyword | `${this.title}` | Refers to the current instance's properties |

**IMPORTANT:** The `onclick` handlers reference `newsItems[${this.id}]` -- this means the `newsItems` array **must be a global variable** for the inline onclick to find it. If it were inside a function scope, the onclick wouldn't be able to access it.

**HOW to reuse:**
```js
class Card {
  constructor(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = id;
  }
  render() {
    return `
      <div id="card-${this.id}">
        <h2>${this.title}</h2>
        <p>${this.body}</p>
        <button onclick="cards[${this.id}].doSomething()">Click</button>
      </div>
    `;
  }
}
```

---

#### 2c. The `show()` Method

```js
show(element) {
  element.innerHTML = this.render();
}
```

**WHAT:** Takes a DOM element as a parameter and sets its `innerHTML` to whatever `render()` returns.

**WHY:** The assignment said the class needs a `show()` method for displaying the news in a specified block (the `<p>` tags from the HTML). `innerHTML` parses the string as HTML and inserts it into the element, replacing whatever was there before.

**The flow:** `show(p)` calls `this.render()` which returns an HTML string, then `element.innerHTML = ...` injects that string into the actual page.

**HOW to reuse:**
```js
show(targetElement) {
  targetElement.innerHTML = this.render();
}
// Usage:
let container = document.getElementById('myDiv');
myObject.show(container);
```

**innerHTML vs textContent:**
- `innerHTML` -- parses HTML tags (so `<b>bold</b>` renders as **bold**)
- `textContent` -- treats everything as plain text (so `<b>bold</b>` shows literally as `<b>bold</b>`)

---

#### 2d. The `incLikes()` Method

```js
incLikes() {
  this.likes += 1;
  document.getElementById(`count-${this.id}`).innerHTML = this.likes;
  document.getElementById(`likes-${this.id}`).innerHTML = '&#9824;'.repeat(this.likes);
}
```

**WHAT:** Increments the `likes` counter by 1, then updates TWO elements in the DOM:
1. The numeric count display (`count-0`, `count-1`, etc.)
2. The spade symbols display (`likes-0`, `likes-1`, etc.) -- shows one spade symbol per like

**WHY:** The assignment required a LIKE button that increases a counter and displays a corresponding number of symbols (the PDF mentioned stars/`&#9824;`). Each click adds one to the count AND adds another spade character.

**Key techniques:**

- **`this.likes += 1`** -- updates the object's internal state
- **`document.getElementById(...)`** -- finds a specific element by its unique ID
- **`'&#9824;'.repeat(this.likes)`** -- the `.repeat(n)` string method creates a string that repeats n times. So if likes is 3, you get `'&#9824;&#9824;&#9824;'` which renders as three spade symbols.

**HOW to reuse:**
```js
incrementScore() {
  this.score += 1;
  document.getElementById(`score-${this.id}`).innerHTML = this.score;
  // Show stars equal to score
  document.getElementById(`stars-${this.id}`).innerHTML = '&#9733;'.repeat(this.score);
}
```

**Useful HTML entities:**
- `&#9824;` = spade
- `&#9733;` = filled star
- `&#9734;` = empty star
- `&#10084;` = heart

---

#### 2e. The `hide()` Method

```js
hide() {
  document.getElementById(`img-${this.id}`).style.opacity = '0.3';
  document.getElementById(`title-${this.id}`).style.color = 'darkgray';
  document.getElementById(`title-${this.id}`).style.backgroundColor = 'lightgray';
  document.getElementById(`text-${this.id}`).style.color = 'darkgray';
  document.getElementById(`text-${this.id}`).style.backgroundColor = 'lightgray';
  document.getElementById(`likeBtn-${this.id}`).disabled = true;
}
```

**WHAT:** Makes a news item look "hidden" by:
1. Making the image semi-transparent (opacity 0.3)
2. Changing title font color to dark gray + background to light gray
3. Changing text font color to dark gray + background to light gray
4. **Disabling** the LIKE button so it can't be clicked anymore

**WHY:** The assignment said HIDE should make the image more transparent, title and paragraph displayed with dark gray font and light gray background, and LIKE button disabled (visible but not clickable).

**Key techniques:**

| Code | What it does |
|---|---|
| `.style.opacity = '0.3'` | Sets CSS opacity inline (0 = invisible, 1 = fully visible) |
| `.style.color = 'darkgray'` | Changes text/font color |
| `.style.backgroundColor = 'lightgray'` | Changes background color. Note: **camelCase** in JS, not `background-color` like CSS! |
| `.disabled = true` | Disables a button/input. It stays visible but clicking does nothing. |

**IMPORTANT -- CSS property names in JS use camelCase:**
- CSS: `background-color` --> JS: `backgroundColor`
- CSS: `font-size` --> JS: `fontSize`
- CSS: `border-radius` --> JS: `borderRadius`
- CSS: `text-align` --> JS: `textAlign`

**HOW to reuse:**
```js
// Dim any element
document.getElementById('myElement').style.opacity = '0.5';

// Gray out text
document.getElementById('myText').style.color = 'darkgray';
document.getElementById('myText').style.backgroundColor = 'lightgray';

// Disable a button
document.getElementById('myButton').disabled = true;

// Re-enable a button
document.getElementById('myButton').disabled = false;
```

---

### 3. The Global `newsItems` Array

```js
let newsItems = [];
```

**WHAT:** An empty array declared at the **global scope**.

**WHY:** The `onclick` handlers inside the rendered HTML reference `newsItems[0].incLikes()`, `newsItems[1].hide()`, etc. For those inline handlers to work, `newsItems` MUST be accessible globally. If it were inside a function, the onclick strings wouldn't be able to find it.

---

### 4. The `generatenews()` Function

```js
function generatenews() {
  let paragraphs = document.querySelectorAll('#content p');
  paragraphs.forEach((p, i) => {
    let news = new News(
      arrRecourses[i].newsTitle,
      arrRecourses[i].srcImg,
      arrRecourses[i].newsContent,
      i
    );
    newsItems.push(news);
    newsItems[i].show(p);
  });
}
```

**WHAT:** This function:
1. Selects all `<p>` elements inside `#content` using `querySelectorAll`
2. Loops through them with `forEach`, getting both the element (`p`) and the index (`i`)
3. For each one, creates a new `News` instance using data from `arrRecourses[i]`
4. Pushes the new instance into the global `newsItems` array
5. Calls `show(p)` on it to inject the HTML into that `<p>` tag

**WHY:** The assignment required a `generatenews()` function that selects the paragraphs inside the `#content` div, creates News instances, and displays them.

**Key techniques:**

#### `document.querySelectorAll('#content p')`
- Returns a **NodeList** of ALL `<p>` elements inside the element with `id="content"`
- This is a CSS selector -- same syntax you'd use in a CSS file
- Returns ALL matches (vs `querySelector` which returns only the first match)

#### `.forEach((p, i) => { ... })`
- Iterates over the NodeList
- `p` = the current `<p>` DOM element
- `i` = the index (0, 1, 2)
- The arrow function `=>` is shorthand for `function(p, i) { ... }`

#### `new News(...)`
- Creates a new instance of the News class
- Passes in title, image src, content from the data array, and the index as the ID

#### `newsItems.push(news)`
- `.push()` adds an item to the END of an array
- After the loop: `newsItems = [News0, News1, News2]`

#### `newsItems[i].show(p)`
- Calls the `show` method on the i-th news item
- Passes in the current `<p>` element as the target container

**HOW to reuse:**
```js
function generateCards() {
  let slots = document.querySelectorAll('#container .slot');
  slots.forEach((slot, i) => {
    let card = new Card(dataArray[i].title, dataArray[i].body, i);
    cardItems.push(card);
    cardItems[i].show(slot);
  });
}
```

---

### 5. The Immediate Call

```js
generatenews();
```

**WHAT:** Calls the function right away as soon as the script loads.

**WHY:** We want the news to appear immediately when the page loads. Since the `<script>` tag is at the bottom of `<body>`, the DOM is already built, so we can safely query and manipulate it.

---

## How Everything Connects (The Full Flow)

```
1. Browser loads index.html
2. Browser builds the DOM (the <p> tags inside #content are empty)
3. Browser hits <script src="src/index1.js">
4. JS file loads and executes top-to-bottom:
   a. arrRecourses array is created (data)
   b. News class is defined (blueprint)
   c. newsItems = [] is created (empty storage)
   d. generatenews() function is defined
   e. generatenews() is CALLED:
      - querySelectorAll grabs the 3 <p> tags
      - forEach loops through them:
        - i=0: creates News("FISHHHH", "Images/1.png", "I LOVE FISH", 0)
                pushes to newsItems, calls show() on first <p>
        - i=1: creates News("CATTT", "Images/2.png", ..., 1)
                pushes to newsItems, calls show() on second <p>
        - i=2: creates News("THE GOAT", "Images/3.png", ..., 2)
                pushes to newsItems, calls show() on third <p>
5. Each <p> now contains a full news card with LIKE and HIDE buttons
6. User clicks LIKE on news 1 --> onclick calls newsItems[1].incLikes()
   --> this.likes becomes 1, DOM updates the count and spade symbols
7. User clicks HIDE on news 2 --> onclick calls newsItems[2].hide()
   --> image goes transparent, text grays out, LIKE button disabled
```

---

## Every DOM Method Used -- Summary Table

| Method | What it does | Where it's used |
|---|---|---|
| `document.querySelectorAll(selector)` | Returns a NodeList of ALL elements matching the CSS selector | `generatenews()` to get the 3 `<p>` tags |
| `document.getElementById(id)` | Returns the single element with that exact ID | `incLikes()` and `hide()` to target specific parts of a news card |
| `element.innerHTML = string` | Sets/replaces the HTML content inside an element | `show()` to inject rendered HTML, `incLikes()` to update counts |
| `element.style.property = value` | Sets an inline CSS style on an element | `hide()` to change opacity, colors, backgrounds |
| `element.disabled = true/false` | Enables or disables a form element | `hide()` to disable the LIKE button |

---

## Every Array Method Used -- Summary Table

| Method | What it does | Where it's used |
|---|---|---|
| `.forEach((item, index) => {...})` | Loops through each item; gives you the item AND its index | `generatenews()` to loop through `<p>` tags |
| `.push(item)` | Adds an item to the end of the array | `generatenews()` to add News instances to `newsItems` |
| `.repeat(n)` | (String method) Repeats a string n times | `incLikes()` to show n spade symbols |

---

## CSS Concepts Used (All Inline via JS)

There is NO `<style>` tag or external CSS file in this task. ALL styling is done through JavaScript's `element.style` property:

```js
// These are equivalent:
// CSS:  opacity: 0.3;
// JS:   element.style.opacity = '0.3';

// CSS:  color: darkgray;
// JS:   element.style.color = 'darkgray';

// CSS:  background-color: lightgray;
// JS:   element.style.backgroundColor = 'lightgray';  // camelCase!
```

The `width="200"` on the `<img>` tag is set as an **HTML attribute** inside the template literal, not via JS style manipulation.

---

## Quick Copy Patterns

### Pattern 1: Class with render/show

```js
class Item {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  render() {
    return `<div id="item-${this.id}">
      <h3>${this.name}</h3>
      <button onclick="items[${this.id}].doAction()">Click</button>
    </div>`;
  }
  show(element) {
    element.innerHTML = this.render();
  }
  doAction() {
    document.getElementById(`item-${this.id}`).style.color = 'red';
  }
}
```

### Pattern 2: Array of Objects as Data Source

```js
let data = [
  { title: 'Item 1', img: 'img1.png', desc: 'Description 1' },
  { title: 'Item 2', img: 'img2.png', desc: 'Description 2' },
];
```

### Pattern 3: querySelectorAll + forEach to Fill Containers

```js
let items = [];
function generate() {
  let containers = document.querySelectorAll('#wrapper .slot');
  containers.forEach((container, i) => {
    let item = new Item(data[i].title, i);
    items.push(item);
    items[i].show(container);
  });
}
generate();
```

### Pattern 4: Increment Counter + Update DOM

```js
incCounter() {
  this.count += 1;
  document.getElementById(`count-${this.id}`).innerHTML = this.count;
  document.getElementById(`symbols-${this.id}`).innerHTML = '&#9733;'.repeat(this.count);
}
```

### Pattern 5: "Hide" / Gray-Out an Element

```js
hide() {
  document.getElementById(`img-${this.id}`).style.opacity = '0.3';
  document.getElementById(`title-${this.id}`).style.color = 'darkgray';
  document.getElementById(`title-${this.id}`).style.backgroundColor = 'lightgray';
  document.getElementById(`btn-${this.id}`).disabled = true;
}
```

### Pattern 6: Template Literal with Dynamic IDs

```js
let html = `<div id="card-${id}">
  <h2 id="heading-${id}">${title}</h2>
  <img src="${imgSrc}" width="200">
  <p id="text-${id}">${content}</p>
</div>`;
```

### Pattern 7: Inline onclick Calling a Method on a Global Array Item

```js
// In the template literal:
`<button onclick="globalArray[${this.id}].methodName()">Click</button>`

// The global array MUST exist at the top level:
let globalArray = [];
```

---

## Exam Tips and Common Gotchas

### 1. `getElementById` vs `querySelector` vs `querySelectorAll`
- `getElementById('foo')` -- returns ONE element, pass the ID **without** the `#`
- `querySelector('#foo')` -- returns the FIRST match, uses CSS selector **with** `#`
- `querySelectorAll('.bar')` -- returns ALL matches as a NodeList, uses CSS selectors
- **Gotcha:** `getElementById` does NOT take a `#` prefix. `querySelector` DOES.

### 2. `innerHTML` vs `textContent`
- `innerHTML` parses HTML tags: `el.innerHTML = '<b>hi</b>'` renders **hi**
- `textContent` does NOT parse tags: `el.textContent = '<b>hi</b>'` shows `<b>hi</b>` literally
- **On an exam:** if they ask "how to insert HTML," the answer is `innerHTML`

### 3. CSS Properties in JS Are camelCase
- `background-color` becomes `backgroundColor`
- `font-size` becomes `fontSize`
- `border-top-left-radius` becomes `borderTopLeftRadius`
- **Gotcha:** Using `element.style.background-color` will throw an error. Must be camelCase.

### 4. `let` vs `const` vs `var`
- This code uses `let` everywhere. `let` is block-scoped.
- `const` would also work for `arrRecourses` since the array reference never changes (you can still push/modify contents).
- Avoid `var` on exams unless asked -- it has function scope and can cause bugs.

### 5. The `this` Keyword
- Inside a class method, `this` refers to the specific instance that called the method
- `this.likes` means "the likes property of THIS particular News object"
- **Gotcha:** If you extract a method and call it without the object (like `let fn = obj.method; fn()`), `this` becomes `undefined` in strict mode. Always call methods on the object: `obj.method()`.

### 6. Why `newsItems` Must Be Global
- The `onclick` attributes in the HTML string reference `newsItems[0].incLikes()` etc.
- When the browser executes an inline `onclick`, it looks for `newsItems` in the **global** scope
- If `newsItems` were declared inside `generatenews()` with `let`, the onclick handlers would crash with "newsItems is not defined"

### 7. Script Placement Matters
- The `<script>` tag is at the **bottom** of `<body>` -- this ensures the DOM is fully loaded before JS runs
- If it were in `<head>`, `querySelectorAll('#content p')` would return an empty NodeList because the elements don't exist yet
- Alternative: use `document.addEventListener('DOMContentLoaded', () => { ... })` if the script is in `<head>`

### 8. `.forEach()` with Index
- `array.forEach((element, index) => { ... })` -- the second parameter is the index
- This is how you loop through one array while accessing a second array by the same index
- The assignment PDF specifically said to use `forEach` with `(element, index)` to loop through two arrays simultaneously

### 9. `.repeat()` is a String Method, Not Array
- `'abc'.repeat(3)` returns `'abcabcabc'`
- It does NOT mutate the original string; it returns a new one
- Works perfectly for showing a number of symbols equal to a counter

### 10. `disabled` Is a Boolean Property
- `element.disabled = true` -- disables (grayed out, can't click)
- `element.disabled = false` -- re-enables
- This is a property, NOT a style. Don't try `element.style.disabled`.

### 11. Template Literals Use Backticks, Not Quotes
- Backtick: `` ` `` (usually top-left key, below Esc)
- Single/double quotes do NOT support `${}` interpolation
- **Gotcha:** If you use `'Hello ${name}'` with single quotes, you literally get the text `Hello ${name}`

### 12. `new` Keyword
- `new News(...)` creates a fresh object, runs the constructor, and returns it
- Forgetting `new` (just calling `News(...)`) won't work as expected with classes -- it throws an error
- Classes REQUIRE `new`

### 13. NodeList vs Array
- `querySelectorAll` returns a **NodeList**, not a true Array
- NodeList supports `.forEach()` but NOT `.map()`, `.filter()`, `.reduce()` in older browsers
- To convert: `Array.from(nodeList)` or `[...nodeList]`

---

## Assignment Requirements Checklist (from the PDF)

| Requirement | How the code meets it |
|---|---|
| Fixed HTML template (don't change it) | `index.html` has the exact structure from the PDF |
| News class with render() method | `render()` returns a div with title, image, paragraph, counter, buttons |
| show() method to display in a block | `show(element)` sets `element.innerHTML = this.render()` |
| Like counter starting at 0 | `this.likes = 0` in constructor; `count-${this.id}` displays `0` |
| LIKE button increases counter | `incLikes()` does `this.likes += 1` and updates DOM |
| Likes shown as symbols (&#9824;) | `'&#9824;'.repeat(this.likes)` renders spade symbols |
| HIDE: image more transparent | `style.opacity = '0.3'` |
| HIDE: dark gray font, light gray bg | `style.color = 'darkgray'` and `style.backgroundColor = 'lightgray'` |
| HIDE: LIKE button disabled | `element.disabled = true` |
| Use onclick event attribute | `onclick="newsItems[${this.id}].incLikes()"` and same pattern for hide |
| Data stored in array of objects | `arrRecourses` array with `srcImg`, `newsTitle`, `newsContent` per item |
| generatenews() selects paragraphs | `document.querySelectorAll('#content p')` |
| generatenews() creates News instances | `new News(...)` inside `forEach` |
| generatenews() displays via show() | `newsItems[i].show(p)` |

---

Good luck on the midterm! If you understand every line in this cheat sheet, you're solid.
