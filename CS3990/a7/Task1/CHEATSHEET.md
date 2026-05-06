# Assignment 7 - Task 1 Cheat Sheet (Midterm Prep)

## What Was Task 1 About?

Task 1 (10 points) was about **Arrays, Objects, Classes, and Modules in JavaScript**. The goal was to:

1. Create a `Button` class with 3 properties and a `show()` method that uses `document.write()`.
2. Create two arrays (`arrTexts`, `arrColors`) with 4 items each.
3. Use `forEach()` to loop through both arrays simultaneously to generate 4 Button instances.
4. Display the buttons one at a time, each appearing 30 seconds apart, using `setTimeout()` (NOT `setInterval()`).
5. Create a `ColorButton` class that **inherits** from `Button`, adds a `fColor` property, and **overrides** `show()`.
6. Display one `ColorButton` instance after all regular buttons have appeared.
7. Split everything into **5 separate JS files** (modules): `myButton.js`, `myColorButton.js`, `myArrays.js`, `myFunctions.js`, `main.js`.

---

## File-by-File Breakdown

---

### 1. `index.html` -- The Entry Point

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A7 T1 - Jehad Hamad" />
    <meta name="author" content="Jehad" />
    <title>Task1 - Jehad Hamad</title>
  </head>
  <body>
    <script src="myButton.js"></script>
    <script src="myColorButton.js"></script>
    <script src="myArrays.js"></script>
    <script src="myFunctions.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

#### What's Going On Here

- **No CSS** -- This task is purely about JS logic, not styling (the inline styles are set via JS).
- **No `<div>` or `<p>` elements** -- Everything is rendered dynamically by `document.write()`.
- **Five `<script>` tags** at the bottom of `<body>` -- this is how the "modules" are connected. They are NOT ES6 modules (no `import`/`export`). Instead, they are loaded as **global scripts** in a specific order.

#### Why the Order Matters

Each script tag runs top-to-bottom. Later scripts can use things defined in earlier scripts:

| Load Order | File               | What It Defines                        | What It Needs From Earlier Scripts |
|------------|--------------------|----------------------------------------|------------------------------------|
| 1st        | `myButton.js`      | `Button` class                         | Nothing                            |
| 2nd        | `myColorButton.js` | `ColorButton` class                    | `Button` (from #1)                 |
| 3rd        | `myArrays.js`      | `arrTexts`, `arrColors`                | Nothing                            |
| 4th        | `myFunctions.js`   | `generateButtons()`, `displayButtons()`| `Button` (#1), `arrTexts` & `arrColors` (#3) |
| 5th        | `main.js`          | Runs everything                        | Everything above                   |

**Key Insight:** This is a "poor man's module system." Each file dumps its variables/classes into the **global scope**, and later files just use them. On a real project you'd use ES6 `import`/`export`, but this assignment tests whether you understand script loading order and global scope.

#### How to Reuse This Pattern

If a professor asks you to split code into multiple files without ES6 modules:
```html
<!-- Always load dependencies BEFORE the files that use them -->
<script src="classDefinitions.js"></script>   <!-- classes first -->
<script src="data.js"></script>               <!-- data arrays second -->
<script src="helperFunctions.js"></script>    <!-- functions that use both -->
<script src="app.js"></script>                <!-- main logic last -->
```

---

### 2. `myButton.js` -- The Base Class

```js
class Button {
    constructor(btnText, btnBgColor, btnTitle) {
        this.btnText = btnText;
        this.btnBgColor = btnBgColor;
        this.btnTitle = btnTitle;
    }

    show() {
        document.write(
            `<button style="background-color: ${this.btnBgColor};" title="${this.btnTitle}">${this.btnText}</button>`
        );
    }
}
```

#### Concepts Covered

**A) ES6 Class Syntax**

- **WHAT:** `class Button { ... }` defines a blueprint for creating Button objects.
- **WHY:** The assignment requires a reusable Button with 3 properties. A class is the cleanest way to bundle data + behavior.
- **HOW to reuse:**
  ```js
  class Car {
      constructor(make, model, year) {
          this.make = make;
          this.model = model;
          this.year = year;
      }
      describe() {
          return `${this.year} ${this.make} ${this.model}`;
      }
  }
  let myCar = new Car('Toyota', 'Camry', 2024);
  ```

**B) Constructor**

- **WHAT:** `constructor(btnText, btnBgColor, btnTitle)` is a special method that runs automatically when you do `new Button(...)`. It sets up the instance's properties.
- **WHY:** Each button needs its own text, color, and title. The constructor receives these as arguments and stores them on `this`.
- **HOW `this` works:** Inside a class, `this` refers to the specific instance being created. `this.btnText = btnText` means "store the argument `btnText` as a property on THIS particular button object."

**C) Template Literals (Backtick Strings)**

- **WHAT:** The backtick string `` `<button style="background-color: ${this.btnBgColor};">` `` lets you embed expressions inside `${ }`.
- **WHY:** We need to dynamically insert each button's color, title, and text into HTML. Template literals are way cleaner than string concatenation (`"<button style='background-color: " + this.btnBgColor + ";'>"` -- yuck).
- **HOW to reuse:**
  ```js
  let name = "Jehad";
  let greeting = `Hello, ${name}! You have ${2 + 3} messages.`;
  // "Hello, Jehad! You have 5 messages."
  ```

**D) `document.write()`**

- **WHAT:** Writes HTML directly into the document at the current position.
- **WHY:** The assignment specifically says to use `document.write()` to render buttons. It's the simplest way to inject HTML.
- **IMPORTANT GOTCHA:** If you call `document.write()` AFTER the page has fully loaded (e.g., inside a `setTimeout` that fires later), it **wipes the entire page** and replaces it with just that content. In this assignment, that's actually what happens -- each button replaces the previous content. The assignment allows this behavior since `setTimeout` fires after page load.
- **HOW to reuse:**
  ```js
  document.write('<h1>Hello World</h1>');
  document.write(`<p style="color: red;">Error: ${errorMsg}</p>`);
  ```

**E) Inline Styles via String**

- **WHAT:** `style="background-color: ${this.btnBgColor};"` sets CSS directly on the element.
- **WHY:** Quick way to apply per-button colors without needing a stylesheet.

**F) The `title` Attribute**

- **WHAT:** `title="${this.btnTitle}"` adds a tooltip that appears when you hover over the button.
- **WHY:** The assignment requires `btnTitle` to show as a tooltip. The HTML `title` attribute does exactly that.

---

### 3. `myColorButton.js` -- Inheritance (Extends + Super)

```js
class ColorButton extends Button {
    constructor(fColor, ...args) {
        super(...args);
        this.fColor = fColor;
    }
    show() {
        document.write(
            `<button style="background-color: ${this.btnBgColor}; color: ${this.fColor};" title="${this.btnTitle}">${this.btnText}</button>`
        );
    }
}
```

#### Concepts Covered

**A) `extends` -- Class Inheritance**

- **WHAT:** `class ColorButton extends Button` means ColorButton inherits everything from Button (constructor logic, methods, etc.).
- **WHY:** The assignment says ColorButton should have all Button properties PLUS a font color (`fColor`). Inheritance avoids duplicating the Button code.
- **HOW to reuse:**
  ```js
  class Animal {
      constructor(name) { this.name = name; }
      speak() { return `${this.name} makes a sound`; }
  }
  class Dog extends Animal {
      speak() { return `${this.name} barks`; }  // override
  }
  ```

**B) `super(...args)` -- Calling the Parent Constructor**

- **WHAT:** `super(...)` calls the parent class's constructor. You MUST call `super()` before using `this` in a child class.
- **WHY:** ColorButton needs Button's setup (btnText, btnBgColor, btnTitle). Instead of re-writing that logic, `super()` delegates to Button's constructor.
- **KEY RULE:** If your class `extends` another class, the constructor MUST call `super()` before anything else. If you forget, you get a ReferenceError.

**C) Rest Parameters (`...args`)**

- **WHAT:** `...args` collects all remaining arguments into an array. In `constructor(fColor, ...args)`, the first argument goes to `fColor`, and everything else is gathered into `args`.
- **WHY:** This is a clever shortcut. Instead of writing `constructor(fColor, btnText, btnBgColor, btnTitle)` and then `super(btnText, btnBgColor, btnTitle)`, you just write `...args` and pass them through.
- **HOW it works step by step:**
  ```js
  // When you call:
  new ColorButton('white', 'Special', 'navy', 'Special is shown on the navy background')
  // fColor = 'white'
  // ...args = ['Special', 'navy', 'Special is shown on the navy background']
  // super(...args) becomes super('Special', 'navy', 'Special is shown on the navy background')
  // Which matches Button's constructor(btnText, btnBgColor, btnTitle)
  ```

**D) Method Overriding**

- **WHAT:** `show()` in ColorButton replaces (overrides) the `show()` from Button.
- **WHY:** ColorButton's `show()` needs to also include `color: ${this.fColor}` in the style. The parent's `show()` doesn't know about `fColor`, so we override it.
- **Key difference from parent:** The only addition is `color: ${this.fColor};` in the style string. Everything else is the same.

---

### 4. `myArrays.js` -- Data Storage

```js
let arrTexts = ['Save Progress', 'Click Me', 'Download', 'See more'];
let arrColors = ['lightgreen', 'lightgray', 'lightgray', 'tomato'];
```

#### Concepts Covered

**A) Parallel Arrays**

- **WHAT:** Two arrays where items at the same index are related. `arrTexts[0]` ("Save Progress") pairs with `arrColors[0]` ("lightgreen").
- **WHY:** The assignment requires 4 buttons, each with a text and a color. Using parallel arrays keeps the data simple and lets you loop through both using the index.
- **HOW to reuse:**
  ```js
  let names = ['Alice', 'Bob', 'Charlie'];
  let scores = [95, 87, 72];
  // names[i] and scores[i] always correspond to the same person
  ```

**B) `let` for Variable Declaration**

- **WHAT:** `let` declares a block-scoped variable that can be reassigned.
- **WHY:** These arrays are global (accessible from other script files). `let` is preferred over `var` because it has cleaner scoping rules. `const` could also work here since the arrays themselves aren't reassigned (only their contents are read), but `let` is fine.

**C) CSS Named Colors**

- The color values (`'lightgreen'`, `'lightgray'`, `'tomato'`) are valid CSS color names. You can use these directly in `style="background-color: tomato;"`.

---

### 5. `myFunctions.js` -- Business Logic (Generation + Display)

```js
function generateButtons() {
    let arrButtons = [];
    arrTexts.forEach((e, i) => {
        let title = `${e} is shown on the ${arrColors[i]} background`;
        arrButtons.push(new Button(e, arrColors[i], title));
    });
    return arrButtons;
}

function displayButtons(arrButtons) {
    arrButtons.forEach((btn, i) => {
        setTimeout(() => {
            btn.show();
        }, i * 30000);
    });
}
```

#### Function 1: `generateButtons()`

**Purpose:** Creates an array of 4 Button objects from the two data arrays.

**Step-by-step walkthrough:**

1. `let arrButtons = [];` -- Start with an empty array to hold our Button instances.
2. `arrTexts.forEach((e, i) => { ... })` -- Loop through `arrTexts`. For each element:
   - `e` = the current text (e.g., "Save Progress")
   - `i` = the current index (0, 1, 2, 3)
3. `let title = \`${e} is shown on the ${arrColors[i]} background\`;` -- Build the tooltip string. Example: "Save Progress is shown on the lightgreen background"
4. `arrButtons.push(new Button(e, arrColors[i], title));` -- Create a new Button and add it to the array.
5. `return arrButtons;` -- Return the array of 4 Button objects.

**Concepts:**

**A) `forEach()` with Element AND Index**

- **WHAT:** `array.forEach((element, index) => { ... })` gives you both the current item and its position.
- **WHY:** We need the index to grab the matching color from `arrColors`. The text comes from `arrTexts` (the array we're looping), but the color comes from the OTHER array at the same index.
- **HOW to reuse:**
  ```js
  let fruits = ['apple', 'banana'];
  let prices = [1.50, 0.75];
  fruits.forEach((fruit, i) => {
      console.log(`${fruit} costs $${prices[i]}`);
  });
  ```

**B) `Array.push()`**

- **WHAT:** Adds an item to the END of an array.
- **WHY:** We're building up `arrButtons` one item at a time inside the loop.
- **HOW to reuse:**
  ```js
  let results = [];
  for (let i = 0; i < 5; i++) {
      results.push(i * 2);  // [0, 2, 4, 6, 8]
  }
  ```

**C) `new Button(...)` -- Instantiation**

- **WHAT:** Creates a new instance of the Button class.
- **WHY:** Each iteration creates one button with specific text, color, and title.

---

#### Function 2: `displayButtons(arrButtons)`

**Purpose:** Shows each button one at a time, 30 seconds apart.

**Step-by-step walkthrough:**

1. Loop through `arrButtons` with `forEach`.
2. For each button, schedule it to appear after `i * 30000` milliseconds:
   - Button 0: `0 * 30000 = 0ms` (immediately)
   - Button 1: `1 * 30000 = 30000ms` (30 seconds)
   - Button 2: `2 * 30000 = 60000ms` (60 seconds)
   - Button 3: `3 * 30000 = 90000ms` (90 seconds)

**Concepts:**

**A) `setTimeout()` -- Delayed Execution**

- **WHAT:** `setTimeout(callback, delayInMs)` runs the callback function ONCE after the specified delay.
- **WHY:** The assignment says buttons should appear one at a time, 30 seconds apart. Using `setTimeout` with increasing delays (`i * 30000`) staggers them.
- **WHY NOT `setInterval()`?** The assignment explicitly says to use `setTimeout`, not `setInterval`. `setInterval` repeats forever; `setTimeout` fires once. By using `forEach` + `setTimeout`, we schedule all 4 timeouts at once, each with a different delay.
- **HOW to reuse:**
  ```js
  // Show items one by one, 2 seconds apart
  items.forEach((item, i) => {
      setTimeout(() => {
          console.log(item);
      }, i * 2000);
  });
  ```

**B) Arrow Functions as Callbacks**

- **WHAT:** `() => { btn.show(); }` is a short anonymous function.
- **WHY:** `setTimeout` needs a function to call later. The arrow function wraps `btn.show()` so it runs at the right time.
- **CLOSURE:** Each arrow function "remembers" the `btn` variable from its iteration. This is a closure -- the inner function captures the outer variable. This is why `let` works here (each loop iteration gets its own `btn`).

---

### 6. `main.js` -- The Orchestrator

```js
let arrButtons = generateButtons();
displayButtons(arrButtons);

let colorBtn = new ColorButton('white', 'Special', 'navy', 'Special is shown on the navy background');
setTimeout(() => {
    colorBtn.show();
}, arrButtons.length * 30000);
```

#### Step-by-step walkthrough:

1. **`let arrButtons = generateButtons();`** -- Calls the function from `myFunctions.js`. Gets back an array of 4 Button instances.
2. **`displayButtons(arrButtons);`** -- Schedules all 4 buttons to appear 30 seconds apart.
3. **`let colorBtn = new ColorButton('white', 'Special', 'navy', '...');`** -- Creates one ColorButton instance:
   - `fColor = 'white'` (font color)
   - `btnText = 'Special'` (via rest params -> super)
   - `btnBgColor = 'navy'` (via rest params -> super)
   - `btnTitle = 'Special is shown on the navy background'` (via rest params -> super)
4. **`setTimeout(() => { colorBtn.show(); }, arrButtons.length * 30000);`** -- Shows the ColorButton AFTER all regular buttons. Since there are 4 buttons, delay = `4 * 30000 = 120000ms = 2 minutes`.

#### Concepts:

**A) Timing the ColorButton**

- **WHAT:** `arrButtons.length * 30000` calculates the delay dynamically.
- **WHY:** The ColorButton should appear after ALL regular buttons are done. If there are 4 buttons at 30s intervals, the last one appears at 90s (index 3 * 30s). The ColorButton is set to appear at 120s (4 * 30s), giving 30 seconds after the last regular button.
- **Smart pattern:** Using `.length` instead of hardcoding `4` means this code adapts if you add more buttons to the arrays.

---

## How All the Files Connect (The Big Picture)

```
index.html
  |
  |-- loads myButton.js       --> defines class Button (global)
  |-- loads myColorButton.js  --> defines class ColorButton extends Button (global)
  |-- loads myArrays.js       --> defines arrTexts, arrColors (global)
  |-- loads myFunctions.js    --> defines generateButtons(), displayButtons() (global)
  |                               (uses Button, arrTexts, arrColors from above)
  |-- loads main.js           --> RUNS everything
                                  (uses generateButtons, displayButtons, ColorButton)
```

**Data flow:**
```
arrTexts + arrColors  -->  generateButtons()  -->  arrButtons (array of Button objects)
                                                        |
                                                        v
                                                   displayButtons()  -->  btn.show() x4 (staggered)
                                                        |
                                                        v
                                              ColorButton.show() (after all buttons)
```

---

## HTML Structure & How JS Hooks Into It

This task has a **minimal HTML structure** -- just a basic page shell. There are:

- **No IDs or classes** used for JS hooks (unlike Task 2).
- **No event listeners** -- buttons are displayed via `document.write()`, not attached to DOM elements.
- **No CSS file** -- all styling is done inline via the `style` attribute in the `document.write()` output.

The JS "hooks into" the HTML simply by being loaded via `<script>` tags. The `document.write()` calls inject HTML directly into the page body.

---

## Assignment Requirements vs. Code Mapping

| Requirement | Where It's Fulfilled |
|---|---|
| Create Button class with 3 properties | `myButton.js` -- constructor sets `btnText`, `btnBgColor`, `btnTitle` |
| `show()` method using `document.write()` | `myButton.js` -- `show()` method |
| `btnTitle` shown as tooltip | `myButton.js` -- `title="${this.btnTitle}"` attribute |
| 2 arrays with 4 items each | `myArrays.js` -- `arrTexts` and `arrColors` |
| `forEach()` to loop through 2 arrays simultaneously | `myFunctions.js` -- `generateButtons()` uses `forEach((e, i) =>` |
| `btnTitle` = "btnText is shown on the btnBgColor background" | `myFunctions.js` -- template literal builds this string |
| Store created instances in `arrButtons` | `myFunctions.js` -- `arrButtons.push(new Button(...))` |
| Display buttons with `forEach` + `setTimeout` (NOT setInterval) | `myFunctions.js` -- `displayButtons()` |
| Buttons appear 30 seconds apart | `myFunctions.js` -- `i * 30000` delay |
| `ColorButton` inherits from `Button` | `myColorButton.js` -- `extends Button` |
| `ColorButton` adds `fColor` property | `myColorButton.js` -- `this.fColor = fColor` |
| Override `show()` with 4 properties | `myColorButton.js` -- `show()` includes `color: ${this.fColor}` |
| Create and display one `ColorButton` instance | `main.js` -- `new ColorButton(...)` + `setTimeout` |
| 5 separate modules | 5 files: `myButton.js`, `myColorButton.js`, `myArrays.js`, `myFunctions.js`, `main.js` |

---

## Quick Copy Patterns

### Pattern 1: Basic Class with Constructor

```js
class ClassName {
    constructor(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
    doSomething() {
        // use this.prop1, this.prop2
    }
}
let obj = new ClassName('value1', 'value2');
```

### Pattern 2: Inheritance with extends + super

```js
class Child extends Parent {
    constructor(newProp, ...parentArgs) {
        super(...parentArgs);       // MUST call super() first
        this.newProp = newProp;     // then set child-specific stuff
    }
    // Override parent method:
    parentMethod() {
        // new implementation
    }
}
```

### Pattern 3: forEach with Index (Looping Two Parallel Arrays)

```js
let names = ['A', 'B', 'C'];
let values = [1, 2, 3];

names.forEach((name, i) => {
    console.log(`${name} has value ${values[i]}`);
});
```

### Pattern 4: Staggered setTimeout (Show Items One by One)

```js
items.forEach((item, i) => {
    setTimeout(() => {
        // do something with item
        item.show();
    }, i * delayMs);   // 0, delayMs, 2*delayMs, 3*delayMs ...
});
```

### Pattern 5: document.write() with Template Literal

```js
document.write(
    `<div style="color: ${myColor};" title="${myTooltip}">${myContent}</div>`
);
```

### Pattern 6: Building an Array with push() Inside a Loop

```js
let results = [];
sourceArray.forEach((item) => {
    let newThing = new SomeClass(item);
    results.push(newThing);
});
return results;
```

### Pattern 7: Rest Parameters (...args) to Forward Arguments

```js
function wrapper(extra, ...rest) {
    originalFunction(...rest);   // spread them back out
    // 'extra' is the first arg, 'rest' is everything else
}
```

### Pattern 8: Dynamic Delay Based on Array Length

```js
// Schedule something AFTER a series of staggered timeouts
let totalDelay = array.length * intervalMs;
setTimeout(() => {
    // runs after all staggered items
}, totalDelay);
```

---

## Exam Tips & Common Gotchas

### 1. `document.write()` After Page Load Wipes the Page
If you call `document.write()` after the document has finished loading (which `setTimeout` does), it calls `document.open()` implicitly, erasing all existing content. In this assignment that's acceptable, but on an exam if they ask "what happens when..." -- this is the answer.

### 2. `super()` MUST Come Before `this` in a Child Constructor
```js
class Child extends Parent {
    constructor(x) {
        this.x = x;      // ReferenceError! Must call super() first
        super();
    }
}
```
Always call `super()` on the FIRST line of a child constructor.

### 3. `setTimeout` vs `setInterval`
- `setTimeout(fn, ms)` -- runs `fn` ONCE after `ms` milliseconds.
- `setInterval(fn, ms)` -- runs `fn` REPEATEDLY every `ms` milliseconds.
- The assignment specifically says to use `setTimeout`. If an exam question asks which one to use for "show one item, wait, show next item" -- the answer is `setTimeout` with `forEach` and `i * delay`.

### 4. `forEach` Does NOT Return Anything
`forEach` always returns `undefined`. If you need a new array, use `.map()`. If you need to filter, use `.filter()`. `forEach` is for side effects only (like pushing to an array or calling `document.write`).

### 5. Arrow Functions and `this`
Arrow functions do NOT have their own `this`. They inherit `this` from the surrounding scope. In class methods, always use regular functions (or the class method syntax), not arrow functions, if you need `this` to refer to the instance. In this assignment, arrow functions are used as callbacks inside class methods, which is fine because they don't reference `this` themselves.

### 6. Script Load Order = Dependency Order
When using multiple `<script>` tags (without `type="module"`), files execute in order. If File B uses a class from File A, File A's `<script>` tag MUST come first. Getting this wrong causes `ReferenceError: ClassName is not defined`.

### 7. `let` vs `const` vs `var`
- `let` -- block-scoped, can be reassigned. Used for variables that change.
- `const` -- block-scoped, CANNOT be reassigned. Use for things that stay the same.
- `var` -- function-scoped (older style), avoid it. It hoists and can cause weird bugs.
- In this assignment, `let` is used everywhere. On an exam, if asked "which is best for an array that doesn't get reassigned," technically `const` is more correct, but `let` still works.

### 8. Rest (`...args`) vs Spread (`...args`) -- Same Syntax, Different Purpose
- **Rest** (in function parameters): `function foo(...args)` -- collects multiple arguments INTO an array.
- **Spread** (in function calls): `super(...args)` -- spreads an array OUT into individual arguments.
- In `ColorButton`, both are used: rest to collect, spread to pass along.

### 9. Template Literal Gotcha
Template literals use BACKTICKS (`` ` ``), not regular quotes (`'` or `"`). If you use regular quotes, `${variable}` won't work -- it'll be treated as literal text.

### 10. The `title` HTML Attribute
The `title` attribute on any HTML element creates a native browser tooltip on hover. You don't need JavaScript for the tooltip -- just set `title="some text"` and the browser handles it.

### 11. Why 5 Separate Files?
The assignment tests **modular code organization**. Each file has a single responsibility:
- Data definition (arrays)
- Class definition (Button)
- Extended class definition (ColorButton)
- Logic/functions (generate + display)
- Execution (main)

This is a simplified version of the **Separation of Concerns** principle. On an exam, if asked "why split code into modules?" -- answer: reusability, maintainability, readability, and separation of concerns.

### 12. Closures in setTimeout
Inside `displayButtons`, each `setTimeout` callback "closes over" the `btn` variable from its specific `forEach` iteration. This works correctly with `let` (or `const`). If you used `var` instead of `let` in a regular `for` loop, all callbacks would share the same variable and you'd get bugs. This is a CLASSIC exam question.

---

## TL;DR Summary For Quick Review

- **Button class** = constructor(3 props) + show() using document.write() with template literal
- **ColorButton class** = extends Button, adds fColor, uses rest/spread for constructor args, overrides show()
- **myArrays.js** = two parallel arrays (texts + colors), 4 items each
- **myFunctions.js** = generateButtons() uses forEach with index to loop both arrays + push Button instances; displayButtons() uses forEach + setTimeout with `i * 30000` for staggered display
- **main.js** = calls generateButtons(), calls displayButtons(), creates one ColorButton, shows it after all others via setTimeout with `arrButtons.length * 30000`
- **index.html** = loads 5 scripts in dependency order, no DOM elements, no CSS file
- All scripts share the global scope (no import/export)
