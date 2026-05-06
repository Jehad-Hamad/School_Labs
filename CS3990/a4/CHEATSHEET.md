# CS3990 Assignment 4 -- Comprehensive Cheat Sheet

## What This Assignment Was About

**Assignment 4 (25 points): "CSS Advanced. Using Media Queries"**

You built an "About Canada" landing page with these graded requirements:

- **Layout (10 pts):** A 3-column flexbox layout (left sidebar, center content, right sidebar) that collapses to a single column on mobile. Everything must look correct when scaling/rotating the device.
- **Task 1 (5 pts):** A CSS-only tabbed menu using `:target` (no JavaScript). Tabs use 3D transforms, transitions, and gradients. A map image shows by default and hides when a tab is selected.
- **Task 2 (2 pts):** Province list items use flag images as bullet markers. Hovering a province reveals its area in italics.
- **Task 3 (3 pts):** A dropdown submenu appears on hover over "My Alberta," with sub-items linking to more tab content.
- **Task 4 (5 pts):** Job cards in the right sidebar use a flex-wrap grid (2 columns on desktop, 1 column on mobile). Badges use color-coded labels. On mobile, the footer becomes fixed to the bottom.

---

## Table of Contents

1. [The Universal Reset](#1-the-universal-reset)
2. [Full-Page Flexbox Layout (body)](#2-full-page-flexbox-layout-body)
3. [Header Styling](#3-header-styling)
4. [3-Column Layout with Flexbox](#4-3-column-layout-with-flexbox)
5. [Left Sidebar -- Fact Cards with Hover](#5-left-sidebar--fact-cards-with-hover)
6. [Center Section -- CSS-Only Tabbed Menu](#6-center-section--css-only-tabbed-menu)
7. [Tab Buttons -- Transforms, Transitions, Gradients](#7-tab-buttons--transforms-transitions-gradients)
8. [The :target Trick -- Showing/Hiding Tab Content](#8-the-target-trick--showinghiding-tab-content)
9. [Hiding the Map When a Tab Is Active](#9-hiding-the-map-when-a-tab-is-active)
10. [Province List -- Custom Image Bullets](#10-province-list--custom-image-bullets)
11. [Hover-to-Reveal Hidden Content](#11-hover-to-reveal-hidden-content)
12. [Dropdown Submenu on Hover](#12-dropdown-submenu-on-hover)
13. [Right Sidebar -- Job Cards with Flex Wrap](#13-right-sidebar--job-cards-with-flex-wrap)
14. [Badge System](#14-badge-system)
15. [Footer with Flexbox](#15-footer-with-flexbox)
16. [Responsive Design -- Media Query](#16-responsive-design--media-query)
17. [HTML Elements Reference](#17-html-elements-reference)
18. [Selectors Reference](#18-selectors-reference)
19. [Quick Copy Patterns](#19-quick-copy-patterns)

---

## 1. The Universal Reset

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**WHAT:** The `*` selector targets every single element on the page.

**WHY:**
- `margin: 0; padding: 0;` -- Browsers add default margins/padding to elements like `<h1>`, `<p>`, `<ul>`, `<body>`. This strips all of that so you start from a clean slate.
- `box-sizing: border-box;` -- This is the big one. Normally, if you set `width: 200px` and then add `padding: 10px`, the element becomes 220px wide. With `border-box`, padding and border are *included inside* the width. So 200px means 200px total. This prevents layout-breaking surprises.

**HOW TO REUSE:** Always put this at the top of every CSS file. It is basically mandatory for modern CSS.

```css
/* Put this at line 1 of every stylesheet */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

## 2. Full-Page Flexbox Layout (body)

```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

**WHAT:**
- `min-height: 100vh` -- The body is at least as tall as the viewport (the browser window). `vh` = viewport height. `100vh` = 100% of the screen height.
- `display: flex` -- Turns the body into a flex container. Its direct children (header, .content, footer) become flex items.
- `flex-direction: column` -- Stacks children vertically (top to bottom) instead of the default horizontal (left to right).

**WHY:** This creates the classic "sticky footer" pattern. The body stretches to fill the screen, and you can then use `flex: 1` on the middle content area to push the footer to the bottom even when there is not much content.

**HOW TO REUSE -- "Sticky Footer" pattern:**
```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;  /* This grows to fill all remaining space */
}
/* footer will naturally sit at the bottom */
```

---

## 3. Header Styling

```css
header {
  background-color: rgb(44, 8, 84);
  color: white;
  text-align: center;
  padding: 20px;
}
```

**WHAT:**
- `background-color: rgb(44, 8, 84)` -- Dark purple background using RGB values (red=44, green=8, blue=84).
- `color: white` -- Text color. This is inherited by child elements like `<h1>`.
- `text-align: center` -- Centers inline content (text, inline elements) horizontally.
- `padding: 20px` -- Adds 20px of space inside the element on all four sides.

**WHY:** Creates a branded header bar. The dark purple + white text provides high contrast for readability.

**HOW TO REUSE:**
```css
header {
  background-color: rgb(R, G, B);
  color: white;
  text-align: center;
  padding: 20px;
}
```

---

## 4. 3-Column Layout with Flexbox

This is the **core layout technique** of the assignment (worth 10 points!).

### The Container

```css
.content {
  flex: 1;
  display: flex;
}
```

**WHAT:**
- `flex: 1` -- This is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0`. It tells `.content` to grow and fill all available vertical space inside the body (pushing the footer down).
- `display: flex` -- Makes `.content` a flex container too (nested flexbox). Its children (.left, .center, .right) will sit side by side horizontally (default `flex-direction: row`).

### The Three Columns

```css
.left {
  flex: 1;
  padding: 10px;
}

.center {
  flex: 2;
  padding: 10px;
  overflow: hidden;
}

.right {
  flex: 1;
  padding: 10px;
  padding-bottom: 50px;
  background-color: rgb(165, 87, 222);
  max-height: fit-content;
}
```

**WHY the flex ratios matter:**
- `.left` gets `flex: 1` = 1 share of space
- `.center` gets `flex: 2` = 2 shares of space
- `.right` gets `flex: 1` = 1 share of space
- Total = 4 shares. So left = 25%, center = 50%, right = 25%.

**Key properties:**
- `overflow: hidden` on `.center` -- Prevents any overflowing content (like long text or the map image) from spilling outside the center column. This clips it cleanly.
- `max-height: fit-content` on `.right` -- The right sidebar only grows as tall as its content needs, not stretching to match the tallest column.
- `padding-bottom: 50px` on `.right` -- Extra breathing room at the bottom.

**HOW TO REUSE -- Multi-column layout:**
```css
.container {
  display: flex;
}
.sidebar    { flex: 1; }
.main       { flex: 2; }  /* twice as wide */
.other-side { flex: 1; }
```

---

## 5. Left Sidebar -- Fact Cards with Hover

```css
.left p {
  background-color: rgb(165, 87, 222);
  color: white;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
}
```

**WHAT:** Styles every `<p>` inside `.left` as a purple card.

**Selector breakdown:** `.left p` is a **descendant combinator**. It means "any `<p>` that is anywhere inside an element with class `left`."

```css
.left p:hover {
  background-color: rgba(39, 13, 57);
  color: rgb(180, 180, 180);
  cursor: none;
}
```

**WHAT:**
- `:hover` -- A **pseudo-class** that triggers when the user's mouse is over the element.
- `background-color: rgba(39, 13, 57)` -- Darker purple on hover. (Note: this uses `rgba()` but without an alpha value, so it defaults to fully opaque. Normally `rgba` takes 4 values like `rgba(39, 13, 57, 0.5)` for 50% transparency.)
- `cursor: none` -- Hides the mouse cursor entirely when hovering. This is an unusual choice -- `cursor: pointer` (hand icon) is more common for interactive elements.

**WHY:** Visual feedback on hover tells the user these fact cards are interactive (or at least noticeable). The color change is a simple but effective technique.

**HOW TO REUSE -- Hover color change:**
```css
.card {
  background-color: lightblue;
  transition: background-color 0.3s;  /* smooth it out */
}
.card:hover {
  background-color: darkblue;
  color: white;
}
```

---

## 6. Center Section -- CSS-Only Tabbed Menu

This is the big one. **No JavaScript is used.** The entire tab system works with CSS `:target`.

### HTML Structure

```html
<nav class="tab-menu">
  <a href="#Home" class="tab-btn">Home</a>
  <a href="#Provinces" class="tab-btn">Provinces and territories</a>
  <div class="tab-dropdown">
    <a href="#Alberta" class="tab-btn">My Alberta</a>
    <ul class="submenu">
      <li><a href="#holidays">Public holidays</a></li>
      <li><a href="#parks">Provincial parks</a></li>
    </ul>
  </div>
</nav>

<div id="Home" class="tab-content">...</div>
<div id="Provinces" class="tab-content">...</div>
<div id="Alberta" class="tab-content">...</div>
<div id="holidays" class="tab-content">...</div>
<div id="parks" class="tab-content">...</div>

<img src="images/image.png" alt="Map of Canada" class="canada-map" />
```

**HOW IT WORKS:**
1. Each `<a>` link has an `href` like `#Home` that points to an element with `id="Home"`.
2. When you click a link, the browser adds `#Home` to the URL. This makes the element with `id="Home"` become the **:target**.
3. CSS can detect this with the `:target` pseudo-class and show/hide content.

### Tab Menu Container

```css
.tab-menu {
  margin-top: 6px;
  white-space: nowrap;
  perspective: 500px;
}
```

**WHAT:**
- `white-space: nowrap` -- Prevents the tab buttons from wrapping to the next line. They all stay on one horizontal row.
- `perspective: 500px` -- This is needed for 3D transforms to look right. It sets the "distance" the viewer is from the element. Lower values = more dramatic 3D effect. Without this, `rotateX()` would look flat.

**How to reuse:**
```css
.tab-menu {
  white-space: nowrap;       /* keep tabs on one line */
  perspective: 500px;        /* enable 3D for child elements */
}
```
Whenever you have a row of buttons or tabs that use 3D transforms, slap `perspective` on the parent and `white-space: nowrap` to prevent wrapping. Adjust the `perspective` value -- lower = more dramatic, higher = subtler.

---

## 7. Tab Buttons -- Transforms, Transitions, Gradients

### Default State

```css
.tab-btn {
  padding: 6px 10px;
  background-color: rgb(165, 87, 222);
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: 2px 2px 6px 3px rgb(0, 0, 0);
  display: inline-block;
  transform: rotateX(30deg);
  transition: all .7s;
}
```

**Key properties explained:**

| Property | What It Does | Why It Is Here |
|----------|-------------|----------------|
| `text-decoration: none` | Removes the underline from links | `<a>` tags have underlines by default |
| `border-radius: 5px` | Rounds the corners | Makes buttons look softer/modern |
| `box-shadow: 2px 2px 6px 3px rgb(0,0,0)` | Adds a drop shadow | Creates depth. Format: `offset-x offset-y blur spread color` |
| `display: inline-block` | Makes the `<a>` accept width/padding like a block, but stays inline | `<a>` is inline by default, which ignores some box-model properties |
| `transform: rotateX(30deg)` | Tilts the button 30 degrees along the X-axis (like tilting a card away from you) | Creates that "3D tab" appearance the assignment requires |
| `transition: all .7s` | Animates ALL property changes over 0.7 seconds | Makes the hover effect smooth instead of instant |

### Hover State

```css
.tab-btn:hover {
  background: linear-gradient(rgb(165, 87, 222), rgb(44, 8, 84));
  color: rgb(255, 255, 255);
  transform: rotateX(0deg);
  box-shadow: 0px 4px 6px 3px rgb(0, 0, 0);
}
```

**WHAT happens on hover:**
1. `background` changes from a solid color to a **linear gradient** going from lighter purple (top) to darker purple (bottom).
2. Text color goes from black to white.
3. `transform: rotateX(0deg)` -- The button "flips" back to flat. Combined with `transition: all .7s`, this creates a smooth 3D animation.
4. The `box-shadow` shifts (more on the Y-axis) to simulate the button "pressing down."

**HOW TO REUSE -- 3D button with hover flip:**
```css
.parent {
  perspective: 500px;  /* MUST be on the parent */
}
.button-3d {
  display: inline-block;
  transform: rotateX(30deg);
  transition: all 0.5s;
}
.button-3d:hover {
  transform: rotateX(0deg);
  background: linear-gradient(lightColor, darkColor);
}
```

---

## 8. The :target Trick -- Showing/Hiding Tab Content

This is the **most important CSS-only technique** in the assignment.

```css
.tab-content {
  display: none;
}

.tab-content:target {
  margin-top: 20px;
  display: block;
}
```

**WHAT:**
- All `.tab-content` divs are hidden by default (`display: none`).
- When the URL hash matches an element's `id` (e.g., user clicks `<a href="#Home">` and the URL becomes `page.html#Home`), that element becomes the `:target`.
- The `:target` pseudo-class overrides `display: none` with `display: block`, making it visible.

**WHY:** This gives you a fully functional tab system with zero JavaScript. The browser's built-in fragment navigation does all the work.

**HOW TO REUSE -- CSS-only tabs:**
```html
<!-- The links -->
<a href="#tab1">Tab 1</a>
<a href="#tab2">Tab 2</a>

<!-- The content panels -->
<div id="tab1" class="panel">Content 1</div>
<div id="tab2" class="panel">Content 2</div>
```
```css
.panel { display: none; }
.panel:target { display: block; }
```

---

## 9. Hiding the Map When a Tab Is Active

```css
.tab-content:target ~ .canada-map {
  display: none;
}
```

**WHAT:** The `~` is the **general sibling combinator**. It selects `.canada-map` only when it is a sibling that comes AFTER a `.tab-content` that is currently `:target`.

**WHY:** The assignment requires showing the Canada map by default (when no tab is selected) and hiding it when any tab is active. This single rule does exactly that:
- No tab selected -> no `.tab-content:target` exists -> the sibling rule does not match -> map is visible.
- Tab selected -> `.tab-content:target` exists -> `~ .canada-map` matches -> map is hidden.

**CRITICAL for exams:** The `~` combinator only works on **siblings** (elements at the same level in the HTML). The `<img>` must be a sibling of the `.tab-content` divs, not nested inside something else.

**Sibling combinators cheat sheet:**
```css
A ~ B   /* General sibling: any B that comes after A (same parent) */
A + B   /* Adjacent sibling: B immediately after A (same parent) */
```

**How to reuse:**
```html
<!-- Any "default" content that should disappear when a panel is active -->
<div id="tab1" class="panel">Tab 1 stuff</div>
<div id="tab2" class="panel">Tab 2 stuff</div>
<div class="default-view">I only show when no tab is selected</div>
```
```css
.panel:target ~ .default-view {
  display: none;
}
```
The key requirement: the default element MUST be a sibling that comes AFTER the `.panel` divs in the HTML. If it's nested inside something else, `~` won't reach it.

---

## 10. Province List -- Custom Image Bullets

```css
.province-list {
  list-style: none;
  margin-top: 20px;
  margin-left: 45px;
  color: purple;
}

.province-ab {
  list-style-image: url(images/flag-alberta.png);
}

.province-bc {
  list-style-image: url(images/flag-bc.png);
}
```

**WHAT:**
- `list-style: none` -- Removes default bullet points from the `<ul>`.
- `list-style-image: url(...)` -- Replaces the bullet with a custom image (the provincial flag).
- `margin-left: 45px` -- Needed because the flag images need room to display. Without this left margin, the flags would be cut off or overlap the content.

**WHY:** The assignment specifically requires "Canadian Provincial Flags as markers." This is how you do it.

### Hover Effect on Province Items

```css
.province-ab:hover,
.province-bc:hover {
  color: black;
  font-weight: bold;
  background: linear-gradient(rgb(255, 255, 255), rgb(165, 87, 222));
}
```

**WHAT:** When hovering over either province list item, the text becomes bold and black, and the background gets a white-to-purple gradient.

**Selector note:** The comma `,` means "OR." This rule applies to `.province-ab:hover` OR `.province-bc:hover`. This avoids writing the same styles twice.

**How to reuse:**
```html
<ul class="icon-list">
  <li class="icon-star">Starred item</li>
  <li class="icon-heart">Loved item</li>
</ul>
```
```css
.icon-list {
  list-style: none;
  margin-left: 40px;  /* leave room for the images */
}
.icon-star { list-style-image: url(images/star.png); }
.icon-heart { list-style-image: url(images/heart.png); }

/* hover effect for all icon types at once */
.icon-star:hover,
.icon-heart:hover {
  font-weight: bold;
  background: linear-gradient(white, lightblue);
}
```
Swap the image paths and class names to fit your project. The `margin-left` is important -- without it the custom images get clipped.

---

## 11. Hover-to-Reveal Hidden Content

```css
.province-area {
  display: none;
  font-style: italic;
}

.province-list li:hover .province-area {
  display: inline;
}
```

**WHAT:**
- `.province-area` is a `<span>` inside each `<li>` that holds the area text (e.g., "661,848 sq km").
- It is hidden by default (`display: none`).
- When you hover over the `<li>`, the `.province-area` inside it becomes visible (`display: inline`).
- `font-style: italic` -- The assignment specifically says the area must be in italics.

**Selector breakdown:** `.province-list li:hover .province-area`
1. Start at `.province-list`
2. Find an `li` inside it
3. That `li` must be in `:hover` state
4. Then find `.province-area` inside that hovered `li`

This is a **descendant combinator chain** -- each space means "somewhere inside."

**HOW TO REUSE -- Show hidden content on hover:**
```html
<div class="parent">
  Visible text
  <span class="hidden-detail">Extra info shown on hover</span>
</div>
```
```css
.hidden-detail { display: none; }
.parent:hover .hidden-detail { display: inline; }
```

---

## 12. Dropdown Submenu on Hover

### Container Setup

```css
.tab-dropdown {
  position: relative;
  display: inline-block;
  perspective: 500px;
  transform-style: preserve-3d;
  padding-bottom: 10px;
}
```

**WHAT:**
- `position: relative` -- Makes this element the **positioning reference** for any `position: absolute` children (like the submenu). Without this, the submenu would position itself relative to the entire page.
- `display: inline-block` -- Sits inline with the other tab buttons but can have width/height.
- `perspective: 500px` -- Enables 3D effects for children.
- `transform-style: preserve-3d` -- Children maintain their own 3D positioning rather than being flattened.
- `padding-bottom: 10px` -- Creates a "bridge" of hoverable space between the button and the submenu. Without this, there would be a gap and the submenu would disappear when you try to move your mouse to it.

### The Submenu

```css
.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0%;
}

.tab-dropdown:hover .submenu {
  display: block;
}
```

**WHAT:**
- `display: none` -- Submenu hidden by default.
- `position: absolute` -- Takes the submenu out of normal flow and positions it relative to the nearest `position: relative` parent (which is `.tab-dropdown`).
- `top: 100%` -- Positions the submenu right below the parent (100% of the parent's height down from the parent's top).
- `left: 0%` -- Aligns the left edge of the submenu with the left edge of the parent.
- On hover of `.tab-dropdown`, the submenu becomes `display: block`.

### Submenu Styling

```css
.tab-dropdown .submenu {
  list-style: none;
  margin: -4px;
}

.tab-dropdown .submenu a {
  text-decoration: none;
  background: linear-gradient(rgb(255, 255, 255), rgb(165, 87, 222));
  border: 3px solid black;
  display: block;
  padding: 8px 15px;
  opacity: 50%;
}

.tab-dropdown .submenu a:hover {
  opacity: 100%;
}
```

**WHAT:**
- `list-style: none` -- Removes bullet points from the `<ul>` submenu.
- `margin: -4px` -- Negative margin pulls the submenu slightly closer to the parent button, closing any visual gap.
- `opacity: 50%` -- Submenu links are semi-transparent by default, becoming fully opaque on hover. This creates a nice "highlighting" effect.
- `display: block` -- Makes each `<a>` fill the full width of the submenu item (instead of just wrapping the text).

**HOW TO REUSE -- CSS-only dropdown:**
```html
<div class="dropdown">
  <a href="#">Menu Item</a>
  <ul class="dropdown-menu">
    <li><a href="#">Sub Item 1</a></li>
    <li><a href="#">Sub Item 2</a></li>
  </ul>
</div>
```
```css
.dropdown {
  position: relative;
  display: inline-block;
  padding-bottom: 5px;  /* hoverable bridge */
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
```

---

## 13. Right Sidebar -- Job Cards with Flex Wrap

### The Grid Container

```css
.right h2 {
  text-align: center;
  color: white;
}

.jobs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
```

**WHAT:**
- `display: flex` -- Children (job cards) are flex items.
- `flex-wrap: wrap` -- When cards do not fit on one line, they wrap to the next line. Without this, all cards would squeeze onto one row.
- `gap: 10px` -- Adds 10px spacing between flex items (both rows and columns). This is cleaner than using margins on each item.

### The Job Cards

```css
.job-card {
  flex: 0 1 calc(50% - 10px);
  max-width: calc(50% - 10px);
  min-width: 0;
  overflow: hidden;
  padding: 10px;
  color: white;
}
```

**WHAT:**
- `flex: 0 1 calc(50% - 10px)` -- This is shorthand for:
  - `flex-grow: 0` -- Do not grow beyond the basis.
  - `flex-shrink: 1` -- Can shrink if needed.
  - `flex-basis: calc(50% - 10px)` -- Start at 50% width minus 10px (to account for the gap).
- `max-width: calc(50% - 10px)` -- Hard cap so the card never exceeds half the container.
- `min-width: 0` -- Prevents flex items from overflowing when content is too wide. This is a common flex bug fix.
- `overflow: hidden` -- Clips any overflowing content inside the card.

**WHY:** This creates a 2-column card layout. Two cards per row (each 50% minus gap), and the third card wraps to a new row.

### Card Header with Fancy Corner

```css
.job-card-header {
  background-color: rgb(141, 50, 206);
  border-radius: 0px 30px 0px 0px;
  border: 5px solid black;
}

.job-card-header h3 {
  padding: 10px;
  padding-bottom: 30px;
}
```

**WHAT:**
- `border-radius: 0px 30px 0px 0px` -- Only the **top-right** corner is rounded (30px). The order is: top-left, top-right, bottom-right, bottom-left.
- `border: 5px solid black` -- Thick black border for visual definition.

### Card Text Alignment

```css
.job-card p {
  text-align: center;
}

.job-card .salary {
  text-align: right;
}
```

**WHY:** Card descriptions are centered, but salary is right-aligned for emphasis. The `.salary` rule is more specific than `.job-card p` (class selector > element selector in specificity chain), so it wins.

**HOW TO REUSE -- Flex wrap card grid:**
```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card {
  flex: 0 1 calc(50% - 10px);  /* 2 columns */
  /* For 3 columns: calc(33.333% - 10px) */
  /* For 4 columns: calc(25% - 10px) */
}
```

---

## 14. Badge System

```css
.badge {
  min-width: 150px;
  font-weight: bold;
  display: inline-block;
  border-radius: 0px 15px 15px 0px;
}

.badge-popular {
  background-color: red;
}

.badge-new {
  color: black;
  background-color: lime;
}
```

**WHAT:**
- `.badge` is a base class with shared styles.
- `.badge-popular` and `.badge-new` are modifier classes that set the color.
- `border-radius: 0px 15px 15px 0px` -- Rounded on the right side only (top-right and bottom-right), giving a "tag" shape.
- `min-width: 150px` -- Ensures the badge has a minimum width even with short text.

**WHY:** This is a common "modifier class" pattern. The HTML uses both classes: `class="badge badge-popular"`. The base class handles layout; the modifier handles color.

**How to reuse:**
```html
<span class="badge badge-success">Approved</span>
<span class="badge badge-danger">Rejected</span>
<span class="badge badge-info">Pending</span>
```
```css
/* Base class -- shared layout */
.badge {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
  border-radius: 0px 15px 15px 0px;  /* tag shape */
  padding: 4px 12px;
}
/* Modifier classes -- just color */
.badge-success { background-color: green; color: white; }
.badge-danger  { background-color: red; color: white; }
.badge-info    { background-color: dodgerblue; color: white; }
```
Add as many modifier classes as you need -- each one only changes color. The base `.badge` class handles everything else.

---

## 15. Footer with Flexbox

```css
footer {
  background-color: rgb(165, 87, 222);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
```

**WHAT:**
- `display: flex` -- Footer children (two `<p>` elements) become flex items.
- `justify-content: space-between` -- Pushes the first child to the left edge and the last child to the right edge, with all remaining space in between.

**WHY:** This is the easiest way to get "left text ... right text" in a bar. One line of CSS.

**HOW TO REUSE -- Space-between footer/navbar:**
```css
.bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
```

---

## 16. Responsive Design -- Media Query

```css
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .left {
    order: 1;
  }

  .center {
    order: 2;
  }

  .right {
    order: 3;
  }

  .jobs-grid {
    flex-direction: column;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
```

**WHAT:** `@media (max-width: 768px)` means "apply these styles only when the viewport is 768px wide or less" (typical tablet/mobile breakpoint).

**Changes on mobile:**

| Property | What It Does | Why |
|----------|-------------|-----|
| `flex-direction: column` on `.content` | Stacks the 3 columns vertically | Screen is too narrow for 3 columns |
| `order: 1/2/3` | Controls the visual order of flex children | Lets you rearrange sections without changing HTML |
| `flex-direction: column` on `.jobs-grid` | Job cards stack vertically (1 per row) | Too narrow for 2-column card grid |
| `position: fixed` on `footer` | Footer stays pinned to the bottom of the screen | Assignment requirement: "the footer is fixed" on mobile |
| `bottom: 0; left: 0; right: 0` on `footer` | Positions the fixed footer at the very bottom, spanning full width | Without `left: 0; right: 0`, the footer might not stretch edge to edge |

**Key concept: `order`**
- By default, all flex items have `order: 0`.
- Lower numbers appear first. So `order: 1` comes before `order: 2`.
- This lets you visually reorder elements without touching the HTML. Super useful for responsive layouts where you want a different section order on mobile.

**HOW TO REUSE -- Responsive column collapse:**
```css
.container {
  display: flex;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .sidebar { order: 2; }
  .main    { order: 1; }  /* main content first on mobile */
}
```

---

## 17. HTML Elements Reference

Every HTML element used in this assignment:

| Element | Where Used | Purpose |
|---------|-----------|---------|
| `<!doctype html>` | Line 1 | Tells the browser this is HTML5 |
| `<html lang="en">` | Root | Language attribute helps accessibility/SEO |
| `<head>` | Metadata container | Not displayed; holds meta, title, link |
| `<link rel="stylesheet">` | Head | Connects the external CSS file |
| `<meta charset="UTF-8">` | Head | Character encoding for special characters |
| `<meta name="viewport" ...>` | Head | **Critical for responsive design.** Tells mobile browsers to use device width, not a zoomed-out desktop view |
| `<meta name="description">` | Head | SEO description |
| `<meta name="author">` | Head | Author metadata |
| `<title>` | Head | Browser tab title |
| `<body>` | Page wrapper | Contains all visible content |
| `<header>` | Semantic | Page header section |
| `<h1>`, `<h2>`, `<h3>` | Headings | Heading hierarchy (h1 = most important) |
| `<div>` | Generic container | Used for `.content`, `.tab-content`, `.job-card`, etc. |
| `<section>` | Semantic container | Used for `.left`, `.center`, `.right` -- more meaningful than `<div>` |
| `<nav>` | Semantic | Wraps the tab menu navigation |
| `<a href="#id">` | Links | Anchor links for tab navigation (fragment identifiers) |
| `<ul>` | Unordered list | Province list and submenu |
| `<li>` | List item | Items within `<ul>` |
| `<p>` | Paragraph | Text content blocks |
| `<span>` | Inline container | Used for `.province-area` and `.badge` (styled inline text) |
| `<em>` | Emphasis | Used in salary display ("an hour") -- renders as italic by default |
| `<img>` | Image | The Canada map |
| `<footer>` | Semantic | Page footer section |
| `&copy;` | HTML entity | Copyright symbol |
| `&trade;` | HTML entity | Trademark symbol |
| `&amp;` | HTML entity | Ampersand (&) -- must be escaped in HTML |

### The Viewport Meta Tag (important for responsive)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Without this, mobile browsers render the page at a desktop width (like 980px) and then zoom out. With this tag, the browser uses the actual device width, so your media queries work correctly.

**How to reuse:**
Literally copy-paste this into the `<head>` of every HTML page you make. It is non-negotiable for responsive design:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Your Page Title</title>
</head>
```
The first three lines (`charset`, `viewport`, `stylesheet link`) are your starter kit for any HTML file.

---

## 18. Selectors Reference

Every type of selector used in this assignment:

### Element Selectors
```css
* { }           /* Universal -- matches everything */
body { }        /* Type/element selector */
header { }
footer { }
```

### Class Selectors
```css
.content { }        /* Matches class="content" */
.left { }
.tab-btn { }
.badge-popular { }
```

### ID Selectors (used in HTML for :target, not directly in CSS rules)
The `id` attributes (`id="Home"`, `id="Provinces"`, etc.) are used by `:target`, not by `#Home { }` rules.

### Pseudo-Classes
```css
:hover              /* Mouse is over the element */
:target             /* Element's id matches the URL fragment (#hash) */
```

### Combinators
```css
.left p { }                         /* Descendant: any <p> inside .left */
.tab-dropdown .submenu a { }        /* Descendant chain: <a> inside .submenu inside .tab-dropdown */
.province-list li:hover .province-area { }  /* Descendant + pseudo-class combo */
.tab-content:target ~ .canada-map { }       /* General sibling: .canada-map after a targeted .tab-content */
```

### Multiple Selectors (comma-separated)
```css
.province-ab:hover,
.province-bc:hover { }   /* Same styles for either selector */
```

### Specificity Quick Guide
When two rules conflict, the more specific one wins:

1. Inline styles (most specific) -- `style="..."` in HTML
2. ID selectors -- `#home { }`
3. Class selectors, pseudo-classes -- `.tab-btn:hover { }`
4. Element selectors -- `p { }`
5. Universal selector -- `* { }` (least specific)

In this assignment: `.job-card .salary` beats `.job-card p` because two class selectors beat one class + one element.

**How to reuse:**
When your styles aren't applying the way you expect, count the selectors:
```css
/* Specificity: 0-1-1 (one class + one element) */
.card p { color: gray; }

/* Specificity: 0-2-0 (two classes) -- THIS WINS */
.card .highlight { color: red; }

/* If you need to override even that, add more specificity: */
/* Specificity: 0-3-0 (three classes) */
.sidebar .card .highlight { color: blue; }
```
Rule of thumb: more classes = more specific = wins. Avoid using `!important` -- just be more specific with your selectors.

---

## 19. Quick Copy Patterns

### Pattern 1: Full-Page Layout with Sticky Footer

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
```

### Pattern 2: Multi-Column Layout

```css
.container {
  display: flex;
}
.col-small { flex: 1; }
.col-large { flex: 2; }
```

### Pattern 3: CSS-Only Tabs (No JavaScript)

```html
<a href="#tab1">Tab 1</a>
<a href="#tab2">Tab 2</a>

<div id="tab1" class="panel">Content 1</div>
<div id="tab2" class="panel">Content 2</div>
```
```css
.panel { display: none; }
.panel:target { display: block; }
```

### Pattern 4: Hide a Sibling When Target Is Active

```css
.panel:target ~ .default-content {
  display: none;
}
```

### Pattern 5: CSS-Only Dropdown Menu

```html
<div class="dropdown">
  <a>Hover Me</a>
  <ul class="menu">
    <li><a href="#">Item</a></li>
  </ul>
</div>
```
```css
.dropdown { position: relative; display: inline-block; padding-bottom: 5px; }
.menu { display: none; position: absolute; top: 100%; left: 0; list-style: none; }
.dropdown:hover .menu { display: block; }
```

### Pattern 6: 3D Button with Hover Transition

```css
.parent { perspective: 500px; }

.btn-3d {
  display: inline-block;
  transform: rotateX(30deg);
  transition: all 0.5s;
  background-color: purple;
}
.btn-3d:hover {
  transform: rotateX(0deg);
  background: linear-gradient(lightpurple, darkpurple);
}
```

### Pattern 7: Show Hidden Content on Hover

```css
.detail { display: none; }
.parent:hover .detail { display: inline; }
```

### Pattern 8: Flex-Wrap Card Grid (2 columns)

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card {
  flex: 0 1 calc(50% - 10px);
  max-width: calc(50% - 10px);
}
```

### Pattern 9: Space-Between Footer/Navbar

```css
footer {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
```

### Pattern 10: Responsive Collapse with Reordering

```css
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .sidebar { order: 2; }
  .main    { order: 1; }
}
```

### Pattern 11: Fixed Footer (Mobile Only)

```css
@media (max-width: 768px) {
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
```

### Pattern 12: Custom List Bullets with Images

```css
.list { list-style: none; margin-left: 45px; }
.list .item-type-a { list-style-image: url(images/icon-a.png); }
.list .item-type-b { list-style-image: url(images/icon-b.png); }
```

### Pattern 13: Gradient Background

```css
background: linear-gradient(topColor, bottomColor);
/* e.g. */
background: linear-gradient(rgb(255,255,255), rgb(165,87,222));
```

### Pattern 14: Badge / Tag Shape

```css
.badge {
  display: inline-block;
  min-width: 150px;
  font-weight: bold;
  border-radius: 0px 15px 15px 0px;  /* rounded right side only */
  background-color: red;
}
```

### Pattern 15: Opacity Hover Effect

```css
.item { opacity: 0.5; }
.item:hover { opacity: 1; }
```

---

## CSS Properties Master List (Every Property Used)

For quick lookup -- every CSS property in this assignment alphabetically:

| Property | Example Value | What It Controls |
|----------|--------------|-----------------|
| `background` | `linear-gradient(...)` | Background (shorthand, can be color or gradient) |
| `background-color` | `rgb(165, 87, 222)` | Solid background color |
| `border` | `5px solid black` | Border width, style, color |
| `border-radius` | `5px` or `0 30px 0 0` | Corner rounding |
| `bottom` | `0` | Distance from bottom (with positioning) |
| `box-shadow` | `2px 2px 6px 3px black` | Drop shadow: x y blur spread color |
| `box-sizing` | `border-box` | Include padding/border in width |
| `color` | `white` | Text color |
| `cursor` | `none` | Mouse cursor appearance |
| `display` | `flex` / `block` / `none` / `inline-block` / `inline` | How element renders |
| `flex` | `1` or `0 1 calc(50% - 10px)` | Flex grow/shrink/basis shorthand |
| `flex-direction` | `column` | Flex main axis direction |
| `flex-wrap` | `wrap` | Allow flex items to wrap |
| `font-size` | `14px` / `12px` | Text size |
| `font-style` | `italic` | Italic text |
| `font-weight` | `bold` | Bold text |
| `gap` | `10px` | Space between flex/grid items |
| `justify-content` | `space-between` | Flex main-axis alignment |
| `left` | `0` / `0%` | Distance from left (with positioning) |
| `list-style` | `none` | Remove list bullets |
| `list-style-image` | `url(images/flag.png)` | Custom bullet image |
| `margin` | `0` / `-4px` | Outer spacing |
| `margin-bottom` | `10px` | Bottom outer spacing |
| `margin-left` | `45px` | Left outer spacing |
| `margin-top` | `6px` / `20px` | Top outer spacing |
| `max-height` | `fit-content` / `600px` | Maximum height |
| `max-width` | `100%` / `calc(50% - 10px)` | Maximum width |
| `min-height` | `100vh` | Minimum height |
| `min-width` | `0` / `150px` | Minimum width |
| `opacity` | `50%` / `100%` | Transparency |
| `order` | `1` / `2` / `3` | Flex item visual order |
| `overflow` | `hidden` | Clip overflowing content |
| `padding` | `10px` / `6px 10px` / `8px 15px` | Inner spacing |
| `padding-bottom` | `30px` / `50px` / `10px` | Bottom inner spacing |
| `perspective` | `500px` | 3D depth perception distance |
| `position` | `relative` / `absolute` / `fixed` | Positioning scheme |
| `right` | `0` | Distance from right (with positioning) |
| `text-align` | `center` / `right` | Horizontal text alignment |
| `text-decoration` | `none` | Remove link underlines |
| `top` | `100%` | Distance from top (with positioning) |
| `transform` | `rotateX(30deg)` | 2D/3D transformations |
| `transform-style` | `preserve-3d` | Keep child 3D transforms |
| `transition` | `all .7s` | Animate property changes |
| `white-space` | `nowrap` | Prevent text/inline wrapping |

---

Good luck on the midterm! Remember: flexbox layout, `:target` tabs, and the media query responsive pattern are the highest-point techniques in this assignment. If you see something similar on the exam, the Quick Copy Patterns section has you covered.
