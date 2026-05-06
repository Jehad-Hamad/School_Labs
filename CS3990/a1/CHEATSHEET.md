# CS3990 Assignment 1 -- Comprehensive Cheat Sheet

## What This Assignment Was About

This was a **"Student's CV" personal website** built with pure HTML and CSS (no JavaScript). The requirements from `cs3990_A1w2026.pdf` were:

- **3 pages minimum**, linked together with internal links, external links, and anchor links
- **Home page (index.html):** Personal info, contact details, soft skills, education, professional skills
- **Page 2 (page2.html):** Coursework, academic interests, dream career, employer links
- **Page 3 (page3.html):** Hobbies, favorite media (manga, books)
- Every page needs: a `<title>`, favicon, `charset`, `viewport` meta, `description` meta
- Specific CSS formatting rules for images, links, lists, headings, and paragraphs
- Must use tag selectors, class selectors, ID selectors, and grouped selectors

The assignment tested whether you understand **how HTML elements structure content** and **how CSS controls the visual presentation** of that content.

---

## Table of Contents

1. [HTML Head & Meta Tags](#1-html-head--meta-tags)
2. [HTML Body Structure & Semantic Elements](#2-html-body-structure--semantic-elements)
3. [Links -- Internal, External, and Anchors](#3-links----internal-external-and-anchors)
4. [Images](#4-images)
5. [Lists -- Ordered and Unordered](#5-lists----ordered-and-unordered)
6. [Text Elements -- Headings, Paragraphs, Strong, Line Breaks](#6-text-elements----headings-paragraphs-strong-line-breaks)
7. [CSS Selectors -- The Big Four](#7-css-selectors----the-big-four)
8. [CSS Typography -- font-family, font-size, font-style, font-weight, color](#8-css-typography)
9. [CSS Text Layout -- line-height, text-indent, text-align](#9-css-text-layout)
10. [CSS Box Model -- border, padding, margin](#10-css-box-model----border-padding-margin)
11. [CSS Background Images](#11-css-background-images)
12. [CSS Float Layout](#12-css-float-layout)
13. [CSS Display Property](#13-css-display-property)
14. [CSS Decorative Styling -- border-radius, background-color](#14-css-decorative-styling)
15. [Connecting It All -- How Assignment Requirements Map to Code](#15-connecting-it-all)
16. [Quick Copy Patterns](#16-quick-copy-patterns)

---

## 1. HTML Head & Meta Tags

Every single page in the assignment has the same `<head>` structure. The assignment **required** all five of these on every page: title, favicon, charset, viewport, description.

### WHAT each element does

| Element | Purpose |
|---------|---------|
| `<meta charset="UTF-8">` | Tells the browser which character encoding to use. UTF-8 covers basically every language and symbol. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Makes the page scale properly on mobile devices. Without it, mobile browsers zoom out and make everything tiny. |
| `<meta name="description" content="...">` | A short summary of the page for search engines. Shows up in Google results. |
| `<meta name="author" content="...">` | Credits the page author. Not required by browsers, but good metadata. |
| `<title>Page Title</title>` | The text shown in the browser tab. Each page should have a unique, descriptive title. |
| `<link rel="shortcut icon" href="..." type="image/x-icon">` | The favicon -- the tiny icon in the browser tab next to the title. |
| `<link rel="stylesheet" href="styles.css">` | Connects an external CSS file to the HTML page. All 3 pages share one CSS file. |

### WHY this matters

The assignment specifically says "A page title, a favicon, character encoding, setting the viewport, a description of your web page -- must be specified for **each single web page**." If you forget any one of these on any page, you lose marks.

### HOW -- the pattern to reuse

```html
<head>
  <link rel="stylesheet" href="styles.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="DESCRIBE THIS SPECIFIC PAGE HERE" />
  <meta name="author" content="Your Name" />
  <title>Unique Page Title</title>
  <link rel="shortcut icon" href="Favicons/favicon.ico" type="image/x-icon" />
</head>
```

**Exam tip:** If they ask "what goes in `<head>`?", remember the mnemonic: **S-C-V-D-A-T-F** (Stylesheet, Charset, Viewport, Description, Author, Title, Favicon).

---

## 2. HTML Body Structure & Semantic Elements

### The `<body>` tag with a class

Each page's `<body>` has a **different class** to allow page-specific styling:

```html
<body class="Home">    <!-- index.html -->
<body class="Page2">   <!-- page2.html -->
<body class="Page3">   <!-- page3.html -->
```

### WHAT this does

By putting a class on `<body>`, you can write CSS that targets **only one page** while still using a single shared stylesheet. For example:
- `.Home` gets `font-family: 'Courier New'`
- `.Page2` gets `font-family: Georgia` AND a background image
- `.Page3` gets `font-family: 'Times New Roman'`

### WHY this is clever

The assignment requires "different font families for a Home page and 2 others." Instead of making 3 separate CSS files, you put one class on each `<body>` and write 3 rules in the same file. Clean and efficient.

### HOW -- the pattern

```css
/* Give each page its own body class, then style them separately */
.Home {
    font-family: 'Courier New', Courier, monospace;
}
.Page2 {
    font-family: Georgia, serif;
}
.Page3 {
    font-family: 'Times New Roman', serif;
}
```

### The `<div>` element

Used here for anchor targets:

```html
<div id="top"></div>   <!-- invisible anchor at the top -->
<!-- ... all page content ... -->
<div id="bottom"></div> <!-- invisible anchor at the bottom -->
```

**WHAT:** `<div>` is a generic block-level container. It doesn't add any meaning -- it's just a box you can attach IDs/classes to.

**WHY here:** These empty `<div>`s serve as invisible landing spots for the "Go to Top" and "Go to Bottom" anchor links. The `id` attribute gives them a unique name that `href="#top"` and `href="#bottom"` can jump to.

**How to reuse:** Whenever you need an invisible anchor target on a page, drop an empty `<div>` with an `id` wherever you want the user to land:

```html
<div id="contact-section"></div>
<!-- content here -->
<a href="#contact-section">Jump to Contact</a>
```

Works for FAQ pages, long articles, single-page sites -- anywhere you need in-page navigation.

---

## 3. Links -- Internal, External, and Anchors

The assignment requires **three types of links**, and at least one must be an **image link**. All links must have **tooltips**.

### 3a. Internal Links (page-to-page navigation)

**WHAT:** Links that go to another HTML file in the same website.

```html
<a href="page2.html" title="Takes you to my Education and Course Work">Page 2</a>
<a href="index.html" title="Back to Home Page">Home Page</a>
```

**WHY:** This is how you navigate between the 3 pages. The `title` attribute creates a **tooltip** that appears when you hover.

**How to reuse:** For any multi-page site, just swap the filenames and tooltip text:

```html
<a href="about.html" title="Learn more about us">About</a>
<a href="products.html" title="Browse our products">Products</a>
```

### 3b. External Links (to other websites)

**WHAT:** Links that go to a completely different website. Always use `target="_blank"` so they open in a new tab.

```html
<a href="https://www.khanacademy.org/" target="_blank"
   title="Free courses in math, physics, and chemistry">
  Khan Academy
</a>
```

**WHY:** The assignment requires external links to resources, employer pages, etc. `target="_blank"` keeps your site open while the user visits the external link.

**How to reuse:** Any time you link to an outside resource, follow this pattern -- just change the URL, tooltip, and link text:

```html
<a href="https://www.wikipedia.org/" target="_blank"
   title="Opens Wikipedia in a new tab">
  Wikipedia
</a>
```

### 3c. Anchor Links (jump to a spot on the same or different page)

**WHAT:** Links that jump to a specific element identified by its `id` attribute.

**Same page anchors:**
```html
<!-- The link -->
<a href="#bottom" class="TopBottom" title="Takes you to the bottom of the page">
  Go to Bottom
</a>

<!-- The target (somewhere else on the same page) -->
<div id="bottom"></div>
```

**Cross-page anchors (jump to a specific spot on a DIFFERENT page):**
```html
<!-- On page2.html, this jumps to id="media" on page3.html -->
<a href="page3.html#media" title="Jump to Hobbies section on Page 3">Media</a>

<!-- On page3.html, this element has id="media" -->
<h2 id="media">Favorite Media</h2>
```

**WHY:** The assignment table requires specific cross-page anchor navigation:
- Page 1 links to #top and #bottom on itself
- Page 2 links to #top, #bottom on itself AND a specific location on Page 3
- Page 3 links to specific locations on both Page 3 and Page 2

**How to reuse:** Two steps -- (1) put an `id` on the target element, (2) link to it. Works same-page or cross-page:

```html
<!-- Same-page anchor -->
<a href="#faq">Jump to FAQ</a>
...
<h2 id="faq">Frequently Asked Questions</h2>

<!-- Cross-page anchor -->
<a href="services.html#pricing">See Pricing</a>
<!-- On services.html -->
<h2 id="pricing">Pricing</h2>
```

### 3d. Image Links (clicking an image goes somewhere)

**WHAT:** Wrap an `<img>` inside an `<a>` tag.

```html
<a href="https://breakingbad.fandom.com/wiki/White_Residence"
   target="_blank" title="I AM THE DANGER">
  <img class="House" src="Images/WWHouse.JPG" height="275" width="300" alt="WWHouse" />
</a>
```

**WHY:** The assignment says "at least one [link] is an image." This turns the house photo into a clickable link.

**How to reuse:** Wrap any `<img>` in an `<a>` to make it clickable. Works for logos, thumbnails, galleries -- anything:

```html
<a href="https://yoursite.com" target="_blank" title="Visit our homepage">
  <img class="Logo" src="Images/logo.png" height="80" width="200" alt="Company Logo" />
</a>
```

### CSS for Links

```css
/* All links get the same font family (assignment requirement) */
a {
    font-family: Arial, Helvetica, sans-serif;
}

/* Top/Bottom navigation links styled as buttons (assignment requirement) */
.TopBottom {
    color: white;
    padding: 3px;
    background-color: black;
    border-radius: 3px;
    font-weight: bold;
}
```

**WHY the TopBottom class:**
- `color: white` + `background-color: black` = high contrast, button-like appearance
- `padding: 3px` = space between text and the background edge
- `border-radius: 3px` = slightly rounded corners (makes it look like a button)
- `font-weight: bold` = assignment says Top/Bottom links must be bold

**Exam tip:** The assignment says "All anchors are implemented via list items (look like buttons)." That's why the Top/Bottom links are inside `<ul><li>` elements and styled with background color + padding + border-radius.

**How to reuse:** To make any link look like a button, give it a class with `background-color`, `color`, `padding`, and `border-radius`. Then change the colors/sizing to match your design:

```css
.btn-nav {
    color: #fff;
    background-color: #333;
    padding: 6px 12px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
}
```

```html
<a href="#section" class="btn-nav" title="Jump somewhere">Go</a>
```

---

## 4. Images

### Assignment requirements for images:
- Minimum 3 images per page
- All images have a **3px border with different colors**
- Profile photo **floats left**
- All images have **different sizes**
- At least one image is a **link**

### HTML Image Pattern

```html
<img class="Profile" src="Images/Profile.JPG" height="300" width="300" alt="Profile picture" />
```

**Key attributes:**
| Attribute | What it does |
|-----------|-------------|
| `class` | Lets CSS target this specific image for styling |
| `src` | Path to the image file (relative path here) |
| `height` / `width` | Sets the display size in pixels (inline, on the HTML element) |
| `alt` | Text description shown if image fails to load, also used by screen readers |

### CSS for Images -- Borders

Every image class gets its own colored border:

```css
.Profile    { border: 3px solid black;  float: left; }
.House      { border: 3px solid red; }
.School     { border: 3px solid blue; }
.CourseLoad { border: 3px solid purple; }
.SmartPeople{ border: 3px solid orange; }
.Work       { border: 3px solid green; }
.Wings      { border: 3px solid teal; }
.MonsterManga { border: 3px solid maroon; }
.ThePrince  { border: 3px solid navy; }
```

**WHAT:** `border: 3px solid COLOR` is a **shorthand property** that sets three things at once:
- `border-width: 3px` -- thickness
- `border-style: solid` -- a continuous line (other options: dashed, dotted, double, none)
- `border-color: COLOR` -- the color of the line

**WHY different colors:** The assignment explicitly says "different colors" for each image border.

**How to reuse:** For any project with multiple images, give each a class and assign a different border color. The pattern is always `border: Xpx STYLE COLOR`:

```css
.TeamPhoto  { border: 2px solid steelblue; }
.ProductImg { border: 2px dashed orange; }
.HeroShot   { border: 4px double gold; }
```

### CSS for Image Display

```css
.House, .School, .Work {
    display: block;
    margin-top: 10px;
}
```

**WHAT:** Images are **inline** by default (they sit on the same line as text). `display: block` forces them onto their own line, and `margin-top: 10px` adds breathing room above them.

**WHY:** Some images (House, School, Work) need to appear on their own line below text, not crammed next to it.

**How to reuse:** Whenever an inline element (like `<img>`) stubbornly sits next to text and you want it on its own line, slap `display: block` on it:

```css
.standalone-img {
    display: block;
    margin-top: 15px;
    margin-bottom: 15px;
}
```

---

## 5. Lists -- Ordered and Unordered

### Ordered Lists `<ol>`

```html
<ol>
  <li><strong>Grande Prairie Composite High School</strong>, Grande Prairie, Alberta<br />
    High School Diploma<br />
    Graduated: 2022
  </li>
  <li>...</li>
</ol>
```

**CSS for ordered lists:**
```css
ol {
    list-style-type: lower-alpha;  /* a, b, c instead of 1, 2, 3 */
    text-align: justify;           /* stretches text to fill the full width */
}
```

**WHY `lower-alpha`:** The assignment says "marker - lowercase letters." So instead of 1, 2, 3 you get a, b, c.

**WHY `text-align: justify`:** The assignment says "Alignment - in width." Justify stretches each line so both the left AND right edges are straight (like a newspaper column).

**How to reuse:** Change the `list-style-type` to whatever marker you need. Common options: `decimal` (1,2,3), `upper-roman` (I,II,III), `lower-alpha` (a,b,c), `disc`, `circle`, `square`, `none`. Swap the alignment too if you don't want justify:

```css
ol {
    list-style-type: upper-roman;
    text-align: left;
}
```

### Unordered Lists `<ul>`

```html
<ul>
  <li>Determined and detail-oriented: ...</li>
  <li>Adaptable team player: ...</li>
</ul>
```

**CSS for unordered lists:**
```css
ul {
    text-align: justify;
}
```

The default bullet style is `disc` (filled circle). In the HTML, there's also `<ul type="disc">` which explicitly sets it -- this is the HTML attribute approach (vs. using CSS `list-style-type`).

**How to reuse:** For a clean unordered list with custom bullets (or no bullets), just change the `list-style-type`:

```css
ul {
    list-style-type: square;   /* or circle, none, etc. */
    text-align: left;
}
```

If you want to remove bullets entirely (common for nav menus), use `list-style-type: none` and add `padding: 0` to kill the default indent.

### Lists Used for Navigation (Button-Style Anchors)

```html
<ul>
  <li>
    <a href="#bottom" class="TopBottom" title="Takes you to the bottom of the page">
      Go to Bottom
    </a>
  </li>
</ul>
```

**WHY in a list?** The assignment says "All anchors are implemented via list items." The `<li>` gives structure, and the `.TopBottom` CSS class makes the link look like a button.

**How to reuse:** This is a super common pattern for navigation bars. Put your nav links in a `<ul>`, style them as buttons, and optionally make them horizontal with `display: inline` or flexbox:

```html
<ul style="list-style-type: none; padding: 0;">
  <li><a href="#about" class="nav-btn">About</a></li>
  <li><a href="#contact" class="nav-btn">Contact</a></li>
</ul>
```

---

## 6. Text Elements -- Headings, Paragraphs, Strong, Line Breaks

### Headings: `<h1>`, `<h2>`, `<h3>`

Each page uses one `<h1>` (main title), multiple `<h2>`s (section headings), and `<h3>`s (subsection headings).

**Assignment CSS requirements and how they were met:**

```css
/* All h2 elements must be italic */
h2 {
    font-style: italic;
}

/* All h3 elements must have a background color */
h3 {
    background-color: antiquewhite;
}

/* On Page 3 specifically, h3 must be non-bold ("non-fat") */
.Page3 h3 {
    font-weight: normal;
}

/* All headings get consistent spacing */
h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}
```

**Key concepts:**

- `font-style: italic` -- makes text slanted. Values: `normal`, `italic`, `oblique`.
- `font-weight: normal` -- removes bold. Headings are bold by default, so `normal` explicitly un-bolds them. The assignment calls this "non-fat" for Page 3's h3s.
- `background-color: antiquewhite` -- puts a colored background behind the heading text. This is a **named color** (CSS has ~140 named colors).
- `.Page3 h3` -- this is a **descendant combinator selector**. It means "any `<h3>` that is inside an element with class `Page3`." It only affects h3s on Page 3, not on other pages.

**How to reuse:** Use this pattern whenever you need page-specific heading styles. The key idea is the descendant selector -- `.BodyClass headingTag`:

```css
/* Make all h2s underlined on the Blog page only */
.Blog h2 {
    text-decoration: underline;
}

/* Different background for h3s on the Portfolio page */
.Portfolio h3 {
    background-color: lavender;
    font-weight: bold;
}
```

### Headings with IDs (for anchor links)

```html
<h2 id="career">Dream Career</h2>
<h2 id="hobbies">My Hobbies</h2>
<h2 id="media">Favorite Media</h2>
<h3 id="books">Favorite Book</h3>
<h3 id="employers">Dream Employers</h3>
```

These IDs serve double duty:
1. They are **anchor targets** (other pages link to them with `page2.html#career`)
2. They can be **styled individually** with ID selectors in CSS

**CSS for specific heading IDs:**
```css
#career {
    color: darkslategray;
    border-left: 4px solid gold;
    padding-left: 10px;
}

#hobbies {
    color: darkolivegreen;
    border-left: 4px solid coral;
    padding-left: 10px;
}
```

**WHAT:** A colored left border + padding creates a visual "accent bar" effect on the left side of the heading.

**WHY:** This is an ID selector requirement fulfillment AND a way to visually distinguish important section headings.

**How to reuse:** The "accent bar" trick works on any element. Change the border side, color, and thickness to suit your design:

```css
#important-notice {
    border-left: 5px solid crimson;
    padding-left: 12px;
    color: #333;
}

#success-message {
    border-left: 4px solid limegreen;
    padding-left: 10px;
}
```

Also handy for blockquotes, callout boxes, or any content you want to visually highlight.

### Paragraphs `<p>`

The assignment has very specific paragraph requirements:

```css
/* ALL paragraphs get 30px line spacing and 30px indent ("red line") */
p {
    line-height: 30px;
    text-indent: 30px;
}

/* The 2nd paragraph on each page must NOT have the indent */
.no-indent {
    text-indent: 0;
}
```

**WHAT each property does:**
- `line-height: 30px` -- the vertical space between lines of text within a paragraph. Assignment says "line spacing for paragraphs at 30px."
- `text-indent: 30px` -- indents only the FIRST line of the paragraph (like pressing Tab). The assignment calls this "a red line" (this is a translation from Russian -- "krasnaya stroka" means "first-line indent").

**WHY `.no-indent`:** The assignment says "for the 2nd paragraph of each page - remove the red line." So the second `<p>` on each page gets `class="no-indent"` to override the default indent.

### Paragraph Style Variants

The assignment requires "different sizes, colors and font types" for paragraphs. Three style classes handle this:

```css
.p-style1 {
    color: darkblue;
    font-size: 16px;
    font-family: Georgia, serif;
}

.p-style2 {
    color: darkgreen;
    font-size: 14px;
    font-family: Verdana, sans-serif;
}

.p-style3 {
    color: darkred;
    font-size: 15px;
    font-family: 'Times New Roman', serif;
}
```

**WHAT:** Each class gives paragraphs a different combination of color, size, and font.

**WHY:** Demonstrates that you can apply multiple different visual styles to the same HTML element type by using different classes.

**HOW these are applied in HTML:**
```html
<p class="p-style1">First paragraph on this page...</p>
<p class="no-indent">Second paragraph (no indent, per assignment rules)...</p>
<p class="p-style2">Third paragraph with a different style...</p>
<p class="p-style3">Fourth paragraph with yet another style...</p>
```

**Exam tip:** Notice that `no-indent` is used for the 2nd `<p>` on every page. This is a consistent pattern across all three HTML files.

**How to reuse:** The "base rule + override class" pattern is incredibly useful. Set a default with the tag selector, then create a class to cancel or change it for specific cases:

```css
/* Base: all paragraphs get an indent */
p { text-indent: 40px; }

/* Override: some paragraphs don't */
.flush { text-indent: 0; }

/* Override: some get a bigger indent */
.deep-indent { text-indent: 80px; }
```

### `<strong>` Element

```html
<strong>Grande Prairie Composite High School</strong>
```

**WHAT:** Makes text **bold** (semantically means "strong importance").
**WHY:** Used to highlight school names, course names, hobby titles -- anything that should visually stand out in a list.

**How to reuse:** Use `<strong>` any time a word or phrase carries extra importance. Don't use it just for visual bolding -- that's what CSS `font-weight: bold` is for. `<strong>` adds semantic meaning (screen readers emphasize it):

```html
<p><strong>Warning:</strong> Do not delete this file.</p>
<li><strong>Python</strong> -- used for data analysis and scripting</li>
```

### `<br />` Line Break

```html
High School Diploma<br />
Graduated: 2022
```

**WHAT:** Forces a line break without starting a new paragraph.
**WHY:** Inside a list item, you sometimes need multiple lines without the extra spacing that a new `<p>` would create. `<br />` is the self-closing form (XHTML style).

**How to reuse:** Use `<br />` for line breaks within a single block element (like an address, a poem, or a multi-line list item). Don't use it to create spacing between sections -- use margin/padding for that:

```html
<p>
  123 Main Street<br />
  Springfield, IL 62701<br />
  United States
</p>
```

---

## 7. CSS Selectors -- The Big Four

The assignment **explicitly requires** you to use all four of these at least once. Know them cold for the exam.

### a) Tag Selector (Element Selector)

Targets ALL elements of a given type. No dot, no hash -- just the tag name.

```css
a {
    font-family: Arial, Helvetica, sans-serif;
}

ol {
    list-style-type: lower-alpha;
    text-align: justify;
}

h2 {
    font-style: italic;
}

h3 {
    background-color: antiquewhite;
}

p {
    line-height: 30px;
    text-indent: 30px;
}

ul {
    text-align: justify;
}
```

**WHEN to use:** When you want EVERY instance of that element to look the same across all pages.

**How to reuse:** Just write the element name, no dot or hash. Good for setting site-wide defaults:

```css
body { margin: 0; font-family: Arial, sans-serif; }
img  { max-width: 100%; }
table { border-collapse: collapse; }
```

### b) Class Selector (`.className`)

Targets elements that have a specific `class` attribute. Uses a dot prefix.

```css
.TopBottom {
    color: white;
    padding: 3px;
    background-color: black;
    border-radius: 3px;
    font-weight: bold;
}

.Profile {
    border: 3px solid black;
    float: left;
}

.no-indent {
    text-indent: 0;
}

.p-style1 { color: darkblue; font-size: 16px; font-family: Georgia, serif; }
.p-style2 { color: darkgreen; font-size: 14px; font-family: Verdana, sans-serif; }
.p-style3 { color: darkred; font-size: 15px; font-family: 'Times New Roman', serif; }

.Home  { font-family: 'Courier New', Courier; }
.Page2 { font-family: Georgia, serif; /* plus background image */ }
.Page3 { font-family: 'Times New Roman', cursive; }
```

**WHEN to use:** When you want to apply a style to SOME elements but not all. Multiple elements can share the same class. One element can have multiple classes.

**Key difference from ID:** Classes are reusable. You can put `class="p-style1"` on as many paragraphs as you want.

**How to reuse:** Classes are your bread and butter. Create a class whenever you have a reusable style. You can even stack multiple classes on one element:

```html
<p class="highlight large-text centered">Special paragraph</p>
```

```css
.highlight  { background-color: yellow; }
.large-text { font-size: 20px; }
.centered   { text-align: center; }
```

### c) ID Selector (`#idName`)

Targets ONE specific element by its unique `id`. Uses a hash prefix.

```css
#top, #bottom {
    display: block;
}

#career {
    color: darkslategray;
    border-left: 4px solid gold;
    padding-left: 10px;
}

#hobbies {
    color: darkolivegreen;
    border-left: 4px solid coral;
    padding-left: 10px;
}
```

**WHEN to use:** When targeting a single, unique element. IDs must be unique within a page -- only one element can have `id="career"`.

**Key difference from class:** IDs have **higher specificity** (they win in style conflicts). But they can only be used once per page.

**How to reuse:** Use IDs for one-of-a-kind elements on a page -- a main header, a sidebar, a footer. If you think you might reuse the style, use a class instead:

```html
<div id="main-nav">...</div>
<footer id="site-footer">...</footer>
```

```css
#main-nav    { background-color: #222; color: white; }
#site-footer { border-top: 2px solid gray; padding: 20px; }
```

### d) Grouping of Selectors (Comma-Separated)

Apply the same styles to multiple selectors at once by separating them with commas.

```css
/* Grouping tag selectors */
h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}

/* Grouping ID selectors */
#top, #bottom {
    display: block;
}

/* Grouping class selectors */
.House, .School, .Work {
    display: block;
    margin-top: 10px;
}
```

**WHEN to use:** Whenever multiple selectors need the exact same style rules. Saves you from duplicating code.

**How to reuse:** Any time you're about to copy-paste the same CSS rule for different selectors, group them instead. You can mix tag, class, and ID selectors in one group:

```css
h1, h2, .section-title, #page-heading {
    font-family: Georgia, serif;
    color: #333;
}
```

### Bonus: Descendant Combinator

```css
.Page3 h3 {
    font-weight: normal;
}
```

This means "select any `<h3>` that is a descendant of (inside) an element with class `.Page3`." The space between `.Page3` and `h3` is the descendant combinator.

**WHY it matters:** This is how you make Page 3's h3s "non-fat" without affecting h3s on other pages.

**How to reuse:** The space between selectors = "inside of." Use it whenever you need to style something only when it appears within a specific parent:

```css
/* Only style links inside the nav */
.navbar a { color: white; text-decoration: none; }

/* Only style paragraphs inside the sidebar */
.sidebar p { font-size: 14px; }

/* Only style images inside the gallery div */
#gallery img { border-radius: 8px; }
```

### Selector Specificity Quick Reference

If two CSS rules conflict, the more specific one wins:

| Selector Type | Specificity Score | Example |
|---------------|-------------------|---------|
| Tag | 0,0,1 | `h2 { }` |
| Class | 0,1,0 | `.Profile { }` |
| ID | 1,0,0 | `#career { }` |
| Grouped | Same as individual | `h1, h2, h3` = each is 0,0,1 |
| Descendant | Sum of parts | `.Page3 h3` = 0,1,1 |

**Higher number wins.** ID beats class beats tag. If tied, the rule that comes LAST in the CSS file wins.

**How to reuse:** When your CSS isn't applying and you're tearing your hair out, check specificity. A quick fix is to make your selector more specific:

```css
/* This won't override #career { color: darkslategray; } */
h2 { color: red; }           /* specificity: 0,0,1 */

/* This WILL override it */
body #career { color: red; }  /* specificity: 0,0,1 + 1,0,0 = 1,0,1 */
```

But don't go overboard -- overly specific selectors become hard to maintain. Keep it simple when you can.

---

## 8. CSS Typography

### `font-family`

```css
.Home  { font-family: 'Courier New', Courier; }         /* monospace */
.Page2 { font-family: Georgia, serif; }                  /* serif */
.Page3 { font-family: 'Times New Roman', cursive; }      /* serif */
a      { font-family: Arial, Helvetica, sans-serif; }    /* sans-serif */
```

**WHAT:** Sets the typeface. The comma-separated list is a **fallback chain** -- if the browser doesn't have the first font, it tries the next one.

**WHY different per page:** Assignment requires "different font families for Home page and 2 others."

**Font family categories:**
| Category | Examples | Look |
|----------|----------|------|
| serif | Georgia, Times New Roman | Has little feet/decorations on letters |
| sans-serif | Arial, Helvetica, Verdana | Clean, no decorations |
| monospace | Courier New, Courier | Every letter is the same width |
| cursive | (used as fallback) | Handwriting-style |

**Exam tip:** Always end with a **generic family name** (serif, sans-serif, monospace) as the final fallback.

**How to reuse:** Pick your fonts, list fallbacks, always end with a generic. This pattern works for any project:

```css
body { font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif; }
code { font-family: 'Fira Code', 'Courier New', monospace; }
```

### `font-size`

```css
.p-style1 { font-size: 16px; }
.p-style2 { font-size: 14px; }
.p-style3 { font-size: 15px; }
```

**WHAT:** Controls how big the text is. `px` = pixels (absolute unit).

**How to reuse:** Set different sizes for different content types. Common units are `px` (fixed), `em` (relative to parent), and `rem` (relative to root):

```css
h1 { font-size: 32px; }
h2 { font-size: 24px; }
p  { font-size: 16px; }
.small-print { font-size: 12px; }
```

### `font-style`

```css
h2 { font-style: italic; }
```

**WHAT:** `italic` slants the text. Other values: `normal`, `oblique`.
**WHY:** Assignment says "all h2s - italic."

**How to reuse:** Use `italic` for emphasis, quotes, or captions. Use `normal` to undo inherited italics:

```css
blockquote { font-style: italic; }
.caption    { font-style: italic; color: gray; }
```

### `font-weight`

```css
.TopBottom { font-weight: bold; }
.Page3 h3  { font-weight: normal; }
```

**WHAT:** Controls thickness of text strokes. `bold` = thick, `normal` = default thickness. Can also use numbers (100-900).
**WHY:** Top/Bottom links must be bold (assignment). Page 3 h3s must be "non-fat" (normal weight removes the default bold from headings).

**How to reuse:** Use `bold` or numeric values for emphasis. Use `normal` to un-bold elements that are bold by default (like headings):

```css
.important { font-weight: bold; }      /* or font-weight: 700; */
.light-heading { font-weight: 300; }   /* thin/light text */
h4 { font-weight: normal; }            /* remove default bold */
```

### `color`

```css
.TopBottom  { color: white; }
.p-style1   { color: darkblue; }
.p-style2   { color: darkgreen; }
.p-style3   { color: darkred; }
#career     { color: darkslategray; }
#hobbies    { color: darkolivegreen; }
```

**WHAT:** Sets the **text** color (NOT the background). CSS has ~140 named colors, or you can use hex (`#FF0000`), rgb (`rgb(255,0,0)`), etc.

**How to reuse:** Named colors are easy to read, but hex/rgb give you more control. Pick whichever fits:

```css
.error   { color: #e74c3c; }           /* hex */
.success { color: rgb(46, 204, 113); }  /* rgb */
.muted   { color: gray; }              /* named */
```

---

## 9. CSS Text Layout

### `line-height`

```css
p {
    line-height: 30px;
}
```

**WHAT:** The vertical distance between lines of text within an element. Think of it as "line spacing" in a word processor.
**WHY:** Assignment requires "line spacing for paragraphs at 30px."

**How to reuse:** Adjust line-height for readability. A good rule of thumb is 1.5-1.8 for body text. You can use px, em, or just a unitless number (multiplier of font-size):

```css
p    { line-height: 1.6; }    /* 1.6x the font size -- very readable */
h1   { line-height: 1.2; }    /* tighter for headings */
.code { line-height: 24px; }   /* fixed for code blocks */
```

### `text-indent`

```css
p {
    text-indent: 30px;
}

.no-indent {
    text-indent: 0;
}
```

**WHAT:** Indents the FIRST line of a paragraph (like a tab). Only affects the first line.
**WHY:** Assignment requires "a red line in paragraphs 30px" ("red line" = first-line indent in Russian academic terminology). The `.no-indent` class removes it for the 2nd paragraph on each page.

**How to reuse:** Great for book-style or essay-style layouts. You can also use negative values for a "hanging indent" (first line sticks out to the left):

```css
.essay p    { text-indent: 2em; }     /* standard first-line indent */
.hanging    { text-indent: -30px; padding-left: 30px; } /* hanging indent */
```

### `text-align`

```css
ol {
    text-align: justify;
}

ul {
    text-align: justify;
}
```

**WHAT:** Controls horizontal alignment of text content.
**Values:**
- `left` -- default for LTR languages
- `right` -- aligned to the right edge
- `center` -- centered
- `justify` -- stretched so both left and right edges are flush (like a newspaper)

**WHY:** Assignment says "Alignment - in width" for lists, which means `justify`.

**How to reuse:** Pick the alignment that fits your content:

```css
.hero-text  { text-align: center; }   /* centered headlines */
.article    { text-align: justify; }   /* newspaper-style body text */
.price      { text-align: right; }     /* right-aligned numbers */
```

---

## 10. CSS Box Model -- border, padding, margin

Every HTML element is a box. From inside out: **content -> padding -> border -> margin**.

### `border`

```css
.Profile { border: 3px solid black; }
.House   { border: 3px solid red; }
/* ... 9 different image classes, each with different border colors */
```

**WHAT:** `border: width style color` is the shorthand. Individual properties are `border-width`, `border-style`, `border-color`.

**Border on one side only (used for heading accents):**
```css
#career {
    border-left: 4px solid gold;
}
```

This only puts a border on the LEFT side -- creating a colored accent bar.

**How to reuse:** Border shorthand is `border: width style color`. To target one side, use `border-top`, `border-right`, `border-bottom`, or `border-left`:

```css
.card { border: 1px solid #ddd; }           /* all sides */
.underlined { border-bottom: 2px solid black; } /* bottom only */
.sidebar { border-right: 3px dashed gray; }  /* right only */
```

### `padding`

```css
.TopBottom {
    padding: 3px;      /* space between text and the background edge */
}

#career {
    padding-left: 10px; /* space between the left border and the text */
}
```

**WHAT:** Space INSIDE the element, between content and border. Padding is affected by background-color.

**How to reuse:** Padding adds breathing room inside an element. Use shorthand for all sides, or target specific sides:

```css
.card    { padding: 20px; }              /* all sides */
.button  { padding: 8px 16px; }          /* top/bottom 8px, left/right 16px */
.section { padding: 10px 20px 10px 20px; } /* top, right, bottom, left (clockwise) */
```

### `margin`

```css
h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}

.House, .School, .Work {
    margin-top: 10px;
}
```

**WHAT:** Space OUTSIDE the element, between the border and neighboring elements. Margin is transparent (not affected by background-color).

**Exam tip:** Padding = inside breathing room. Margin = outside breathing room. Border sits between them.

**How to reuse:** Margin works the same as padding but pushes other elements away. Use `margin: 0 auto` to center a block element horizontally:

```css
.container { width: 960px; margin: 0 auto; }  /* centered on page */
.spaced    { margin-bottom: 30px; }            /* gap below */
img        { margin: 10px; }                   /* space around images */
```

---

## 11. CSS Background Images

Page 2 has a background image. This is one of the assignment requirements: "One of the pages should have an image as a background."

```css
.Page2 {
    font-family: Georgia, serif;
    background-image: url('Images/bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}
```

### Property-by-property breakdown

| Property | Value | What It Does |
|----------|-------|-------------|
| `background-image` | `url('Images/bg.png')` | Sets the image file to use as background. Path is relative to the CSS file. |
| `background-repeat` | `no-repeat` | Stops the image from tiling/repeating. Default would tile it like wallpaper. |
| `background-position` | `center` | Centers the image both horizontally and vertically in the element. |
| `background-attachment` | `fixed` | The image stays in place when you scroll (parallax-like effect). Default is `scroll` (moves with content). |
| `background-size` | `cover` | Scales the image to cover the entire element, cropping if needed. Maintains aspect ratio. |

### Other `background-size` values to know

| Value | Behavior |
|-------|----------|
| `cover` | Fills the entire area, crops excess (no gaps, image may be cut) |
| `contain` | Fits entire image inside, may leave gaps (no cropping) |
| `100% 100%` | Stretches to fill exactly, may distort aspect ratio |
| `auto` | Uses the image's natural size |

**Exam tip:** If they ask "how do you set a full-page background image?", the pattern is: `background-image` + `no-repeat` + `center` + `fixed` + `cover`.

**How to reuse:** This five-property combo works for any full-page or full-section background. Just swap the image path. You can also use the `background` shorthand to write it all in one line:

```css
/* Longhand (easier to read) */
.hero-section {
    background-image: url('Images/hero.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;   /* or fixed for parallax */
    background-size: cover;
}

/* Shorthand (same thing, one line) */
.hero-section {
    background: url('Images/hero.jpg') no-repeat center / cover;
}
```

---

## 12. CSS Float Layout

```css
.Profile {
    border: 3px solid black;
    float: left;
}
```

### WHAT

`float: left` takes the element out of the normal document flow and pushes it to the LEFT side. Subsequent content (text, other inline elements) wraps around it on the right.

### WHY

Assignment requirement: "A photograph of yourself - float to the left side of the webpage." The profile photo sits on the left, and the "Personal Information" text wraps around it.

### HOW float works conceptually

```
Without float:            With float: left;
+--------+               +--------+  Text wraps
| Image  |               | Image  |  around the
+--------+               | (float)|  image on the
Text starts here          +--------+  right side
below the image.          and continues below
                          when space runs out.
```

### Important float details for exams

- Floated elements are removed from normal flow but still affect inline content (text wraps around them)
- Parent elements may "collapse" if all children are floated (use `overflow: hidden` or a clearfix to fix)
- `float: left`, `float: right`, `float: none` (default)
- To stop wrapping, use `clear: left`, `clear: right`, or `clear: both` on the element that should start below the float

**How to reuse:** Float is handy for wrapping text around images or creating simple side-by-side layouts. Always remember to `clear` when you want content to start below the float:

```html
<img class="sidebar-img" src="photo.jpg" alt="..." />
<p>This text will wrap around the image on the right side.</p>
<div style="clear: both;"></div>
<p>This text starts below the image, no wrapping.</p>
```

```css
.sidebar-img {
    float: left;
    margin-right: 15px;
    margin-bottom: 10px;
}
```

---

## 13. CSS Display Property

```css
#top, #bottom {
    display: block;
}

.House, .School, .Work {
    display: block;
    margin-top: 10px;
}
```

### WHAT

`display` controls HOW an element participates in layout.

| Value | Behavior | Default for |
|-------|----------|-------------|
| `block` | Takes full width, starts on new line | `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>` |
| `inline` | Only takes needed width, stays on same line | `<a>`, `<strong>`, `<img>`, `<span>` |
| `inline-block` | Inline but respects width/height | -- |
| `none` | Hides the element completely | -- |

### WHY

Images (`<img>`) are **inline** by default. Without `display: block`, they'd sit on the same line as surrounding text. Setting `display: block` forces them to their own line.

The `#top` and `#bottom` divs are already block-level by default, but explicitly setting `display: block` ensures they behave as proper anchor targets.

**How to reuse:** The display property is your go-to for controlling element layout behavior. Common scenarios:

```css
/* Make inline elements behave like blocks */
span.tag { display: block; }

/* Make block elements sit side by side */
li { display: inline; }

/* Best of both -- inline but respects width/height */
.badge { display: inline-block; width: 80px; text-align: center; }

/* Hide an element completely (removes it from flow) */
.hidden { display: none; }
```

---

## 14. CSS Decorative Styling

### `border-radius`

```css
.TopBottom {
    border-radius: 3px;
}
```

**WHAT:** Rounds the corners of an element's border/background.
**WHY:** Makes the Top/Bottom navigation links look like rounded buttons instead of sharp rectangles.

**Common values:**
- `3px` -- subtle rounding
- `50%` -- turns a square element into a circle
- `border-radius: 10px 0 0 10px` -- rounds only left corners (top-left, top-right, bottom-right, bottom-left)

**How to reuse:** `border-radius` works on anything with a visible border or background. Some handy patterns:

```css
.pill-button { border-radius: 999px; }          /* fully rounded "pill" shape */
.avatar      { border-radius: 50%; }            /* perfect circle (if square) */
.card        { border-radius: 8px; }            /* modern card look */
.top-rounded { border-radius: 10px 10px 0 0; }  /* only top corners */
```

### `background-color`

```css
h3 {
    background-color: antiquewhite;
}

.TopBottom {
    background-color: black;
}
```

**WHAT:** Fills the background of the element with a solid color. Different from `color` which sets TEXT color.

**How to reuse:** Use `background-color` for highlights, banners, cards, alerts -- anything that needs a colored backdrop:

```css
.alert-warning { background-color: #fff3cd; color: #856404; padding: 10px; }
.highlight      { background-color: yellow; }
.dark-section   { background-color: #222; color: white; }
```

Remember: `color` = text color, `background-color` = fill behind the text. They're independent.

---

## 15. Connecting It All -- How Assignment Requirements Map to Code

Here's a quick reference matching each assignment requirement to the exact code that fulfills it:

| Requirement | How It's Met |
|---|---|
| 3+ pages | `index.html`, `page2.html`, `page3.html` |
| Title, favicon, charset, viewport, description on each page | `<head>` section of each HTML file |
| Links between pages (internal) | `<a href="page2.html">`, `<a href="index.html">` |
| Anchor links to Top/Bottom | `<a href="#top">`, `<a href="#bottom">`, `<div id="top">`, `<div id="bottom">` |
| Cross-page anchors | `<a href="page3.html#media">`, `<a href="page2.html#career">` |
| Image as a link | `<a href="..."><img ...></a>` on House, School, ThePrince images |
| Tooltips on links | `title="..."` on every `<a>` tag |
| 3+ images per page, different sizes, 3px border different colors | Various `<img>` elements + `.ClassName { border: 3px solid COLOR; }` |
| Profile photo floats left | `.Profile { float: left; }` |
| All links same font | `a { font-family: Arial, Helvetica, sans-serif; }` |
| Top/Bottom bold + button-like | `.TopBottom { font-weight: bold; background-color: black; ... }` |
| Anchors in list items | `<ul><li><a class="TopBottom" ...>` |
| Ordered list with lowercase letters | `ol { list-style-type: lower-alpha; }` |
| Lists justified | `ol, ul { text-align: justify; }` |
| h2 italic | `h2 { font-style: italic; }` |
| h3 has background | `h3 { background-color: antiquewhite; }` |
| Different fonts per page | `.Home`, `.Page2`, `.Page3` body classes with different `font-family` |
| Page 3 h3 non-bold | `.Page3 h3 { font-weight: normal; }` |
| 3+ paragraphs per page, different styles | `.p-style1`, `.p-style2`, `.p-style3` classes |
| Line spacing 30px | `p { line-height: 30px; }` |
| First-line indent 30px ("red line") | `p { text-indent: 30px; }` |
| 2nd paragraph no indent | `.no-indent { text-indent: 0; }` |
| Background image on one page | `.Page2 { background-image: url(...); ... }` |
| Tag selector | `a { }`, `ol { }`, `h2 { }`, `h3 { }`, `p { }`, `ul { }` |
| Class selector | `.Profile`, `.TopBottom`, `.p-style1`, `.Home`, etc. |
| ID selector | `#top`, `#bottom`, `#career`, `#hobbies` |
| Grouping selectors | `h1, h2, h3 { }`, `#top, #bottom { }`, `.House, .School, .Work { }` |

---

## 16. Quick Copy Patterns

These are the most reusable code blocks from this assignment. If you see something similar on the exam, grab the pattern and adapt it.

### Pattern 1: Complete HTML Page Skeleton

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Description of this page" />
    <meta name="author" content="Your Name" />
    <title>Page Title</title>
    <link rel="shortcut icon" href="Favicons/favicon.ico" type="image/x-icon" />
  </head>
  <body class="PageName">
    <div id="top"></div>
    <!-- Navigation anchors -->
    <ul>
      <li><a href="#bottom" class="TopBottom" title="Go to bottom">Go to Bottom</a></li>
    </ul>

    <h1>Page Title</h1>

    <!-- Page content here -->

    <div id="bottom"></div>
    <ul>
      <li><a href="#top" class="TopBottom" title="Back to top">Back to Top</a></li>
    </ul>
  </body>
</html>
```

### Pattern 2: Page-Specific Body Fonts + Background Image

```css
.Home  { font-family: 'Courier New', Courier, monospace; }
.Page2 {
    font-family: Georgia, serif;
    background-image: url('Images/bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}
.Page3 { font-family: 'Times New Roman', serif; }
```

### Pattern 3: Image with Colored Border

```html
<img class="MyImage" src="Images/photo.jpg" height="250" width="300" alt="description" />
```

```css
.MyImage {
    border: 3px solid teal;
}
```

### Pattern 4: Image as a Clickable Link

```html
<a href="https://example.com" target="_blank" title="Tooltip text">
  <img class="MyImage" src="Images/photo.jpg" height="250" width="300" alt="description" />
</a>
```

### Pattern 5: Float an Image Left with Text Wrapping

```css
.Profile {
    border: 3px solid black;
    float: left;
}
```

### Pattern 6: Button-Styled Anchor Link Inside a List

```html
<ul>
  <li>
    <a href="#section" class="TopBottom" title="Jump to section">Go to Section</a>
  </li>
</ul>
```

```css
.TopBottom {
    color: white;
    padding: 3px;
    background-color: black;
    border-radius: 3px;
    font-weight: bold;
}
```

### Pattern 7: Cross-Page Anchor Link

```html
<!-- On page2.html, jump to a specific spot on page3.html -->
<a href="page3.html#media" title="Jump to Media section on Page 3">Go to Media</a>

<!-- On page3.html, the target element -->
<h2 id="media">Favorite Media</h2>
```

### Pattern 8: Ordered List with Lowercase Letters, Justified

```html
<ol>
  <li><strong>Item Title</strong> - Description</li>
  <li><strong>Item Title</strong> - Description</li>
</ol>
```

```css
ol {
    list-style-type: lower-alpha;
    text-align: justify;
}
```

### Pattern 9: Paragraphs with Indent + Second-Paragraph Override

```css
p {
    line-height: 30px;
    text-indent: 30px;
}
.no-indent {
    text-indent: 0;
}
```

```html
<p class="p-style1">First paragraph (has 30px indent)...</p>
<p class="no-indent">Second paragraph (indent removed)...</p>
<p class="p-style2">Third paragraph (has 30px indent, different style)...</p>
```

### Pattern 10: Heading with Left Accent Bar (ID Selector)

```html
<h2 id="career">Dream Career</h2>
```

```css
#career {
    color: darkslategray;
    border-left: 4px solid gold;
    padding-left: 10px;
}
```

### Pattern 11: Heading Styles -- Italic, Background, Non-Bold

```css
h2 { font-style: italic; }
h3 { background-color: antiquewhite; }
.Page3 h3 { font-weight: normal; }  /* descendant selector */
```

### Pattern 12: Grouped Selector for Shared Margins

```css
h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}
```

### Pattern 13: Three Paragraph Styles (Different Color, Size, Font)

```css
.p-style1 { color: darkblue;  font-size: 16px; font-family: Georgia, serif; }
.p-style2 { color: darkgreen; font-size: 14px; font-family: Verdana, sans-serif; }
.p-style3 { color: darkred;   font-size: 15px; font-family: 'Times New Roman', serif; }
```

### Pattern 14: Force Inline Images onto Their Own Line

```css
.House, .School, .Work {
    display: block;
    margin-top: 10px;
}
```

---

## Final Exam Tips

1. **Selectors are the #1 thing to know.** If you can look at CSS and immediately identify whether it's a tag, class, ID, or grouped selector, you're golden.

2. **"Red line" = `text-indent`.** This is a translation quirk from the assignment. Don't confuse it with a colored line.

3. **`float` is the only layout technique used here.** No flexbox, no grid, no positioning. Just `float: left` on the profile image. Know what float does and how content wraps around it.

4. **`display: block` vs `display: inline`** -- images are inline by default. If you need an image on its own line, set `display: block`.

5. **Specificity matters.** `.Page3 h3` overrides the general `h3` rule because it has higher specificity (class + tag > tag alone).

6. **Every `<a>` needs a `title` attribute** for the tooltip. Every `<img>` needs an `alt` attribute for accessibility.

7. **External links use `target="_blank"`** to open in a new tab. Internal links and anchors do not.

8. **One shared CSS file, three HTML pages.** Body classes (`.Home`, `.Page2`, `.Page3`) let you write page-specific rules in a single stylesheet.

9. **The five required `<head>` elements:** charset, viewport, description, title, favicon. Miss one and you lose marks.

10. **`background-size: cover`** is how you make a background image fill the whole page without gaps. Pair it with `no-repeat`, `center`, and `fixed`.
