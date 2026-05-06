# CS3990 Assignment 6 -- Comprehensive Cheat Sheet

## What This Assignment Was About

Assignment 6 (10 points) is about **JavaScript Basics** split into two parts:

- **Part 1 (5 pts) -- Conditional Statements:** Build a simple role-based UI with a login button. Depending on the user role (admin, student, or unknown), different buttons appear. Those buttons trigger features using `switch` statements and `if/else if/else` chains -- a greeting in multiple languages, and age-gated animal images.
- **Part 2 (5 pts) -- Loops and Function Expressions:** Implement a multi-step login system using **function expressions** (not declarations). Includes password generation with `Math.random()` in a loop, limited login attempts with a `for` loop, and role-specific logic (admin gets graduation calculations, designer/tester get discount calculations).

The HTML/CSS is minimal on purpose -- the focus is JavaScript. But the CSS demonstrates a clean centered card layout, and the HTML shows proper structure for a JS-driven interactive page.

---

# PART A: HTML BREAKDOWN

## 1. Document Boilerplate

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A6" />
    <meta name="author" content="Jehad" />
    <title>Basic Js A6</title>
  </head>
```

### Every element explained:

| Element/Attribute | What It Does | Why It Is Here |
|---|---|---|
| `<!doctype html>` | Tells the browser this is HTML5 | Without it, the browser goes into "quirks mode" and renders things inconsistently |
| `<html lang="en">` | Root element; `lang` sets the page language | Accessibility and SEO -- screen readers know to use English pronunciation |
| `<link rel="stylesheet" href="styles.css" />` | Links external CSS file | Keeps styling separate from structure (separation of concerns) |
| `<meta charset="UTF-8" />` | Sets character encoding to UTF-8 | Ensures special characters (accents, symbols) display correctly |
| `<meta name="viewport" ...>` | Controls how the page scales on mobile | `width=device-width` means "use the screen's actual width"; `initial-scale=1.0` means "don't zoom in or out" |
| `<meta name="description">` | Page description for search engines | SEO metadata |
| `<meta name="author">` | Identifies the author | Metadata, not displayed on page |
| `<title>` | Text shown in the browser tab | Required in every HTML document |

### Exam pattern -- HTML5 boilerplate:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Your Title</title>
  </head>
  <body>
    <!-- content here -->
    <script src="script.js"></script>
  </body>
</html>
```

**How to reuse:** Every HTML page you build starts with this exact skeleton. Just swap out the `<title>`, the CSS filename, and the JS filename. If the exam says "create an HTML page that does X," start by writing this boilerplate, then fill in the `<body>` with whatever elements you need.

## 2. Body Structure

```html
<body>
  <div class="container">
    <h1>JS Assignment 6</h1>
    <button id="loginBtn1">Part 1 - Login</button>
    <button id="sayHiBtn" class="hidden">Say Hi</button>
    <button id="favoriteAnimalBtn" class="hidden">Favorite Animal</button>
    <button id="loginBtn2">Part 2 - Login</button>
    <div id="output"></div>
  </div>
  <script src="script.js"></script>
</body>
```

### Every element explained:

| Element | What It Does | Why It Is Here |
|---|---|---|
| `<div class="container">` | Generic container with a class | Used to group all content and apply the white card styling via CSS |
| `<h1>` | Top-level heading | Every page should have one `<h1>` for accessibility/SEO |
| `<button id="loginBtn1">` | Clickable button with a unique ID | `id` is used by JavaScript to attach event listeners via `getElementById()` |
| `class="hidden"` | Applies the `.hidden` CSS class | Buttons start invisible; JS removes this class to show them |
| `<div id="output">` | Empty container for dynamic content | JavaScript writes into this div using `.textContent` or `.innerHTML` |
| `<script src="script.js"></script>` | Links external JavaScript file | Placed at the **bottom** of `<body>` so the HTML loads first before JS tries to find elements |

### Key concept -- `id` vs `class`:

- **`id`** = unique identifier. Only ONE element per page can have a given id. Used when JS needs to target a specific element (`getElementById`).
- **`class`** = reusable label. Multiple elements can share the same class. Used for styling groups of elements.

### Why `<script>` goes at the bottom:
If you put `<script>` in the `<head>`, the JS runs before the HTML exists in the DOM. `getElementById('loginBtn1')` would return `null` because that button hasn't been created yet. Putting it at the end of `<body>` ensures all elements exist first.

**How to reuse:** Whenever you need a JS-driven interactive page, follow this pattern: a wrapping `<div>` with a class for styling, buttons with unique `id` attributes so JS can grab them, a `class="hidden"` on anything that should start invisible, and an empty `<div id="output">` for JS to write into. For example, if the exam asks for a quiz page, you'd do:
```html
<div class="container">
  <h1>Quiz App</h1>
  <button id="startBtn">Start Quiz</button>
  <div id="questionArea" class="hidden"></div>
  <div id="result"></div>
</div>
<script src="quiz.js"></script>
```

---

# PART B: CSS BREAKDOWN

## 1. Universal Reset (`*` selector)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `*` (universal selector) | Selects EVERY element on the page | Applies a consistent baseline reset |
| `margin: 0` | Removes default outer spacing | Browsers add default margins to `<h1>`, `<p>`, `<body>`, etc. This zeroes them all out so you start clean |
| `padding: 0` | Removes default inner spacing | Same idea -- no surprise padding on any element |
| `box-sizing: border-box` | Makes `width` include padding + border | Without this, a `width: 500px` element with `padding: 40px` would actually be 580px wide. With `border-box`, it stays at 500px total |

### Why `box-sizing: border-box` matters (exam favorite):

- **Default (`content-box`):** `width` = content only. Padding and border are added ON TOP.
  - `width: 200px` + `padding: 20px` + `border: 2px` = **244px** actual width
- **`border-box`:** `width` = content + padding + border, all included.
  - `width: 200px` + `padding: 20px` + `border: 2px` = **200px** actual width (content shrinks to fit)

### Exam pattern -- always start your CSS with this:
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**How to reuse:** Copy this reset block verbatim at the top of every CSS file you write. It works for any project -- landing pages, forms, dashboards, whatever. It just removes browser defaults so you start from a clean slate. You will never need to change these three lines.

---

## 2. Body -- Flexbox Centering

```css
body {
    font-family: 'Segoe UI', sans-serif;
    background: #e8ecf1;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `font-family: 'Segoe UI', sans-serif` | Sets the font for the whole page | `'Segoe UI'` is the primary; `sans-serif` is the fallback if Segoe UI isn't available |
| `background: #e8ecf1` | Light gray-blue background color | Gives a soft background behind the white card |
| `height: 100vh` | Makes body fill 100% of the viewport height | **Critical for vertical centering** -- flexbox can only center vertically if the container has a defined height |
| `display: flex` | Turns body into a flex container | Enables flexbox layout on its children |
| `align-items: center` | Centers children vertically | The `.container` div sits in the vertical middle of the viewport |
| `justify-content: center` | Centers children horizontally | The `.container` div sits in the horizontal middle |

### The "center anything" pattern (memorize this):

If the exam asks "center a box on the page," here is the go-to:

```css
body {
    height: 100vh;          /* MUST set height, or vertical centering won't work */
    display: flex;
    align-items: center;     /* vertical */
    justify-content: center; /* horizontal */
}
```

### What is `100vh`?

- `vh` = "viewport height" unit. `100vh` = 100% of the browser window height.
- Different from `height: 100%` because `100%` is relative to the parent element (which might not have a height set), while `100vh` is always relative to the browser window itself.

**How to reuse:** Any time you need to center a single card, form, or modal on the page, apply these four properties to the parent (usually `body`). Swap the `background` color and `font-family` to match your design, but the flexbox centering trio (`display: flex`, `align-items: center`, `justify-content: center`) plus `height: 100vh` stays the same. For example, a login page:
```css
body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f2f5;
    font-family: Arial, sans-serif;
}
```

### Font stacks explained:

```css
font-family: 'Segoe UI', sans-serif;
/*            ^^^^^^^^^   ^^^^^^^^^^
              primary     fallback (generic family) */
```

Always end with a generic family: `serif`, `sans-serif`, or `monospace`.

---

## 3. Container -- The Card Component

```css
.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 500px;
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `background: white` | White background | Creates the "card" look against the gray body background |
| `padding: 40px` | 40px of space inside the card on all sides | Prevents content from touching the card edges |
| `border-radius: 10px` | Rounds the corners | Makes it look like a card/modal instead of a sharp box |
| `box-shadow: 0 10px 25px rgba(0,0,0,0.2)` | Adds a drop shadow | Creates depth -- makes the card look "floating" above the background |
| `text-align: center` | Centers all inline/text content | Buttons and text are centered inside the card |
| `max-width: 500px` | Card won't exceed 500px wide | Keeps the card a readable width on large screens; it can shrink below 500px on small screens |

### Understanding `box-shadow`:

```
box-shadow: offset-x  offset-y  blur-radius  color;
box-shadow: 0         10px      25px         rgba(0, 0, 0, 0.2);
```

- `0` = no horizontal offset (shadow is directly below, not to the side)
- `10px` = shadow is pushed 10px downward
- `25px` = blur radius -- how "soft" the shadow is (higher = softer/wider)
- `rgba(0, 0, 0, 0.2)` = black at 20% opacity (semi-transparent)

### Understanding `rgba()`:

```
rgba(red, green, blue, alpha)
rgba(0,   0,     0,    0.2)   = black at 20% opacity
rgba(255, 255,   255,  0.5)   = white at 50% opacity
```

The alpha channel (0 to 1) controls transparency. `0` = fully transparent, `1` = fully opaque.

### `max-width` vs `width`:

- `width: 500px` = always exactly 500px (can overflow on small screens)
- `max-width: 500px` = can be 0-500px, shrinks with the screen (responsive-friendly)

### Exam pattern -- card component:
```css
.card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    max-width: 500px;
}
```

**How to reuse:** Whenever you need a "floating card" look (login forms, profile cards, info panels), grab this pattern and tweak the values. Change `max-width` to control how wide the card is, adjust `padding` for inner spacing, and tweak the `box-shadow` opacity for more or less depth. For a wider card with less shadow:
```css
.wide-card {
    background: white;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
}
```

---

## 4. Typography -- h1 and p

```css
h1 {
    color: #333;
    margin-bottom: 20px;
}

p {
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `color: #333` | Dark gray text (not pure black) | Pure black (`#000`) on white is harsh; `#333` is softer and easier to read |
| `margin-bottom: 20px` | Adds space below the heading | Creates visual separation between the heading and buttons |
| `color: #666` | Medium gray for paragraph text | Lighter than the heading, creating a visual hierarchy (heading is more prominent) |
| `line-height: 1.6` | Sets line spacing to 1.6x the font size | Improves readability for multi-line text; `1.6` is a widely recommended value |

### Selectors used here:

These are **element selectors** (also called **type selectors**). They target ALL `<h1>` and `<p>` elements on the page. No dot (class) or hash (id) prefix.

```css
h1 { }       /* element selector -- targets every <h1> */
.container { } /* class selector -- targets every element with class="container" */
#output { }   /* id selector -- targets the ONE element with id="output" */
```

### Selector specificity (exam topic):

From lowest to highest priority:
1. Element selectors: `h1`, `p`, `button` (specificity: 0,0,1)
2. Class selectors: `.hidden`, `.container` (specificity: 0,1,0)
3. ID selectors: `#loginBtn1`, `#output` (specificity: 1,0,0)
4. Inline styles: `style="..."` (overrides everything except `!important`)

If two rules conflict, the one with higher specificity wins.

**How to reuse:** Use this same pattern for any text styling -- pick a dark gray for headings (`#333` or `#2c3e50`), a lighter gray for body text (`#666` or `#555`), and set `line-height: 1.5` to `1.6` on paragraphs. If you need different heading levels, just repeat the pattern with smaller `margin-bottom` for lower-level headings:
```css
h1 { color: #333; margin-bottom: 20px; }
h2 { color: #444; margin-bottom: 15px; }
p  { color: #666; line-height: 1.6; margin-bottom: 10px; }
```

---

## 5. Buttons -- Styling + Pseudo-Classes

```css
button {
    background-color: #3a6ea5;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 8px;
}

button:hover {
    background-color: #2d5986;
}

button:active {
    transform: scale(0.98);
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `background-color: #3a6ea5` | Blue button background | Primary action color |
| `color: white` | White text on the button | Contrast against the blue background |
| `border: none` | Removes the default button border | Browsers add a default border to buttons; this removes it for a cleaner look |
| `padding: 12px 30px` | 12px top/bottom, 30px left/right | Makes the button a comfortable click target size |
| `font-size: 16px` | Sets text size | Default button text is often smaller; 16px ensures readability |
| `border-radius: 5px` | Slightly rounded corners | Softens the button shape |
| `cursor: pointer` | Shows a hand cursor on hover | Visual cue that the element is clickable (buttons don't always get this by default) |
| `transition: background-color 0.3s` | Animate the color change over 0.3 seconds | Makes the hover effect smooth instead of an instant snap |
| `margin: 8px` | 8px space around each button | Prevents buttons from touching each other |

### Pseudo-classes explained:

```css
button:hover { }   /* when mouse is over the button */
button:active { }  /* when button is being clicked (mouse down) */
```

- `:hover` -- Triggers when the user's mouse is over the element. Used here to darken the background color as visual feedback.
- `:active` -- Triggers in the instant the user clicks (mouse button is held down). Used here with `transform: scale(0.98)` to give a subtle "press in" effect.

### Understanding `transition`:

```css
transition: property duration;
transition: background-color 0.3s;
/*          ^^^^^^^^^^^^^^^  ^^^^
            what to animate   how long */
```

Without `transition`, the color change on hover is instant. With it, the browser smoothly interpolates between the two colors over 0.3 seconds. You can also use `transition: all 0.3s;` to animate every property that changes.

### Understanding `transform: scale()`:

```css
transform: scale(0.98);  /* shrink to 98% of original size */
transform: scale(1.05);  /* grow to 105% */
transform: scale(1);     /* normal size */
```

This creates a subtle "push" feedback. The element visually shrinks slightly when clicked.

### Two-value `padding` shorthand:

```css
padding: 12px 30px;
/*       ^^^^  ^^^^
         top/bottom  left/right */
```

Shorthand rules:
- `padding: 10px` = all four sides
- `padding: 10px 20px` = top/bottom, left/right
- `padding: 10px 20px 15px` = top, left/right, bottom
- `padding: 10px 20px 15px 25px` = top, right, bottom, left (clockwise)

### Exam pattern -- styled button:
```css
button {
    background-color: #3a6ea5;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
button:hover {
    background-color: #2d5986;
}
```

**How to reuse:** For any styled button, keep this structure and swap the color values. Want a green "success" button? Change `#3a6ea5` to `#27ae60` and the hover to `#219a52`. Want a red "danger" button? Use `#e74c3c` and `#c0392b`. The `transition`, `cursor: pointer`, `border: none`, and `border-radius` are the same every time. If you need multiple button styles on the same page, use classes:
```css
.btn-primary { background-color: #3a6ea5; }
.btn-primary:hover { background-color: #2d5986; }
.btn-danger { background-color: #e74c3c; }
.btn-danger:hover { background-color: #c0392b; }
```

---

## 6. Utility Class -- `.hidden`

```css
.hidden {
    display: none;
}
```

| Property | What It Does | Why It Is Here |
|---|---|---|
| `display: none` | Completely removes the element from the visual layout | The "Say Hi" and "Favorite Animal" buttons start hidden and are revealed by JavaScript |

### `display: none` vs `visibility: hidden`:

- `display: none` -- Element is removed from the page flow. Other elements fill its space. It is as if it does not exist.
- `visibility: hidden` -- Element is invisible but still takes up space. There is a blank gap where it would be.

In this assignment, `display: none` is correct because we do not want empty gaps where hidden buttons would be.

### How JavaScript toggles visibility:

```javascript
// Hide an element
element.classList.add('hidden');

// Show an element
element.classList.remove('hidden');
```

This is the pattern used in the assignment. Instead of setting `style.display` directly, we add/remove a CSS class. This is considered better practice because it keeps styling in CSS.

**How to reuse:** This `.hidden` utility class works in any project. Whenever you need to show/hide elements based on user actions (tabs, accordions, modals, multi-step forms), define `.hidden { display: none; }` in your CSS, then toggle it with `classList.add/remove` in JS. For example, a tab system:
```javascript
// Hide all tab panels, then show the clicked one
document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
document.getElementById('tab-' + clickedTab).classList.remove('hidden');
```

---

# PART C: JAVASCRIPT BREAKDOWN

This is the core of the assignment. Every concept is explained below.

## 1. Selecting Elements -- `getElementById()`

```javascript
document.getElementById('loginBtn1')
```

| Concept | Explanation |
|---|---|
| `document` | The global object representing the entire HTML page |
| `.getElementById('loginBtn1')` | Searches the DOM for the element with `id="loginBtn1"` and returns it |

This returns a **single element** (or `null` if not found). It matches the `id` attribute in HTML.

### Other selection methods (for reference):

```javascript
document.getElementById('myId')          // by id -- returns ONE element
document.querySelector('.myClass')       // by CSS selector -- returns FIRST match
document.querySelectorAll('.myClass')    // by CSS selector -- returns ALL matches (NodeList)
document.getElementsByClassName('myClass') // by class -- returns HTMLCollection
```

**How to reuse:** Any time you need JS to interact with an HTML element, you start by selecting it. Pick the right method: `getElementById` when you have a unique `id`, `querySelector` when you want to use any CSS selector (like `.card > h2`), and `querySelectorAll` when you need to grab multiple elements at once. The pattern is always: select it, store it in a variable, then do something with it:
```javascript
let heading = document.getElementById('mainTitle');
heading.textContent = 'New Title';
heading.style.color = 'red';
```

---

## 2. Event Listeners -- `addEventListener()`

```javascript
document.getElementById('loginBtn1').addEventListener('click', function () {
    // code runs when button is clicked
});
```

| Part | What It Does |
|---|---|
| `.addEventListener('click', ...)` | Attaches a function that runs when the element is clicked |
| `'click'` | The event type (could also be `'mouseover'`, `'keydown'`, `'submit'`, etc.) |
| `function () { }` | An **anonymous function** -- a function without a name, defined inline |

### Why anonymous function?
The assignment uses anonymous functions for event handlers because these functions are only needed in one place. There is no reason to name them.

### Exam pattern -- attach a click handler:
```javascript
document.getElementById('myButton').addEventListener('click', function () {
    // do something when clicked
});
```

**How to reuse:** This is the universal pattern for making anything interactive. Change `'click'` to other event types depending on what you need: `'mouseover'` for hover effects, `'keydown'` for keyboard input, `'submit'` for form submissions, `'change'` for dropdowns/checkboxes. The structure stays identical:
```javascript
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent page reload
    // handle form data here
});
```

---

## 3. `prompt()` and `alert()` -- User Interaction

```javascript
let user = prompt('What is your role');   // shows input dialog, returns string
alert('Hello');                           // shows message dialog, returns nothing
```

| Function | What It Does | Returns |
|---|---|---|
| `prompt('message')` | Shows a dialog box with a text input field | The string the user typed, or `null` if they clicked Cancel |
| `alert('message')` | Shows a dialog box with a message and OK button | Nothing (`undefined`) |

### Important: `prompt()` always returns a STRING

```javascript
let yearOfBirth = prompt('Enter your year of birth');
// If user types 2000, yearOfBirth is the STRING "2000", not the NUMBER 2000

let age = 2026 - yearOfBirth;
// This works because JS auto-converts the string to a number for subtraction
// But be careful: "2000" + 1 = "20001" (string concatenation!)
```

### Converting strings to numbers:

```javascript
Number('2000')           // 2000
parseInt('2000')         // 2000
Number('abc')            // NaN (Not a Number)
isNaN(Number('abc'))     // true
```

**How to reuse:** Any time you need quick user input in a JS exercise, `prompt()` is your go-to. Just remember the three things: (1) it always returns a string, (2) it returns `null` if the user clicks Cancel, and (3) wrap it with `Number()` if you need to do math. A reusable input pattern:
```javascript
let name = prompt('What is your name?');
if (name === null || name.trim() === '') {
    alert('You must enter a name!');
} else {
    alert('Welcome, ' + name + '!');
}
```

---

## 4. Conditional Statements -- `if / else if / else`

### Part 1 Login Logic:

```javascript
let user = prompt('What is your role');
if (user == 'admin') {
    // show both buttons
} else if (user == 'student') {
    // show only Say Hi button
} else {
    // show "I don't know you"
}
```

### How it works:
1. JavaScript evaluates the first condition (`user == 'admin'`).
2. If true, it runs that block and **skips everything else**.
3. If false, it checks the next condition (`user == 'student'`).
4. If all conditions are false, the `else` block runs.

### `==` vs `===` (exam topic):

```javascript
'5' == 5      // true  (loose equality -- converts types before comparing)
'5' === 5     // false (strict equality -- types must match too)
null == undefined  // true
null === undefined // false
```

The assignment uses `==` (loose equality). In professional code, `===` (strict) is preferred because it avoids surprise type conversions.

### Assignment requirement connection:
The spec says: admin gets 2 buttons, student gets 1 button, anyone else gets a message. The `if/else if/else` chain maps directly to these 3 cases.

**How to reuse:** Whenever you have 2+ distinct cases based on a value, use this `if/else if/else` chain. The pattern is: check specific cases first, then use `else` as the catch-all. For a different scenario -- say, a grade calculator:
```javascript
let score = Number(prompt('Enter your score'));
if (score >= 90) {
    alert('Grade: A');
} else if (score >= 80) {
    alert('Grade: B');
} else if (score >= 70) {
    alert('Grade: C');
} else {
    alert('Grade: F');
}
```

---

## 5. `switch` Statement

### Say Hi -- Language Greeting:

```javascript
switch (lang.toLowerCase()) {
    case 'eng':
        greeting = 'Hello';
        break;
    case 'fr':
        greeting = 'Bonjour';
        break;
    case 'de':
        greeting = 'Hallo';
        break;
    case 'spa':
        greeting = 'Hola';
        break;
    default:
        greeting = 'Sorry, but I do not speak your language.';
        break;
}
alert(greeting);  // called ONCE after the switch, as required
```

### Key points:

| Concept | Explanation |
|---|---|
| `switch (expression)` | Evaluates the expression once, then matches against each `case` |
| `case 'eng':` | If the expression equals `'eng'`, run the code below |
| `break;` | **Exit the switch.** Without it, execution "falls through" to the next case! |
| `default:` | Like `else` -- runs if no case matches |
| `.toLowerCase()` | Converts input to lowercase so `'ENG'`, `'Eng'`, `'eng'` all match `'eng'` |

### Why `break` is critical:

```javascript
// WITHOUT break:
switch (lang) {
    case 'eng':
        greeting = 'Hello';
        // falls through to next case!
    case 'fr':
        greeting = 'Bonjour';
        // falls through again!
}
// greeting would be 'Bonjour' even if lang was 'eng'!
```

### Assignment requirement connection:
The spec explicitly says "using the switch statement" and that `alert()` must be called ONCE after the switch block (not inside each case). That is why we set a `greeting` variable inside the switch and call `alert(greeting)` outside it.

### Exam pattern -- switch statement:
```javascript
let result = '';
switch (value.toLowerCase()) {
    case 'option1':
        result = 'Result 1';
        break;
    case 'option2':
        result = 'Result 2';
        break;
    default:
        result = 'Unknown';
        break;
}
alert(result);
```

**How to reuse:** Use `switch` whenever you have one value being compared against multiple exact matches (like mapping a day name to a schedule, or a color name to a hex code). The recipe: (1) set a result variable before the switch, (2) assign it in each case, (3) always include `break`, (4) always include `default`, (5) use the result after the switch. For a different scenario -- a day-of-week message:
```javascript
let message = '';
switch (day.toLowerCase()) {
    case 'monday':    message = 'Start of the week!'; break;
    case 'friday':    message = 'Almost weekend!'; break;
    case 'saturday':
    case 'sunday':    message = 'Weekend!'; break;  // fall-through on purpose
    default:          message = 'Regular day'; break;
}
alert(message);
```

---

## 6. Favorite Animal -- Combined `if/else if/else` + `switch`

```javascript
let yearOfBirth = prompt('Enter your year of birth');
if (isNaN(yearOfBirth) || yearOfBirth === null || yearOfBirth === '') {
    alert('Please enter a valid year');
    return;
}
let age = 2026 - yearOfBirth;

if (age < 18) {
    alert('Content is not available due to age restrictions');
} else if (age >= 18 && age <= 55) {
    let animal = prompt('Enter your favorite animal (cat, dog, frog, mouse)');
    let imgSrc;
    switch (animal.toLowerCase()) {
        case 'cat':   imgSrc = 'pictures/Cat.png'; break;
        case 'dog':   imgSrc = 'pictures/Dog.png'; break;
        case 'frog':  imgSrc = 'pictures/Frog.png'; break;
        case 'mouse': imgSrc = 'pictures/Mouse.png'; break;
        default:      imgSrc = ''; break;
    }
    if (imgSrc) {
        document.getElementById('output').innerHTML =
            '<img src="' + imgSrc + '" width="300">';
    }
} else {
    document.getElementById('output').innerHTML = '<p>Much like mathematics...</p>';
}
```

### Key concepts:

| Concept | Explanation |
|---|---|
| `isNaN(yearOfBirth)` | Checks if the value is "Not a Number" -- input validation |
| `\|\|` (logical OR) | Returns `true` if ANY condition is true |
| `&&` (logical AND) | Returns `true` only if BOTH conditions are true |
| `return;` | Exits the function early (stops further execution) |
| `.innerHTML` | Sets the HTML content of an element (can include tags like `<img>`) |
| `.textContent` | Sets plain text content only (HTML tags show as literal text) |

### `.innerHTML` vs `.textContent`:

```javascript
element.innerHTML = '<b>Bold</b>';     // renders as: Bold (with bold formatting)
element.textContent = '<b>Bold</b>';   // renders as: <b>Bold</b> (literal text)
```

Use `.innerHTML` when you need to insert HTML tags (like `<img>`).
Use `.textContent` for plain text (it is safer -- prevents XSS injection).

### Assignment requirement connection:
The spec says: under 18 = alert, 18-55 = animal image via switch, over 55 = paragraph text. The `if/else if/else` handles the three age ranges, and the `switch` inside the 18-55 block maps animal names to image paths.

**How to reuse:** This "validate first, then branch by range, then map a value with switch" pattern shows up a lot. Use it whenever you have layered logic: first validate the input, then categorize it into a range, then do a specific lookup inside that range. For a different scenario -- a ticket pricing system:
```javascript
let age = Number(prompt('Enter your age'));
if (isNaN(age) || age <= 0) {
    alert('Invalid age');
} else if (age < 12) {
    alert('Child ticket: $5');
} else if (age <= 64) {
    let type = prompt('Standard or VIP?');
    switch (type.toLowerCase()) {
        case 'standard': alert('$15'); break;
        case 'vip':      alert('$30'); break;
        default:         alert('Unknown ticket type'); break;
    }
} else {
    alert('Senior ticket: $8');
}
```

---

## 7. DOM Manipulation -- Showing/Hiding Elements

```javascript
document.getElementById('loginBtn1').classList.add('hidden');
document.getElementById('sayHiBtn').classList.remove('hidden');
```

| Method | What It Does |
|---|---|
| `.classList.add('hidden')` | Adds the class `hidden` to the element (hides it via CSS `display: none`) |
| `.classList.remove('hidden')` | Removes the class `hidden` (shows it again) |
| `.classList.toggle('hidden')` | Adds if missing, removes if present |
| `.classList.contains('hidden')` | Returns `true`/`false` -- checks if element has the class |

### Exam pattern -- toggle visibility with classList:
```css
.hidden { display: none; }
```
```javascript
element.classList.add('hidden');    // hide
element.classList.remove('hidden'); // show
```

**How to reuse:** Any time an exam question says "show element X when the user does Y," this is the pattern. Hide things by default with `class="hidden"` in HTML, then reveal them with `classList.remove('hidden')` in your JS event handler. You can also use `classList.toggle('hidden')` for on/off switches like a FAQ accordion:
```javascript
document.getElementById('faqBtn').addEventListener('click', function () {
    document.getElementById('faqAnswer').classList.toggle('hidden');
});
```

---

## 8. Function Expressions (Part 2 requirement)

The assignment specifically requires **function expressions** (not function declarations).

### Function Declaration vs Function Expression:

```javascript
// DECLARATION (NOT what the assignment asks for)
function greet() {
    alert('Hello');
}

// EXPRESSION (what the assignment REQUIRES)
const greet = function () {
    alert('Hello');
};
```

| Type | Hoisted? | Syntax |
|---|---|---|
| Declaration | Yes -- can be called before it is defined in code | `function name() {}` |
| Expression | No -- must be defined before calling | `const name = function() {};` |

### All function expressions in the assignment:

```javascript
const generatePassword = function () { ... };
const adminStep2 = function () { ... };
const designerStep2 = function () { ... };
const testerStep2 = function () { ... };
const login = function () { ... };
```

### Why `const` and not `var` or `let`?
- `const` means the variable cannot be reassigned. Since we don't want to accidentally overwrite our function, `const` is the safest choice.
- `var` is function-scoped (older style). `let` and `const` are block-scoped (modern, preferred).

**How to reuse:** If an exam question says "use function expressions," always write `const functionName = function () { };` -- never `function functionName() {}`. The structure is the same as a regular function, you're just storing it in a variable. For a different scenario -- a calculator with function expressions:
```javascript
const add = function (a, b) {
    return a + b;
};
const subtract = function (a, b) {
    return a - b;
};
let result = add(5, 3);       // 8
let diff = subtract(10, 4);   // 6
```

---

## 9. Password Generation -- `Math.random()` in a Loop

```javascript
const generatePassword = function () {
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += Math.floor(Math.random() * 10);
    }
    return password;
};
```

### Step by step:

1. `Math.random()` returns a random decimal between 0 (inclusive) and 1 (exclusive), e.g., `0.7382`
2. `Math.random() * 10` scales it to 0-9.999...
3. `Math.floor()` rounds DOWN to the nearest integer: 0-9
4. `password +=` appends that digit as a string to the password
5. The loop runs 6 times, producing a 6-digit string like `"384729"`

### Assignment requirement connection:
The spec says "the administrator password consists of 6 digits, write a separate function to generate the password based on Math.random() in a loop." This is exactly what this function does.

### Exam pattern -- generate random number in a range:
```javascript
// Random integer from min to max (inclusive)
Math.floor(Math.random() * (max - min + 1)) + min;

// Random digit 0-9
Math.floor(Math.random() * 10);

// Random number 1-100
Math.floor(Math.random() * 100) + 1;
```

**How to reuse:** This "build a string in a loop with random values" pattern works for generating any random code -- PINs, verification codes, IDs, etc. Just change the loop count for length and the random range for character type. For an 8-character alphanumeric code:
```javascript
const generateCode = function () {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};
// produces something like "A7KX3BQ2"
```

---

## 10. Login with Limited Attempts -- `for` Loop

```javascript
for (let i = 0; i < maxAttempts; i++) {
    let attempt = prompt('Enter your password');
    if (attempt === password) {
        // correct -- proceed to step 2
        return;
    } else {
        alert('Wrong password. Attempts left: ' + (maxAttempts - i - 1));
    }
}
alert('Access denied');
```

### How the loop works:

| Iteration | `i` | Attempts left |
|---|---|---|
| 1st | 0 | `maxAttempts - 0 - 1` |
| 2nd | 1 | `maxAttempts - 1 - 1` |
| 3rd | 2 | `maxAttempts - 2 - 1` |

- If the password is correct, `return` exits the **entire function** (not just the loop).
- If the loop finishes without a correct password, we fall through to `alert('Access denied')`.

### Assignment requirement connection:
The spec says: admin gets 2 attempts, designer/tester get 3 attempts. The variable `maxAttempts` is set accordingly (2 or 3), and the `for` loop runs that many times.

### `for` loop anatomy:
```javascript
for (let i = 0;   i < maxAttempts;   i++) {
//   ^^^^^^^^^    ^^^^^^^^^^^^^^^^   ^^^^
//   initialize   condition (check   increment
//   counter      before each run)   (after each run)
}
```

**How to reuse:** This "loop with limited attempts and early exit" pattern works for any retry scenario -- login attempts, quiz answer retries, game lives, etc. The recipe: (1) set `maxAttempts`, (2) loop with `for`, (3) `return` on success, (4) show remaining attempts on failure, (5) after the loop, handle the "all attempts used" case. For a quiz with 3 tries:
```javascript
let correctAnswer = 'Paris';
for (let i = 0; i < 3; i++) {
    let guess = prompt('What is the capital of France?');
    if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
        alert('Correct!');
        return;
    }
    alert('Wrong! Tries left: ' + (3 - i - 1));
}
alert('The answer was Paris.');
```

---

## 11. The Login Function -- Role-Based Branching

```javascript
const login = function () {
    let username = prompt('Enter your login');

    if (username !== null && username.toLowerCase() === 'admin') {
        password = generatePassword();
        alert('Admin password is: ' + password);
        maxAttempts = 2;
    } else if (username === 'designer') {
        password = '111';
        maxAttempts = 3;
    } else if (username === 'tester') {
        password = '222';
        maxAttempts = 3;
    } else {
        alert('No such user');
        return;    // EXIT EARLY -- don't continue to password loop
    }

    // ... password loop ...
    // ... if correct, call role-specific step2 function ...
};
```

### Key details:

| Detail | Explanation |
|---|---|
| `username !== null` | Checks user didn't click Cancel on the prompt |
| `.toLowerCase() === 'admin'` | Case-insensitive check: "Admin", "ADMIN", "admin" all work |
| `return;` in else block | Early exit pattern -- if user is unknown, stop the whole function |
| Calling `adminStep2()`, `designerStep2()`, `testerStep2()` | After correct password, calls the appropriate function for step 2 |

### Assignment requirement connection:
The spec says: admin password is case-insensitive ("Admin, admin, or ADMIN"), designer password is "111", tester password is "222", and unknown users get a "no such user" message.

**How to reuse:** This "identify the user, configure settings, then proceed" pattern is great for any role-based system. The structure: (1) ask who they are, (2) set role-specific variables (password, permissions, attempt count, etc.) in an `if/else if/else` chain, (3) use `return` in the `else` to bail early for unknown users, (4) continue with shared logic (like the password loop). For a different scenario -- a support ticket system:
```javascript
const handleTicket = function () {
    let role = prompt('Your role? (manager, agent, guest)');
    let canAssign, canClose;
    if (role === 'manager') {
        canAssign = true; canClose = true;
    } else if (role === 'agent') {
        canAssign = false; canClose = true;
    } else if (role === 'guest') {
        canAssign = false; canClose = false;
    } else {
        alert('Unknown role');
        return;
    }
    // now use canAssign and canClose for the rest of the logic
};
```

---

## 12. `Number()` Conversion

```javascript
let portfolios = Number(prompt('Enter the number of available portfolios'));
let yearOfBirth = Number(prompt('Enter your year of birth'));
```

`Number()` explicitly converts the string from `prompt()` into a number. This is important because:

```javascript
// Without Number():
'5' + 1 = '51'    // string concatenation!
'5' - 1 = 4       // subtraction auto-converts (JS is weird)

// With Number():
Number('5') + 1 = 6   // proper math
```

### When to use `Number()`:
Use it whenever you need to do math with user input, especially addition. Subtraction, multiplication, and division auto-convert, but addition does not (because `+` is also the string concatenation operator).

**How to reuse:** Make it a habit: any time you `prompt()` for a number, wrap it with `Number()` right away. This avoids the `+` concatenation trap entirely. The one-liner pattern:
```javascript
let quantity = Number(prompt('How many items?'));
let price = Number(prompt('Price per item?'));
let total = quantity * price;  // safe math, no string surprises
alert('Total: $' + total);
```

---

## 13. String Concatenation

```javascript
alert('You will be ' + ageAtGraduation + " years old and receive your bachelor's degree in CS in " + graduationYear);
```

The `+` operator joins strings together. When a number is used with `+` and a string, the number is automatically converted to a string.

### Modern alternative -- template literals (backticks):
```javascript
alert(`You will be ${ageAtGraduation} years old and receive your bachelor's degree in CS in ${graduationYear}`);
```

Template literals use backticks (`` ` ``) and `${}` for embedded expressions. They are easier to read and handle quotes naturally.

**How to reuse:** For simple messages with 1-2 variables, `+` concatenation is fine. For anything more complex (multiple variables, embedded quotes, multi-line strings), switch to template literals -- they are easier to read and less error-prone. The conversion is mechanical: replace quotes with backticks, replace `' + variable + '` with `${variable}`:
```javascript
// Instead of this messy concatenation:
let msg = 'Hello ' + name + ', you scored ' + score + ' out of ' + total + '.';

// Write this:
let msg = `Hello ${name}, you scored ${score} out of ${total}.`;
```

---

# PART D: ASSIGNMENT REQUIREMENTS CHECKLIST

## Part 1 Requirements Mapped to Code:

| Requirement | Where in Code | Key Technique |
|---|---|---|
| Only a "Log in" button initially | `class="hidden"` on Say Hi and Favorite Animal buttons | CSS `.hidden { display: none; }` + JS `classList` |
| Admin sees 2 buttons | `classList.remove('hidden')` on both buttons | DOM manipulation |
| Student sees 1 button | `classList.remove('hidden')` on Say Hi only | Conditional logic |
| Unknown user sees message | `textContent = "I don't know you"` | DOM text content |
| Task 1: Switch for greetings | `switch (lang.toLowerCase())` with 4 cases + default | `switch` statement |
| Alert called ONCE | `alert(greeting)` outside the switch | Variable set inside, alert outside |
| Task 2: Age-gated content | `if (age < 18) ... else if (age >= 18 && age <= 55) ... else` | `if/else if/else` chain |
| Animal image via switch | `switch (animal.toLowerCase())` maps to image paths | `switch` + `.innerHTML` |

## Part 2 Requirements Mapped to Code:

| Requirement | Where in Code | Key Technique |
|---|---|---|
| Function expressions | `const login = function() {};` | Not `function login()` |
| Case-insensitive admin | `username.toLowerCase() === 'admin'` | `.toLowerCase()` |
| Password generation | `generatePassword()` using `Math.random()` in a loop | `for` loop + `Math.floor(Math.random() * 10)` |
| Limited attempts | `for (let i = 0; i < maxAttempts; i++)` | `for` loop with counter |
| Admin: 2 attempts | `maxAttempts = 2` | Variable |
| Designer/Tester: 3 attempts | `maxAttempts = 3` | Variable |
| Access denied message | `alert('Access denied')` after loop | Runs if loop completes without `return` |
| Admin Step 2: graduation calc | `adminStep2()` computes `graduationYear` and `ageAtGraduation` | Number arithmetic |
| Designer Step 2: discount | `designerStep2()` checks age/portfolio ranges | Nested `if/else if/else` |
| Tester Step 2: same as designer | `testerStep2()` -- identical logic, different course name | Code reuse |

---

# PART E: QUICK COPY PATTERNS

These are the most reusable patterns from this assignment. If you see something similar on the exam, grab one of these.

## Pattern 1: HTML5 Boilerplate with External JS and CSS

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Page Title</title>
  </head>
  <body>
    <div class="container">
      <!-- content -->
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## Pattern 2: CSS Reset + Centered Card Layout

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Segoe UI', sans-serif;
    background: #e8ecf1;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 500px;
}
```

## Pattern 3: Styled Button with Hover Effect

```css
button {
    background-color: #3a6ea5;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
button:hover {
    background-color: #2d5986;
}
```

## Pattern 4: Show/Hide Elements via CSS Class

```css
.hidden { display: none; }
```
```javascript
document.getElementById('myElement').classList.add('hidden');    // hide
document.getElementById('myElement').classList.remove('hidden'); // show
```

## Pattern 5: Click Event Listener

```javascript
document.getElementById('myBtn').addEventListener('click', function () {
    // runs when button is clicked
});
```

## Pattern 6: Switch Statement with Default

```javascript
let result = '';
switch (input.toLowerCase()) {
    case 'option1':
        result = 'Value 1';
        break;
    case 'option2':
        result = 'Value 2';
        break;
    default:
        result = 'Unknown';
        break;
}
```

## Pattern 7: If / Else If / Else Chain

```javascript
if (condition1) {
    // first case
} else if (condition2) {
    // second case
} else {
    // default case
}
```

## Pattern 8: Prompt with Validation

```javascript
let input = prompt('Enter something');
if (input === null || input === '' || isNaN(input)) {
    alert('Invalid input');
    return;
}
```

## Pattern 9: Random Number Generation

```javascript
// Random integer between 0 and 9
Math.floor(Math.random() * 10);

// 6-digit password
let password = '';
for (let i = 0; i < 6; i++) {
    password += Math.floor(Math.random() * 10);
}
```

## Pattern 10: Function Expression (Assignment Required Style)

```javascript
const myFunction = function () {
    // function body
};
myFunction(); // call it
```

## Pattern 11: For Loop with Limited Attempts

```javascript
for (let i = 0; i < maxAttempts; i++) {
    let attempt = prompt('Enter password');
    if (attempt === correctPassword) {
        // success
        return;
    } else {
        alert('Wrong. Attempts left: ' + (maxAttempts - i - 1));
    }
}
alert('Access denied');
```

## Pattern 12: Insert HTML into the Page

```javascript
// Insert HTML (with tags)
document.getElementById('output').innerHTML = '<img src="pic.png" width="300">';

// Insert plain text
document.getElementById('output').textContent = 'Hello World';
```

## Pattern 13: Number Conversion for Math

```javascript
let num = Number(prompt('Enter a number'));
// Now safe to do: num + 1, num * 2, etc.
```

---

# PART F: COMMON EXAM TRAPS

1. **Forgetting `break` in switch:** Without `break`, execution falls through to the next case. This is the #1 switch mistake.

2. **`prompt()` returns a string:** `prompt('age')` returns `"25"`, not `25`. Use `Number()` if you need math with addition.

3. **`==` vs `===`:** Loose vs strict equality. Know the difference. `'5' == 5` is `true`, `'5' === 5` is `false`.

4. **`+` with strings vs numbers:** `"5" + 1 = "51"` (concatenation), `"5" - 1 = 4` (math). The `+` operator is overloaded.

5. **Script placement:** `<script>` at the bottom of `<body>`, or use `defer` attribute in `<head>`. Otherwise `getElementById` returns `null`.

6. **`display: none` vs `visibility: hidden`:** `display: none` removes from flow (no space), `visibility: hidden` keeps the space.

7. **Function expression vs declaration:** Expressions are NOT hoisted. You cannot call `myFunc()` before `const myFunc = function() {};` appears in code.

8. **`100vh` needs context:** Flexbox vertical centering only works if the container has a height. `100vh` gives the body the full viewport height.

9. **`innerHTML` vs `textContent`:** Use `innerHTML` to inject HTML tags, `textContent` for safe plain text.

10. **`return` in event listeners:** `return` exits the current function, not the whole script. Inside an event listener callback, `return` exits just that callback.

---

Good luck on the midterm! Remember: if the exam asks "use a switch statement," use a switch statement -- not a chain of if/else. If it says "function expression," use `const f = function() {};` -- not `function f() {}`. Read the requirements carefully, just like you did for this assignment.
