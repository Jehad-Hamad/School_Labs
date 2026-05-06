# CS3990 Assignment 2 -- Comprehensive Cheat Sheet

## What This Assignment Was About

Assignment 2 ("HTML and CSS Fundamentals Part 2") required building a **personal CV landing page** with a multi-column float-based layout using **HTML5 semantic tags** and **CSS3 positioning**. The layout has:

- A **Header** (profile image floated left + title centered)
- A **Nav Menu** (rounded button links with hover color change)
- A **3-column body**: Left sidebar (Aside1 + Aside2), Main content (two sections), Right sidebar (Aside3 with a To-Do list + a fixed image)
- A **Fixed Footer** (two link columns + social media icons that go from grayscale to color on hover)

Key CSS concepts tested: **float-based layouts**, **position: sticky/fixed**, **pseudo-classes** (:hover, :nth-child), **background-image as icons**, **list styling**, **border-radius**, and **overflow clearing**.

---

## Table of Contents

1. [HTML Structure and Semantic Tags](#1-html-structure-and-semantic-tags)
2. [The Head Section -- Meta and Links](#2-the-head-section----meta-and-links)
3. [Header Component](#3-header-component)
4. [Navigation Menu](#4-navigation-menu)
5. [Float-Based 3-Column Layout](#5-float-based-3-column-layout)
6. [Left Sidebar -- Aside1 (Sticky Block)](#6-left-sidebar----aside1-sticky-block)
7. [Left Sidebar -- Aside2 (Nested List Styling)](#7-left-sidebar----aside2-nested-list-styling)
8. [Main Content -- Sections](#8-main-content----sections)
9. [Right Sidebar -- Aside3 (To-Do List)](#9-right-sidebar----aside3-to-do-list)
10. [Fixed Image (IMG2)](#10-fixed-image-img2)
11. [Footer -- Fixed + Columns + Social Icons](#11-footer----fixed--columns--social-icons)
12. [The "Fake Footer" Trick](#12-the-fake-footer-trick)
13. [All Selectors Used -- Cheat Sheet](#13-all-selectors-used----cheat-sheet)
14. [All CSS Properties Used -- Master List](#14-all-css-properties-used----master-list)
15. [Positioning Deep Dive](#15-positioning-deep-dive)
16. [Float Layout Deep Dive](#16-float-layout-deep-dive)
17. [Pseudo-Classes Deep Dive](#17-pseudo-classes-deep-dive)
18. [Quick Copy Patterns](#18-quick-copy-patterns)

---

## 1. HTML Structure and Semantic Tags

The assignment **required** HTML5 semantic tags. Here is every semantic element used and why:

| Element | Where Used | WHY (purpose) |
|---------|-----------|---------------|
| `<header>` | Top of page | Wraps the introductory content (profile pic + name). Tells browsers/screen readers "this is the page header." |
| `<nav>` | Menu bar | Wraps navigation links. Semantic meaning: "this is the main navigation." |
| `<main>` | Center column | The primary content of the page. Only one per page. |
| `<section>` | Inside main (C1, C2) | Groups thematically related content (Skills, Education). |
| `<aside>` | Left sidebars + right sidebar | Content tangentially related to the main content (building photo, course list, to-do list). |
| `<footer>` | Bottom of page | Page footer with links and social icons. |
| `<div>` | Generic wrappers | Used when no semantic meaning is needed (columns wrapper, footerLinks, footerCol, todo, socialMedia). |

**Exam tip:** If the question says "use semantic tags," always prefer `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>` over generic `<div>`. Use `<div>` only when you need a wrapper with no semantic meaning.

```html
<!-- The skeleton pattern -->
<body>
  <header>...</header>
  <nav>...</nav>
  <div class="columns">
    <aside>...</aside>
    <main>
      <section>...</section>
      <section>...</section>
    </main>
    <aside>...</aside>
  </div>
  <footer>...</footer>
</body>
```

**How to reuse:** Building a portfolio page? A blog? Swap the content but keep the same skeleton. For example, a recipe site:
```html
<body>
  <header><!-- Site logo + title --></header>
  <nav><!-- Home | Recipes | About --></nav>
  <div class="columns">
    <aside><!-- Ingredient filter sidebar --></aside>
    <main>
      <section><!-- Featured recipes --></section>
      <section><!-- Latest recipes --></section>
    </main>
    <aside><!-- Popular tags / ads --></aside>
  </div>
  <footer><!-- Copyright + social links --></footer>
</body>
```
The semantic tags stay the same -- just change what goes inside them.

---

## 2. The Head Section -- Meta and Links

```html
<head>
  <link rel="stylesheet" href="styles.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Jehad Hamad CV CS3990 Assigment One" />
  <meta name="author" content="Jehad" />
  <title>Jehad Hamad Landing page</title>
  <link rel="shortcut icon" href="Favicons/favicon.ico" type="image/x-icon" />
</head>
```

| Element/Attribute | WHAT it does | WHY it matters |
|---|---|---|
| `<link rel="stylesheet" href="styles.css" />` | Links the external CSS file | Separates presentation from structure |
| `<meta charset="UTF-8" />` | Sets character encoding to UTF-8 | Ensures special characters (like the cross mark) render correctly |
| `<meta name="viewport" ...>` | Makes the page responsive-aware | Without this, mobile browsers zoom out and the page looks tiny |
| `<meta name="description" ...>` | SEO description | Search engines display this in results |
| `<meta name="author" ...>` | Identifies the author | Metadata best practice |
| `<title>` | Browser tab title | Required for every HTML page |
| `<link rel="shortcut icon" ...>` | Sets the favicon (tab icon) | Small branding detail |

**Exam tip:** The viewport meta tag is almost always required. Memorize this exact line:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**How to reuse:** Every new HTML page you create should have this same `<head>` block. Just swap out the specifics:
```html
<head>
  <link rel="stylesheet" href="your-stylesheet.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Whatever your page is about" />
  <meta name="author" content="Your Name" />
  <title>Your Page Title</title>
  <link rel="shortcut icon" href="your-favicon.ico" type="image/x-icon" />
</head>
```
Copy-paste this every time and fill in the blanks. The charset and viewport lines never change.

---

## 3. Header Component

### HTML
```html
<header class="header">
  <img class="profile" src="Images/Profile.JPG"
       height="150" width="150"
       title="Picture of me" alt="Profile picture" />
  <h1>Jehad Hamad CV</h1>
  <p>Welcome to my landing page</p>
</header>
```

### CSS
```css
.header {
    background-color: grey;
    color: white;
    padding: 20px;
    text-align: center;
    overflow: auto;
}

.profile {
    border: 5px solid black;
    float: left;
}
```

### Breakdown

| Property | WHAT | WHY here | HOW to reuse |
|----------|------|----------|--------------|
| `background-color: grey` | Sets the background to grey | Creates the grey banner look from the sketch | Use any color name or hex code |
| `color: white` | Sets **text** color to white | White text on grey background for contrast | Always pair with a contrasting background |
| `padding: 20px` | Adds 20px space **inside** the header on all sides | Prevents text from touching the edges | `padding: top right bottom left;` or shorthand |
| `text-align: center` | Centers all **inline** content (text, inline elements) | The h1 and p should be centered in the header | Does NOT center block elements -- only inline/text |
| `overflow: auto` | Creates a new Block Formatting Context (BFC) | **This is the key trick**: when a child is floated (`float: left` on the profile image), the parent collapses. `overflow: auto` forces the parent to "contain" the float so it wraps around the image properly. | Alternative: `overflow: hidden` also works |
| `float: left` (on .profile) | Pulls the image to the left, text flows around it | Assignment requires image on the left with title centered beside it | Float removes element from normal flow; siblings wrap around it |
| `border: 5px solid black` | Adds a thick black border around the profile pic | Visual styling per the sketch | `border: width style color;` |

**Exam tip -- the overflow + float pattern:**
When you float a child element, the parent "forgets" the child exists and may collapse to zero height. Fix it with `overflow: auto` or `overflow: hidden` on the parent. This is called "clearing floats" or creating a new BFC.

```css
/* Pattern: Parent contains floated children */
.parent {
    overflow: auto;  /* or overflow: hidden */
}
.child {
    float: left;
}
```

### Image Attributes

| Attribute | WHY |
|-----------|-----|
| `height="150" width="150"` | Inline sizing -- tells the browser exact dimensions before the image loads, preventing layout shift |
| `alt="Profile picture"` | Accessibility -- screen readers read this; also displays if image fails to load |
| `title="Picture of me"` | Shows a tooltip on hover |

---

## 4. Navigation Menu

### HTML
```html
<nav class="menu">
  <a href="https://..." class="menuButton" target="_blank"
     title="Takes to the CS in NWP page">CS in NWP</a>
  <a href="https://..." class="menuButton" target="_blank"
     title="Takes to the Faculty & Staff page">Faculty&Staff</a>
  <a href="https://..." class="menuButton" target="_blank"
     title="Takes to the NWP Home page">NWP Home</a>
</nav>
```

### CSS
```css
.menu {
    margin-top: 20px;
    background-color: grey;
    padding: 20px;
    text-align: center;
}

.menuButton {
    color: white;
    padding: 5px;
    background-color: #e76f51;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
}

.menuButton:hover {
    color: black;
    background-color: #f4a261;
}
```

### Breakdown

| Property | WHAT | WHY here |
|----------|------|----------|
| `margin-top: 20px` | Adds space **above** the menu (outside the element) | Creates a gap between the header and the menu |
| `text-align: center` | Centers the inline `<a>` elements | The buttons should be centered in the nav bar |
| `background-color: #e76f51` | A burnt-orange/coral color for the buttons | Makes links look like buttons (assignment requirement) |
| `border-radius: 8px` | Rounds the corners of each link | Assignment says "rounded buttons" |
| `text-decoration: none` | Removes the default underline from links | Links by default are underlined; we want button-style |
| `font-weight: bold` | Makes text bold | More button-like appearance |
| `target="_blank"` | Opens link in a new tab | Assignment requirement -- external links open in new tabs |

### The Hover Effect (Assignment Requirement!)

The assignment specifically says: "When you hover over a link its color changes."

```css
.menuButton:hover {
    color: black;           /* text goes from white to black */
    background-color: #f4a261;  /* bg goes from #e76f51 (dark) to #f4a261 (lighter) */
}
```

**Exam tip -- making links look like buttons:**
```css
a.button {
    display: inline-block;    /* if you need padding/dimensions to work fully */
    padding: 5px 10px;
    background-color: #somecolor;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
}
a.button:hover {
    background-color: #differentcolor;
    color: black;
}
```

**How to reuse:** Need a nav bar for any site? Wrap your links in `<nav>`, style them as buttons. Change the colors and link text, keep the structure:
```html
<nav class="menu">
  <a href="/home" class="menuButton">Home</a>
  <a href="/about" class="menuButton">About</a>
  <a href="/contact" class="menuButton">Contact</a>
</nav>
```
The CSS pattern above works for any number of links. Want vertical buttons instead? Add `display: block` to each `.menuButton` and they will stack.

---

## 5. Float-Based 3-Column Layout

This is the **most important layout concept** in this assignment. The entire body uses **floats** to create a 3-column layout.

### HTML Structure
```html
<div class="columns">
  <div class="sideBarLeft">    <!-- LEFT COLUMN: 20% -->
    <aside class="aside1">...</aside>
    <aside class="aside2">...</aside>
  </div>
  <main class="main">...</main>  <!-- CENTER COLUMN: 55.9% -->
  <aside class="aside3">...</aside>  <!-- RIGHT COLUMN: 20% -->
</div>
```

### CSS
```css
.sideBarLeft {
    margin-top: 20px;
    background-color: grey;
    color: white;
    width: 20%;
    min-height: 700px;
    float: left;
}

.main {
    margin-top: 20px;
    float: left;
    background-color: grey;
    color: white;
    width: 55.9%;
    min-height: 660px;
    margin-left: 1%;
}

.aside3 {
    margin-top: 20px;
    float: left;
    margin-left: 1%;
    background-color: grey;
    color: white;
    width: 20%;
    min-height: 700px;
}
```

### How the 3-Column Float Layout Works

1. **All three columns use `float: left`** -- they stack horizontally from left to right.
2. **Widths add up to ~100%**: 20% + 1% margin + 55.9% + 1% margin + 20% = 97.9% (a little buffer to prevent wrapping).
3. **`min-height`** ensures columns have a minimum visual height even if content is short.
4. **`margin-left: 1%`** on the center and right columns creates gutters (gaps) between columns.

**Why percentages?** Because they scale with the browser window width. If you used `px`, the columns wouldn't resize.

**Exam tip -- Float Column Pattern:**
```css
/* N columns, all floated left, widths must total <= 100% */
.col-left   { float: left; width: 20%; }
.col-center { float: left; width: 58%; margin-left: 1%; }
.col-right  { float: left; width: 20%; margin-left: 1%; }
```

**How to reuse:** Want 2 columns instead of 3? Just drop one and redistribute the widths:
```css
/* 2-column layout */
.sidebar { float: left; width: 25%; }
.content { float: left; width: 73%; margin-left: 2%; }
```
Want 4 columns? Same idea -- just make sure widths + margins add up to 100% or less. Always keep a small buffer (1-2%) to avoid accidental wrapping. And don't forget `overflow: auto` on the parent wrapper and `clear: both` on whatever comes after.

---

## 6. Left Sidebar -- Aside1 (Sticky Block)

### The Assignment Requirement
> "ASIDE1 -- a sticky block (to the top)"

### CSS
```css
.aside1 {
    margin-top: 20px;
    margin-left: 10px;
    position: sticky;
    top: 20px;
    background-color: #b0b0b0;
    border-radius: 8px;
    width: 95%;
    height: 260px;
    overflow: auto;
}

.nwpBuilding {
    border: 5px solid black;
    display: block;
    margin: 40px auto 0 auto;
}
```

### Breakdown

| Property | WHAT | WHY here |
|----------|------|----------|
| `position: sticky` | Element scrolls normally until it reaches `top: 20px`, then it "sticks" to that position | Assignment requirement -- the building photo should stay visible as you scroll |
| `top: 20px` | Defines where the element sticks | 20px from the top of the viewport when scrolling |
| `border-radius: 8px` | Rounds the corners of the aside box | Visual styling from the sketch |
| `width: 95%` | Takes up 95% of the parent sidebar width | Leaves a small margin on the right |
| `height: 260px` | Fixed height for the aside | Controls the visible area |
| `overflow: auto` | Adds scrollbar if content overflows | If the image is taller than 260px, user can scroll |

### Centering an Image (Block-Level)

```css
.nwpBuilding {
    display: block;           /* Images are inline by default; make it block */
    margin: 40px auto 0 auto; /* auto left/right margins = centered */
}
```

**Exam tip -- centering a block element horizontally:**
```css
.centered {
    display: block;
    margin: 0 auto;  /* shorthand: top/bottom = 0, left/right = auto */
}
```
This only works on **block** elements with a defined width (images have intrinsic width, so it works).

**How to reuse:** Sticky is great for any sidebar content you want to keep visible while scrolling -- like a table of contents, a "back to top" button, or a mini profile card. Just apply the same pattern:
```css
.sticky-widget {
    position: sticky;
    top: 10px;           /* adjust how far from the top it sticks */
    /* add your own styling below */
}
```
Remember: sticky only works within its parent container. Once the parent scrolls out of view, the sticky child goes with it. So make sure the parent is tall enough for the sticking to actually be noticeable.

---

## 7. Left Sidebar -- Aside2 (Nested List Styling)

### The Assignment Requirement
The course list needs 3 levels of background shading:
- Light background for the entire list
- Darker background for each list item
- Darkest background under the text (inside `<strong>`)

### HTML
```html
<aside class="aside2">
  <ol class="courseList">
    <li><strong>Programming Paradigms</strong></li>
    <li><strong>Web Development</strong></li>
    <li><strong>Psychology</strong></li>
    <li><strong>Calculus IV</strong></li>
    <li><strong>Networking and Communication</strong></li>
  </ol>
</aside>
```

### CSS
```css
.aside2 {
    margin-top: 50px;
    background-color: grey;
    color: white;
    width: 100%;
}

.courseList {
    list-style-position: inside;
    background-color: #d4c4c4;    /* LIGHTEST - whole list */
    padding: 20px;
    border-radius: 8px;
    margin: 10px;
}

.courseList > li {
    background-color: #a08080;    /* DARKER - each item */
    padding: 5px;
    margin: 10px;
}

.courseList > li > strong {
    background-color: #6b4a4a;    /* DARKEST - just the text */
}
```

### Breakdown

| Property | WHAT | WHY here |
|----------|------|----------|
| `list-style-position: inside` | Puts the number/bullet **inside** the list item's content box | Default is `outside` which can overflow. `inside` keeps it neatly contained. |
| `background-color: #d4c4c4` | Light pinkish-grey for the list container | First layer of the 3-shade requirement |
| `padding: 20px` on the list | Creates space between the list edges and the items | Visual breathing room |
| `margin: 10px` on the list | Creates space between the list and its parent aside | Prevents it from touching the edges |
| `background-color: #a08080` on li | Medium shade for each list item | Second layer of shading |
| `background-color: #6b4a4a` on strong | Darkest shade only behind the text | Third layer -- only covers the text area, not the whole li |

### The `>` (Child Combinator)

`.courseList > li` means "select `<li>` elements that are **direct children** of `.courseList`."

This is important because if you had nested lists, `.courseList li` (without `>`) would also select `<li>` elements in sub-lists. The `>` keeps it precise.

**Exam tip -- 3-layer background shading pattern:**
```css
.list       { background-color: #light; }    /* Container */
.list > li  { background-color: #medium; }   /* Each item */
.list > li > span { background-color: #dark; } /* Text only */
```

**How to reuse:** This layered-shading trick works any time you want visual depth in a list -- a leaderboard, a menu, a pricing table. Pick three shades of the same color family (e.g., light green, medium green, dark green) and apply the same pattern. Just swap the selectors to match your HTML:
```css
.menu                { background-color: #d4edda; }  /* light green */
.menu > li           { background-color: #82c991; }  /* medium green */
.menu > li > .label  { background-color: #28a745; color: white; }  /* dark green */
```
The `>` combinator keeps styles precise -- no accidental leaks into nested lists.

---

## 8. Main Content -- Sections

### HTML
```html
<main class="main">
  <section class="C1">
    <h2>Personal Skills and Qualities</h2>
    <ul>
      <li>Determined and detail-oriented...</li>
      <!-- more items -->
    </ul>
  </section>
  <section class="C2">
    <h2>Education</h2>
    <ol>
      <li><strong>Grande Prairie Composite High School</strong>...<br />...</li>
      <li><strong>Northwestern Polytechnic</strong>...<br />...</li>
    </ol>
  </section>
</main>
```

### CSS
```css
.C1 {
    padding: 20px;
    padding-bottom: 60px;
    border: 2px solid black;
    background-color: #b0b0b0;
    border-radius: 8px;
    margin-bottom: 20px;
}

.C2 {
    padding: 20px;
    padding-top: 60px;
    border: 2px solid black;
    background-color: #b0b0b0;
    border-radius: 8px;
}
```

### Breakdown

| Property | WHAT | WHY here |
|----------|------|----------|
| `padding: 20px` then `padding-bottom: 60px` | Sets all padding to 20px, then overrides just the bottom to 60px | Creates extra space at the bottom of Section 1 (more visual separation from Section 2) |
| `padding-top: 60px` (on C2) | Extra space at top of Section 2 | Creates visual gap between sections |
| `border: 2px solid black` | Thin black border around each section | Visually separates sections from each other and from the grey background |
| `border-radius: 8px` | Rounds the section corners | Consistent with the rounded-corner design throughout |
| `margin-bottom: 20px` (on C1) | Space below Section 1 | Separates the two sections |

### `<ul>` vs `<ol>` Usage

- **`<ul>` (unordered list)** -- used for Skills (no meaningful order)
- **`<ol>` (ordered list)** -- used for Education (chronological order matters)
- **`<br />`** -- line break within a list item to separate school name, degree, and date without creating new list items

**Exam tip:** Use `<ol>` when the order matters (steps, timeline, rankings). Use `<ul>` when order is arbitrary.

**How to reuse:** This "two styled sections inside main" pattern works for any content area that has distinct topics. Want a project page with "About" and "Team" sections? Same approach:
```html
<main>
  <section class="about">
    <h2>About the Project</h2>
    <p>...</p>
  </section>
  <section class="team">
    <h2>Our Team</h2>
    <ol>
      <li>...</li>
    </ol>
  </section>
</main>
```
```css
.about, .team {
    padding: 20px;
    border: 2px solid black;
    background-color: #b0b0b0;
    border-radius: 8px;
    margin-bottom: 20px;
}
```
Use extra `padding-top` / `padding-bottom` to visually separate sections when `margin` alone isn't enough.

---

## 9. Right Sidebar -- Aside3 (To-Do List)

This is the most complex CSS section. The assignment requires:
- Even/odd rows in different blue shades
- Completed items: grey background, check icon, strikethrough text
- Unchecked items: toDo.png icon
- Red cross character

### HTML
```html
<aside class="aside3">
  <div class="todo">
    <h3>My To Do List</h3>
    <ul class="todoList">
      <li class="done"><span>Complete CS3990 Assignment 1</span> &#10008;</li>
      <li><span>Study for Calculus IV exam</span> &#10008;</li>
      <li class="done"><span>Finish Web Development project</span> &#10008;</li>
      <li><span>Read Psychology chapter 5</span> &#10008;</li>
      <!-- more items... -->
    </ul>
  </div>
  <!-- IMG2 (fixed building photo) below -->
</aside>
```

### CSS
```css
.todo {
    border-radius: 8px;
    border: 5px solid black;
    display: block;
    margin: 20px auto 0 auto;
    width: 80%;
    height: 600px;
    background-color: #d4c4c4;
}

.todoList {
    list-style: none;
    padding: 10px;
}

.todoList > li {
    padding: 10px;
    padding-left: 40px;
    background-image: url('Images/toDo.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
}

.todoList > li:nth-child(odd) {
    background-color: #a8d4f0;
}

.todoList > li:nth-child(even) {
    background-color: #7ec8e3;
}

.todoList > li.done {
    background-color: grey;
    background-image: url('Images/done.png');
}

.todoList > li.done span {
    text-decoration: line-through;
}
```

### Breakdown -- Every Property

| Property | WHAT | WHY here |
|----------|------|----------|
| `list-style: none` | Removes default bullet points | We are using custom icons (images) instead of bullets |
| `padding-left: 40px` | Extra left padding | Creates space for the background icon so text doesn't overlap it |
| `background-image: url('Images/toDo.png')` | Sets a small icon as the background of each `<li>` | Custom "unchecked" checkbox icon. Uses background-image instead of `<img>` for styling flexibility |
| `background-repeat: no-repeat` | Prevents the image from tiling/repeating | Without this, the tiny icon would tile across the whole li |
| `background-position: 10px center` | Places the icon 10px from the left, centered vertically | Positions the checkbox icon neatly |
| `background-size: 20px` | Scales the icon to 20x20px | Keeps the icon small and consistent |
| `:nth-child(odd)` | Selects 1st, 3rd, 5th... items | Lighter blue shade for odd rows |
| `:nth-child(even)` | Selects 2nd, 4th, 6th... items | Darker blue shade for even rows |
| `.done` class override | When an item has class="done" | Overrides the blue with grey, swaps icon to done.png |
| `text-decoration: line-through` | Draws a line through the text | Visual indicator that the task is completed |
| `&#10008;` | HTML entity for a cross mark character | The red X shown after each item |

### Specificity Note (Important!)

`.todoList > li.done` is **more specific** than `.todoList > li:nth-child(odd)` because class selectors (.done) add specificity. This means the grey background of `.done` correctly overrides the blue of `:nth-child`.

If you ever find that your `.done` style isn't working, it is probably a specificity issue. More specific selectors win.

**Exam tip -- custom list icons pattern:**
```css
ul { list-style: none; }
ul li {
    padding-left: 40px;
    background-image: url('icon.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
}
```

**Exam tip -- alternating row colors:**
```css
li:nth-child(odd)  { background-color: #lighter; }
li:nth-child(even) { background-color: #darker; }
```

**How to reuse:** This to-do list pattern is perfect for any checklist, task tracker, or status list. The key pieces you can mix and match:
- **Custom icons via `background-image`** -- swap `toDo.png`/`done.png` for any icons (star, arrow, warning, etc.)
- **Alternating row colors** -- works on `<tr>` in tables too: `tr:nth-child(odd)` / `tr:nth-child(even)`
- **Completed state** -- add a `.done` class to toggle grey background + strikethrough + different icon

Example for a shopping list:
```css
.shopping > li {
    padding-left: 40px;
    background-image: url('cart-icon.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
}
.shopping > li.bought {
    background-image: url('checkmark.png');
    background-color: #ccc;
}
.shopping > li.bought span {
    text-decoration: line-through;
}
```

---

## 10. Fixed Image (IMG2)

### The Assignment Requirement
> "IMG2 -- one more photo of NWP building (works as a link to https://www.nwpolytech.ca/) implemented as a fixed block (rounded)"

### HTML
```html
<a href="https://www.nwpolytech.ca/" title="Northwestern Polytechnic Building 2"
   target="_blank">
  <img class="NwpBuilding2" src="Images/NwpBulding2.png"
       height="250" width="250" alt="NwpBuilding2" />
</a>
```

### CSS
```css
.NwpBuilding2 {
    border-radius: 200px;
    border: 3px solid black;
    position: fixed;
    bottom: 180px;
    right: 70px;
}
```

### Breakdown

| Property | WHAT | WHY here |
|----------|------|----------|
| `position: fixed` | Element is positioned relative to the **viewport** (browser window) | The image stays in the same spot even when you scroll -- it never moves. Assignment requirement. |
| `bottom: 180px` | 180px from the bottom of the viewport | Positions it above the fixed footer |
| `right: 70px` | 70px from the right edge of the viewport | Positions it on the right side |
| `border-radius: 200px` | Makes the image circular | When border-radius >= half the width/height, a square becomes a circle. 200px on a 250px image makes it nearly circular. Assignment says "rounded." |
| `border: 3px solid black` | Thin black border | Visual outline around the circular image |

**Exam tip -- making an image circular:**
```css
img.circle {
    border-radius: 50%;  /* 50% always makes a perfect circle */
    /* or use a value >= half the width */
}
```

**Exam tip -- wrapping an image in a link:**
```html
<a href="https://example.com">
  <img src="photo.png" alt="description" />
</a>
```
The entire image becomes clickable.

**How to reuse:** Any time you need a floating badge, logo, or "back to top" button that stays pinned on screen, use this pattern:
```css
.floating-badge {
    position: fixed;
    bottom: 20px;     /* distance from bottom */
    right: 20px;      /* distance from right */
    border-radius: 50%;  /* circular */
    border: 3px solid black;
}
```
Change `bottom`/`right` to `top`/`left` to pin it elsewhere. Wrap it in an `<a>` tag if you want it clickable. This is exactly how "chat with us" bubbles and floating action buttons work on real websites.

---

## 11. Footer -- Fixed + Columns + Social Icons

### The Assignment Requirement
- Footer is **fixed** to the bottom
- 2 columns of links (floated left)
- 3 social media icons that are **grayscale** by default, become **colored** on hover
- Links become underlined on hover

### HTML
```html
<footer class="footer">
  <div class="footerLinks">
    <div class="footerCol">
      <a href="..." target="_blank" class="footerLink">CS in NWP</a>
      <a href="..." target="_blank" class="footerLink">Faculty&amp;Staff</a>
    </div>
    <div class="footerCol">
      <a href="..." target="_blank" class="footerLink">NWP Home</a>
      <a href="..." target="_blank" class="footerLink">GitHub</a>
    </div>
  </div>
  <div class="socialMedia">
    <a href="..." target="_blank" class="socialLinks facebook" title="Facebook"></a>
    <a href="..." target="_blank" class="socialLinks instagram" title="Instagram"></a>
    <a href="..." target="_blank" class="socialLinks youtube" title="YouTube"></a>
  </div>
</footer>
```

### CSS
```css
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: grey;
    color: white;
    padding: 25px;
}

.footerCol {
    float: left;
    margin-right: 30px;
}

.footerCol a {
    display: block;
    color: white;
    text-decoration: none;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #e76f51;
    border-radius: 8px;
    font-weight: bold;
}

.footerCol a:hover {
    text-decoration: underline;
    color: black;
    background-color: #f4a261;
}

.socialMedia {
    margin-right: 100px;
    float: right;
}

.socialLinks {
    display: inline-block;
    width: 125px;
    height: 125px;
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
}

.facebook  { background-image: url('Images/faceBook.png'); }
.instagram { background-image: url('Images/instagram.png'); }
.youtube   { background-image: url('Images/yt.png'); }

.socialLinks:hover {
    filter: grayscale(0%);
}
```

### Breakdown -- Footer Positioning

| Property | WHAT | WHY here |
|----------|------|----------|
| `position: fixed` | Locks the footer relative to the viewport | Footer stays visible at the bottom no matter how far you scroll |
| `bottom: 0; left: 0;` | Pins it to the bottom-left corner | Combined with `width: 100%`, it spans the full bottom |
| `width: 100%` | Full viewport width | Footer stretches across the entire screen |

### Breakdown -- Footer Link Columns

| Property | WHAT | WHY here |
|----------|------|----------|
| `float: left` (on .footerCol) | Columns sit side by side | Creates the 2-column layout for links |
| `margin-right: 30px` | Space between the two columns | Visual separation |
| `display: block` (on .footerCol a) | Makes each `<a>` a block element | By default `<a>` is inline. `display: block` makes each link take its own full-width line, stacking vertically |
| `text-decoration: underline` (on hover) | Underlines the link on hover | Assignment requirement |

### Breakdown -- Social Media Icons (The Cool Part)

The social media icons are **empty `<a>` tags** styled entirely with CSS background images:

| Property | WHAT | WHY here |
|----------|------|----------|
| `display: inline-block` | Makes the empty `<a>` visible with a width/height | Inline elements have no dimensions unless they have content. `inline-block` lets us set width/height while keeping them on one line. |
| `width: 125px; height: 125px` | Gives each icon a 125x125 box | Defines the clickable area and visible size |
| `background-image: url(...)` | Different image for each platform | Each class (facebook, instagram, youtube) loads a different icon |
| `background-size: cover` | Scales the image to cover the entire element | Ensures the icon fills the 125x125 box without distortion |
| `background-position: center` | Centers the background image | If the image aspect ratio differs, it crops from the center |
| `filter: grayscale(100%)` | Makes the image completely grey | Default state: social icons appear in greyscale |
| `filter: grayscale(0%)` (on hover) | Removes the grey filter | Hover state: icons become full color. This is the assignment's "become colored on hover" requirement |

**Exam tip -- grayscale hover effect pattern:**
```css
.icon {
    filter: grayscale(100%);       /* grey by default */
    transition: filter 0.3s ease;  /* optional: smooth transition */
}
.icon:hover {
    filter: grayscale(0%);         /* full color on hover */
}
```

**Exam tip -- icon link using background-image:**
```css
a.icon-link {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url('icon.png');
    background-size: cover;
    background-position: center;
}
```
This pattern lets you style a link as a pure image without using an `<img>` tag.

**How to reuse:** Building any site with a footer? This section gives you three reusable pieces:
1. **Fixed footer** -- copy the `.footer` CSS block, change colors/padding to taste.
2. **Footer columns** -- float as many `<div>` columns as you need, stack links with `display: block`.
3. **Social icons with grayscale hover** -- just swap the image URLs for your own platform icons.

```css
/* Reusable fixed footer skeleton */
.my-footer {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 15px;
}
.my-footer .col { float: left; margin-right: 20px; }
.my-footer .col a { display: block; color: white; text-decoration: none; }
.my-footer .col a:hover { text-decoration: underline; }
```
Don't forget the spacer element before the footer so content doesn't hide behind it!

### `&amp;` in HTML

In the footer, `Faculty&amp;Staff` is used instead of `Faculty&Staff`. The `&` character is special in HTML, so you must escape it as `&amp;`. (In the nav, the raw `&` was used which technically should also be escaped.)

---

## 12. The "Fake Footer" Trick

```html
<footer class="FakeFooter"></footer>
<footer class="footer">...</footer>
```

```css
.FakeFooter {
    clear: both;
    height: 375px;
}
```

### WHY This Exists

This is a clever workaround for two problems:

1. **`clear: both`** -- The 3-column layout above uses floats. Floated elements don't affect the normal document flow, so without clearing, the footer would overlap with the columns. `clear: both` says "don't allow any floated elements on either side -- start below all floats."

2. **`height: 375px`** -- The real footer is `position: fixed`, meaning it is removed from the document flow entirely and sits on top of everything. Without this spacer, the bottom of the page content would be hidden behind the fixed footer. The 375px spacer pushes the page content up so nothing gets covered.

**Exam tip -- clearing floats:**
```css
.clearfix {
    clear: both;  /* Forces element below all floats */
}
```

**Exam tip -- spacer for fixed elements:**
If you have a fixed header or footer, add a spacer (margin, padding, or empty element) so page content isn't hidden behind it.

**How to reuse:** Any time you use `position: fixed` on a header or footer, you will need this trick. The spacer height should roughly match the fixed element's height. Got a fixed navbar that is 60px tall? Add a spacer at the top:
```css
.nav-spacer {
    height: 60px; /* same as your fixed navbar height */
}
```
```html
<nav class="fixed-nav">...</nav>
<div class="nav-spacer"></div>  <!-- pushes content below the navbar -->
<main>...</main>
```
Same idea works for fixed footers -- put the spacer right before the footer. If you have float-based columns above it, combine `clear: both` with the height.

---

## 13. All Selectors Used -- Cheat Sheet

| Selector | Type | Example from Code | What it Selects |
|----------|------|-------------------|-----------------|
| `.header` | Class | `.header { ... }` | Any element with `class="header"` |
| `.profile` | Class | `.profile { ... }` | The profile image |
| `.menuButton:hover` | Class + Pseudo-class | `.menuButton:hover { ... }` | A `.menuButton` when the mouse is over it |
| `.courseList > li` | Class + Child combinator | `.courseList > li { ... }` | `<li>` elements that are **direct** children of `.courseList` |
| `.courseList > li > strong` | Chained child combinator | `.courseList > li > strong { ... }` | `<strong>` inside `<li>` inside `.courseList` (all direct) |
| `.todoList > li:nth-child(odd)` | Child + Pseudo-class | `...` | Odd-numbered `<li>` children of `.todoList` |
| `.todoList > li:nth-child(even)` | Child + Pseudo-class | `...` | Even-numbered `<li>` children |
| `.todoList > li.done` | Child + Multi-class | `...` | `<li>` with class `done` that is a direct child of `.todoList` |
| `.todoList > li.done span` | Child + Class + Descendant | `...` | `<span>` inside a `.done` `<li>` inside `.todoList` |
| `.footerCol a` | Descendant | `.footerCol a { ... }` | Any `<a>` nested anywhere inside `.footerCol` |
| `.footerCol a:hover` | Descendant + Pseudo-class | `...` | `<a>` inside `.footerCol` when hovered |
| `.socialLinks:hover` | Class + Pseudo-class | `...` | A `.socialLinks` element when hovered |

### Selector Types Quick Reference

| Type | Syntax | Specificity |
|------|--------|-------------|
| Element | `div`, `p`, `a` | Lowest (0,0,1) |
| Class | `.myClass` | Medium (0,1,0) |
| ID | `#myId` | High (1,0,0) |
| Descendant | `div p` | Selects p anywhere inside div |
| Child | `div > p` | Selects p that is a DIRECT child of div |
| Pseudo-class | `:hover`, `:nth-child()` | Same as class (0,1,0) |

**How to reuse:** When writing a new stylesheet, use this table as a mental checklist. Ask yourself:
- Do I need to select **direct children only**? Use `>` (e.g., `.nav > li` so nested dropdowns aren't affected).
- Do I need **hover effects**? Append `:hover` to the selector.
- Do I need **alternating styles**? Use `:nth-child(odd)` / `:nth-child(even)`.
- Are two rules fighting? The one with higher specificity wins. Add a class or use a more specific selector to break ties -- never resort to `!important` unless you truly have no other option.

---

## 14. All CSS Properties Used -- Master List

Here is every single CSS property used in `styles.css`, organized alphabetically with what it does:

| Property | Values Used | What It Does |
|----------|-------------|--------------|
| `background-color` | `grey`, `#e76f51`, `#f4a261`, `#b0b0b0`, `#d4c4c4`, `#a08080`, `#6b4a4a`, `#a8d4f0`, `#7ec8e3` | Sets the background color of an element |
| `background-image` | `url('Images/toDo.png')`, `url('Images/done.png')`, `url('Images/faceBook.png')`, etc. | Sets an image as the background |
| `background-position` | `10px center`, `center` | Where the background image is placed |
| `background-repeat` | `no-repeat` | Prevents the background image from tiling |
| `background-size` | `20px`, `cover` | Scales the background image (20px = fixed size, cover = fill the element) |
| `border` | `5px solid black`, `2px solid black`, `3px solid black` | Shorthand for border-width, border-style, border-color |
| `border-radius` | `8px`, `200px` | Rounds corners. Higher values = more rounded. >= 50% of width = circle |
| `bottom` | `0`, `180px` | Offset from the bottom (used with position: fixed) |
| `clear` | `both` | Forces element below any floated elements |
| `color` | `white`, `black` | Sets the text color |
| `display` | `block`, `inline-block` | block = full-width box. inline-block = inline but with box properties |
| `filter` | `grayscale(100%)`, `grayscale(0%)` | Applies visual filters. grayscale makes images grey |
| `float` | `left` | Pulls element to the left; siblings flow around it |
| `font-weight` | `bold` | Makes text bold |
| `height` | `260px`, `600px`, `375px`, `125px` | Sets the element's height |
| `left` | `0` | Offset from the left (used with position) |
| `list-style` | `none` | Removes bullets/numbers from a list |
| `list-style-position` | `inside` | Puts list markers inside the content box |
| `margin` | various values, `auto` | Space OUTSIDE the element. `auto` = center horizontally |
| `margin-bottom` | `5px`, `20px` | Space below the element |
| `margin-left` | `10px`, `1%` | Space to the left |
| `margin-right` | `30px`, `100px` | Space to the right |
| `margin-top` | `20px`, `50px`, `40px` | Space above the element |
| `min-height` | `700px`, `660px` | Minimum height; element can grow taller but not shorter |
| `overflow` | `auto` | What happens when content overflows: auto = scrollbar if needed. Also creates a new BFC to contain floats. |
| `padding` | `20px`, `5px`, `10px`, `25px` | Space INSIDE the element (between border and content) |
| `padding-bottom` | `60px` | Space inside, at the bottom |
| `padding-left` | `40px` | Space inside, on the left |
| `padding-top` | `60px` | Space inside, at the top |
| `position` | `sticky`, `fixed` | sticky = scrolls then sticks. fixed = locked to viewport |
| `right` | `70px` | Offset from the right (used with position) |
| `text-align` | `center` | Centers inline content horizontally within a block |
| `text-decoration` | `none`, `underline`, `line-through` | none = no underline. underline = adds line under text. line-through = strikethrough |
| `top` | `20px` | Offset from the top (used with position: sticky) |
| `width` | `20%`, `55.9%`, `95%`, `80%`, `100%`, `125px`, `175px` | Sets element width. % = relative to parent. px = fixed |

**How to reuse:** Treat this table as a lookup reference. When you are building a new page and think "how do I make this image round?" or "how do I remove bullet points?" -- scan this list for the property name and grab the value. Some of the most versatile combos:
- **Round anything:** `border-radius: 8px` (subtle) or `border-radius: 50%` (circle)
- **Remove list bullets:** `list-style: none`
- **Make something stick while scrolling:** `position: sticky; top: Xpx;`
- **Lock something on screen:** `position: fixed; bottom: 0; left: 0; width: 100%;`
- **Greyscale any image:** `filter: grayscale(100%)`

---

## 15. Positioning Deep Dive

This assignment uses three types of positioning. Here is exactly how each one works:

### `position: static` (Default -- Not Explicitly Used)
- The default for every element
- Element flows in normal document order
- `top`, `bottom`, `left`, `right` have NO effect

### `position: sticky` (Used on `.aside1`)
- Element scrolls **normally** with the page
- Once it reaches the specified offset (`top: 20px`), it **sticks** in place
- When you scroll back, it un-sticks and scrolls normally again
- **Important:** sticky only works within its parent container. Once the parent scrolls out of view, the sticky child goes with it
- **Requires `top`, `bottom`, `left`, or `right`** to know where to stick

```css
.sticky-element {
    position: sticky;
    top: 20px;  /* Sticks 20px from the top of viewport */
}
```

### `position: fixed` (Used on `.footer` and `.NwpBuilding2`)
- Element is positioned relative to the **viewport** (browser window)
- It does NOT move when you scroll -- it is always visible
- It is **removed from normal flow** (other elements act like it does not exist)
- This is why the "FakeFooter" spacer is needed -- without it, content hides behind the fixed footer

```css
.fixed-element {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;  /* span the full width */
}
```

### Quick Comparison Table

| Position | Scrolls? | Relative to | In Normal Flow? | Used For |
|----------|----------|-------------|-----------------|----------|
| static | Yes | Normal flow | Yes | Default |
| sticky | Yes, then sticks | Viewport (once stuck) | Yes (until stuck) | Aside1 (building photo) |
| fixed | Never | Viewport | No | Footer, NWP Building 2 image |
| relative | Yes | Its own position | Yes | (Not used here, but offsets from normal position) |
| absolute | Yes (with page) | Nearest positioned ancestor | No | (Not used here) |

**How to reuse:** When choosing a position type for a new element, use this decision tree:
- **"I want it to scroll normally"** -- leave it as `static` (default), no CSS needed.
- **"I want it to scroll, then stick at a certain point"** -- use `sticky` + set `top` (e.g., a sidebar table of contents).
- **"I want it locked on screen no matter what"** -- use `fixed` + set `top`/`bottom`/`left`/`right` (e.g., a cookie banner, floating chat button).
- **"I want to nudge it from where it normally sits"** -- use `relative` + `top`/`left` offsets.
- **"I want to place it exactly inside a positioned parent"** -- use `absolute` on the child + `position: relative` on the parent.

---

## 16. Float Layout Deep Dive

### How Floats Work

1. A floated element is taken out of normal flow and pushed to the left or right
2. Non-floated siblings flow around it (text wraps around floated elements)
3. Block-level siblings ignore the float (they slide under it) unless they also float or clear

### Floats Used in This Assignment

| Element | Float | Purpose |
|---------|-------|---------|
| `.profile` | `float: left` | Image floats left in header, text flows beside it |
| `.sideBarLeft` | `float: left` | Left column of 3-column layout |
| `.main` | `float: left` | Center column |
| `.aside3` | `float: left` | Right column |
| `.footerCol` | `float: left` | Footer link columns side by side |
| `.socialMedia` | `float: right` | Social icons pushed to the right side of footer |

### Common Float Problems and Solutions

**Problem 1: Parent collapses (height becomes 0)**
```css
/* Solution: overflow on parent */
.parent { overflow: auto; }
```

**Problem 2: Next section overlaps with floated content**
```css
/* Solution: clear on the next element */
.next-section { clear: both; }
```

**Problem 3: Columns wrap to next line**
Make sure total widths + margins do not exceed 100%. Use slightly less than expected:
```
20% + 1% + 55.9% + 1% + 20% = 97.9%  /* leaves 2.1% buffer */
```

**How to reuse:** Every float layout you build will hit one of these three problems. Keep these solutions in your back pocket:
```css
/* TEMPLATE: safe float layout with all problems pre-solved */
.wrapper {
    overflow: auto;          /* Problem 1: contain the floats */
}
.col-a { float: left; width: 30%; }
.col-b { float: left; width: 68%; margin-left: 2%; }
/* 30 + 2 + 68 = 100% -- no buffer, risky! Use 67% to be safe */
.after-columns {
    clear: both;             /* Problem 2: don't overlap */
}
```
When in doubt: add `overflow: auto` on the parent, `clear: both` on the next sibling, and keep total widths under 98%.

---

## 17. Pseudo-Classes Deep Dive

### `:hover`
Activates when the user's mouse is over the element.

Used on:
- `.menuButton:hover` -- changes button color
- `.footerCol a:hover` -- underlines link and changes color
- `.socialLinks:hover` -- removes grayscale filter

```css
.element:hover {
    /* styles applied only while hovering */
}
```

### `:nth-child(odd)` and `:nth-child(even)`
Selects elements based on their position among siblings.

- `odd` = 1st, 3rd, 5th... (same as `2n+1`)
- `even` = 2nd, 4th, 6th... (same as `2n`)

Used for alternating row colors in the to-do list:
```css
li:nth-child(odd)  { background-color: #a8d4f0; }  /* lighter blue */
li:nth-child(even) { background-color: #7ec8e3; }  /* darker blue */
```

### Other Useful nth-child Patterns (for exam)

```css
:nth-child(3)       /* Only the 3rd child */
:nth-child(3n)      /* Every 3rd child: 3, 6, 9... */
:nth-child(n+4)     /* From 4th child onwards */
:nth-child(-n+3)    /* First 3 children only */
```

**How to reuse:** Pseudo-classes show up everywhere. Here are some real-world combos you can steal:
```css
/* Zebra-stripe a table */
table tr:nth-child(even) { background-color: #f2f2f2; }

/* Highlight a link when hovered */
a:hover { color: red; text-decoration: underline; }

/* Style only the first item in a list differently */
ul li:nth-child(1) { font-weight: bold; font-size: 1.2em; }

/* Grey out everything after the 5th item */
li:nth-child(n+6) { color: grey; }
```
The key insight: `:hover` changes appearance on interaction, `:nth-child()` changes appearance based on position. You can combine them too -- `li:nth-child(odd):hover` applies only when hovering over an odd item.

---

## 18. Quick Copy Patterns

These are the most reusable code blocks from this assignment. Copy these directly if you see a similar requirement on the exam.

**How to reuse:** Each pattern below is self-contained. Find the one that matches what you need, copy it, and change the class names, colors, and values to fit your situation. They are designed to work independently -- mix and match as needed.

### Pattern 1: Float-Based Multi-Column Layout
```css
/* Parent wrapper */
.columns { overflow: auto; }

/* Columns - widths must total <= 100% */
.col-left   { float: left; width: 20%; }
.col-center { float: left; width: 58%; margin-left: 1%; }
.col-right  { float: left; width: 20%; margin-left: 1%; }

/* Clearfix after columns */
.clear { clear: both; }
```

### Pattern 2: Fixed Footer
```css
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: grey;
    padding: 20px;
}
/* IMPORTANT: Add a spacer element before the footer */
.spacer {
    clear: both;
    height: 200px; /* match footer height + some buffer */
}
```

### Pattern 3: Sticky Element
```css
.sticky-sidebar {
    position: sticky;
    top: 20px; /* distance from top when stuck */
}
```

### Pattern 4: Links Styled as Buttons
```css
a.btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #e76f51;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
}
a.btn:hover {
    background-color: #f4a261;
    color: black;
}
```

### Pattern 5: Image Floated Left in a Container
```css
.container {
    overflow: auto; /* contain the float! */
}
.container img {
    float: left;
    border: 5px solid black;
}
```

### Pattern 6: Custom List Icons via Background Image
```css
ul.custom { list-style: none; }
ul.custom li {
    padding: 10px 10px 10px 40px; /* extra left padding for icon */
    background-image: url('icon.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
}
```

### Pattern 7: Alternating Row Colors
```css
li:nth-child(odd)  { background-color: #lighter; }
li:nth-child(even) { background-color: #darker; }
```

### Pattern 8: Strikethrough for Completed Items
```css
.done span {
    text-decoration: line-through;
}
.done {
    background-color: grey;
}
```

### Pattern 9: Grayscale-to-Color Hover Effect
```css
.icon {
    filter: grayscale(100%);
}
.icon:hover {
    filter: grayscale(0%);
}
```

### Pattern 10: Circular Image
```css
img.circle {
    border-radius: 50%; /* or a value >= half the width */
    border: 3px solid black;
}
```

### Pattern 11: Center a Block Element Horizontally
```css
.centered {
    display: block;
    margin: 0 auto; /* auto left + right = centered */
}
```

### Pattern 12: Social Media Icon Links (No Inner Content)
```css
a.social {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url('icon.png');
    background-size: cover;
    background-position: center;
}
```

### Pattern 13: 3-Layer Background Shading (List)
```css
.list             { background-color: #lightest; padding: 20px; }
.list > li        { background-color: #medium;   padding: 5px; margin: 10px; }
.list > li > span { background-color: #darkest; }
```

### Pattern 14: HTML Special Characters
```html
&#10008;  <!-- Cross mark (X) -->
&amp;     <!-- Ampersand (&) -->
&lt;      <!-- Less than (<) -->
&gt;      <!-- Greater than (>) -->
```

### Pattern 15: Full Page Boilerplate
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Page description" />
    <meta name="author" content="Your Name" />
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>
    <header>...</header>
    <nav>...</nav>
    <div class="columns">
        <aside>...</aside>
        <main>
            <section>...</section>
            <section>...</section>
        </main>
        <aside>...</aside>
    </div>
    <div class="spacer"></div>
    <footer>...</footer>
</body>
</html>
```

---

## Key Concepts to Remember for the Exam

1. **Margin vs Padding**: Margin = space OUTSIDE the border. Padding = space INSIDE the border. Think of it like a picture frame: padding is the mat between the picture and the frame, margin is the wall space between frames.

2. **`float` takes elements out of normal flow**: Other elements act as if the float doesn't exist (they slide under). Use `overflow: auto` on the parent or `clear: both` on the next sibling to fix layout issues.

3. **`position: fixed` is also out of flow**: That's why you need a spacer. The browser doesn't reserve space for fixed elements.

4. **`position: sticky` stays in flow**: Until it reaches the scroll threshold, then it acts like fixed within its parent container.

5. **Specificity order**: inline styles > #id > .class/:pseudo-class > element. When two rules conflict, the more specific one wins.

6. **`display: block` vs `inline-block` vs `inline`**:
   - `block`: takes full width, starts on new line, respects width/height
   - `inline-block`: sits on same line as neighbors, respects width/height
   - `inline`: sits on same line, does NOT respect width/height

7. **`text-align: center`** only works on inline/inline-block children. To center a block element, use `margin: 0 auto`.

8. **`background-image` for icons** is preferred over `<img>` when the image is decorative (not content). It keeps HTML clean and gives you more control over positioning.

9. **Always escape `&` as `&amp;`** in HTML content.

10. **The `>` child combinator** prevents styles from leaking into nested elements. Use it when you only want to target direct children.

**How to reuse:** These 10 rules are universal CSS fundamentals -- they apply to every project, not just this assignment. Before you write any new CSS, do a quick mental pass through this list. Most CSS bugs come from forgetting one of these (especially #2, #3, and #5). Print this list out or keep it open in a tab while you code.

---

Good luck on the midterm!
