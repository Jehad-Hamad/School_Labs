# CS3990 Assignment 3 -- Midterm Cheat Sheet
## CSS Advanced Part 1: Pseudo-Classes & Pseudo-Elements

---

## What Was This Assignment About?

The assignment (20 points) required you to **write only CSS** -- the HTML template was locked and could not be changed. The page has two main `<article>` blocks:

- **Part 1 -- CSS Pseudo-Classes**: hover effects, speech bubbles, list styling using pseudo-classes (`:hover`, `:first-child`, `:nth-child()`, `:not()`, etc.)
- **Part 2 -- CSS Pseudo-Elements**: custom blockquote decorations, list markers, overlaid icons, and interactive highlighting using `::before`, `::after`, `::marker`, and the `:has()` pseudo-class.

The **core skill** being tested: select elements precisely using contextual selectors and pseudo-classes/pseudo-elements when you cannot touch the HTML.

---

## Table of Contents

1. [HTML Structure (Read-Only Template)](#1-html-structure-read-only-template)
2. [Selector Strategies -- The Big Picture](#2-selector-strategies----the-big-picture)
3. [Part 1 Breakdown: Pseudo-Classes](#3-part-1-breakdown-pseudo-classes)
   - [Task 1 -- Background/Color Setup](#task-1--backgroundcolor-setup-2-pts)
   - [Task 2 -- Hover Opacity + Borders](#task-2--hover-opacity--borders-1-pt)
   - [Task 3 -- Speech Bubble](#task-3--speech-bubble-3-pts)
   - [Task 4 -- List Styling with Pseudo-Classes](#task-4--list-styling-with-pseudo-classes-3-pts)
4. [Part 2 Breakdown: Pseudo-Elements](#4-part-2-breakdown-pseudo-elements)
   - [Task 5 -- Custom Blockquote](#task-5--custom-blockquote-3-pts--1-pt-hover)
   - [Task 6 -- Custom List Markers](#task-6--custom-list-markers-2-pts)
   - [Task 7 -- Right/Wrong Answer Overlays](#task-7--rightwrong-answer-overlays-5-pts)
5. [CSS Properties Reference (Every Property Used)](#5-css-properties-reference-every-property-used)
6. [Selectors Deep Dive](#6-selectors-deep-dive)
7. [Pseudo-Classes Reference](#7-pseudo-classes-reference)
8. [Pseudo-Elements Reference](#8-pseudo-elements-reference)
9. [Positioning & Layout Patterns](#9-positioning--layout-patterns)
10. [Quick Copy Patterns](#10-quick-copy-patterns)

---

## 1. HTML Structure (Read-Only Template)

Understanding the HTML is crucial because you must target elements **without changing it**.

```html
<body>
  <!-- PART 1 (second-to-last article) -->
  <article>
    <h2>Part 1. CSS pseudo-classes</h2>
    <div class="task1">
      <div>Task1: Hi there! I am a speech bubble</div>
      Hove over me to see a speech bubble
    </div>
    <div class="task2">
      <ul>
        Task2: Select and style elems in the list
        <li>elem1</li>
        <li>elem2</li>
        <li class="special">elem3</li>
        <li>elem4</li>
        <li>elem5</li>
      </ul>
    </div>
  </article>

  <!-- PART 2 (last article) -->
  <article>
    <h3>Part 2. CSS pseudo-elements</h3>
    <div class="task1">
      <h4>Custom blockquote</h4>
      <blockquote>Lorem ipsum...</blockquote>
    </div>
    <div class="task2">
      <h4>Bullet List with Icons and markers</h4>
      <ul>
        <li>elem1</li> ... <li>elem5</li>
      </ul>
    </div>
    <div class="task3">
      <span>Right</span><span>Wrong</span> answers
      <div class="wrong">Lorem ipsum...</div>
      <div class="correct">Lorem ipsum...</div>
    </div>
  </article>
</body>
```

### HTML Elements Used

| Element | What It Is | Role in This Assignment |
|---------|-----------|------------------------|
| `<!DOCTYPE html>` | Document type declaration (XHTML 1.0 Transitional here) | Tells browser which HTML standard to use |
| `<html>` | Root element | Wraps everything |
| `<head>` | Metadata container | Holds the `<link>` to the stylesheet |
| `<link rel="stylesheet">` | External stylesheet link | Connects `styles.css` to the HTML |
| `<body>` | Page content container | Everything visible lives here |
| `<article>` | Semantic sectioning element | Two of them: Part 1 and Part 2 |
| `<h2>`, `<h3>`, `<h4>` | Headings (level 2, 3, 4) | Section titles -- styled with italic |
| `<div>` | Generic block container | Used for task containers (`.task1`, `.task2`, `.task3`) and answer blocks (`.wrong`, `.correct`) |
| `<ul>` | Unordered list | Contains list items in task2 areas |
| `<li>` | List item | Individual items; one has `class="special"` |
| `<blockquote>` | Block quotation | The text that gets custom quote decorations |
| `<span>` | Inline container | "Right" and "Wrong" labels in Part 2 Task 3 |
| `<script>` | JavaScript (D2L/Brightspace boilerplate) | Ignore -- not relevant to CSS |

**How to reuse:** Whenever you get a "CSS only" challenge, the first step is always to map out the HTML tree. Draw a quick outline like the one above -- note which elements share classes, which are siblings, and which are nested. This tells you which selectors are possible. For example, if two `<section>` elements both have `.panel`, you'll need positional pseudo-classes to tell them apart:
```css
/* Same idea -- figure out the structure, then pick the right positional selector */
section:first-of-type .panel { /* styles for the first section's panel */ }
section:last-of-type .panel  { /* styles for the second section's panel */ }
```

---

## 2. Selector Strategies -- The Big Picture

The biggest challenge: there are **two `<article>` elements** and many share class names (`.task1`, `.task2`). You can't add IDs. So how do you tell them apart?

### The Key Trick: `nth-last-of-type()`

```css
/* Part 1 = second-to-last article */
article:nth-last-of-type(2) { ... }

/* Part 2 = last article */
article:nth-last-of-type(1) { ... }
/* OR equivalently: */
article:last-of-type { ... }
```

**Why `nth-last-of-type` and not `nth-of-type`?** Both work here (there are only 2 articles), but counting from the end is more robust if articles get added before them. The assignment uses `nth-last-of-type` consistently.

**How to reuse:** Got a page with multiple `<section>`, `<div>`, or `<article>` elements that have no unique class/ID? Use this pattern:
```css
/* Target the 3rd-from-last <section> */
section:nth-last-of-type(3) { ... }

/* Target the very first <section> */
section:first-of-type { ... }

/* Target the 2nd <section> */
section:nth-of-type(2) { ... }
```
Swap `section` with whatever repeated element you're dealing with. Count from the end if the element's position at the start might change; count from the start if the opposite is true.

### Selector Specificity Reminder

When two rules conflict, the more specific one wins:

| Selector | Specificity |
|----------|------------|
| `article` (element) | 0-0-1 |
| `.task1` (class) | 0-1-0 |
| `#myId` (id) | 1-0-0 |
| `article:nth-last-of-type(2) .task1 div` | 0-1-3 (1 pseudo-class + 1 class + 2 elements) |

Pseudo-classes (`:hover`, `:nth-child()`) count as classes (0-1-0 each).
Pseudo-elements (`::before`, `::after`) count as elements (0-0-1 each).

**How to reuse:** If your styles aren't applying, it's almost always a specificity fight. Count the specificity of both selectors and the higher one wins. Quick trick -- if you need to bump specificity without changing meaning, chain a pseudo-class that's always true:
```css
/* Original: specificity 0-1-0 */
.card { color: blue; }

/* Boosted: specificity 0-2-0 (wins over the above) */
.card:not(#_) { color: red; }
```
`:not(#_)` matches everything (no element has id `_`) but adds specificity. Use sparingly -- it's a hack, but it's handy on exams.

---

## 3. Part 1 Breakdown: Pseudo-Classes

### Task 1 -- Background/Color Setup (2 pts)

**Requirement:** The colors are swapped between the two parts. Part 1's background = Part 2's subblock background, and vice versa.

```css
/* Part 1 outer block: dark brown background, light text */
article:nth-last-of-type(2) {
    background-color: rgb(66, 37, 2);
    color: rgb(245, 201, 147);
}

/* Part 1 inner subblocks: light background, dark text */
article:nth-last-of-type(2) .task1,
article:nth-last-of-type(2) .task2 {
    margin: 6px;
    padding: 5px;
    border: 3px solid transparent;   /* <-- placeholder border so layout doesn't shift on hover */
    background-color: rgb(245, 201, 147);
    color: rgb(66, 37, 2);
}

/* Part 1 heading is italic */
article:nth-last-of-type(2) h2 {
    font-style: italic;
}
```

**WHY each property:**

| Property | Why It's Here |
|----------|--------------|
| `background-color: rgb(66, 37, 2)` | Dark brown -- the Part 1 outer color |
| `color: rgb(245, 201, 147)` | Light tan text -- contrasts with dark bg |
| `margin: 6px` | Spacing between subblocks |
| `padding: 5px` | Inner breathing room inside subblocks |
| `border: 3px solid transparent` | **Critical trick!** Reserves space for the hover border so the layout doesn't jump when border appears |
| `font-style: italic` | Makes the heading italic per the sketch |

**The transparent border trick** is a pattern you should memorize:
> If you plan to show a border on hover, always set `border: Xpx solid transparent` in the default state. Otherwise the element will "jump" when the border appears because it adds to the box size.

**How to reuse:** Anytime you're doing a "color theme swap" between two sections, set up the outer container with color A and inner blocks with color B, then flip them for the other section. The transparent-border trick works for any hover/focus border reveal:
```css
/* Default: invisible border reserves space */
.card {
    border: 2px solid transparent;
    background-color: #fff;
    color: #333;
}
/* Hover: border appears with no layout shift */
.card:hover {
    border: 2px solid dodgerblue;
}
```

---

### Task 2 -- Hover Opacity + Borders (1 pt)

**Requirement:** When hovering over ANY Part block, all subblocks fade out (opacity), but the one you're actually hovering stays fully visible and gets a colored border.

```css
/* When hovering the Part 1 article, ALL subblocks get semi-transparent */
article:nth-last-of-type(2):hover .task1,
article:nth-last-of-type(2):hover .task2 {
    opacity: 0.5;
}

/* But the specific subblock you're hovering gets full opacity + red border */
article:nth-last-of-type(2) .task1:hover,
article:nth-last-of-type(2) .task2:hover {
    opacity: 1;
    border: 3px solid red;
}
```

**How this two-step hover trick works:**

1. `article:hover .task1` -- when the mouse is anywhere on the article, fade everything
2. `.task1:hover` -- but the specific subblock being hovered overrides back to full opacity

This works because `.task1:hover` is more specific (it has the `:hover` on the child itself), so it wins.

**Part 2 uses the same pattern but with a dotted pink border:**

```css
article:nth-last-of-type(1):hover .task1,
article:nth-last-of-type(1):hover .task2,
article:nth-last-of-type(1):hover .task3 {
    opacity: 0.5;
}

article:nth-last-of-type(1) .task1:hover,
article:nth-last-of-type(1) .task2:hover,
article:nth-last-of-type(1) .task3:hover {
    opacity: 1;
    border: 3px dotted pink;
}
```

**Reusable pattern -- "Highlight active, fade inactive":**
```css
/* Step 1: parent hover fades all children */
.parent:hover .child { opacity: 0.5; }
/* Step 2: hovered child restores itself */
.parent .child:hover { opacity: 1; border: 3px solid red; }
```

---

### Task 3 -- Speech Bubble (3 pts)

**Requirement:** A hidden speech bubble appears on hover, with a triangular arrow pointing down.

```css
/* The speech bubble div -- hidden by default */
article:nth-last-of-type(2) .task1 div {
    opacity: 0;
    position: relative;       /* needed so the arrow (::after) can be positioned absolutely */
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 15px;
    width: fit-content;        /* bubble shrinks to fit its text */
    border-radius: 18px;       /* rounded corners */
    padding: 6px;
    background-color: orange;
}

/* Show bubble on hover */
article:nth-last-of-type(2) .task1:hover div {
    opacity: 1;
}

/* The triangular arrow pointing down from the bubble */
article:nth-last-of-type(2) .task1 div::after {
    content: "";                /* must have content to render */
    position: absolute;
    top: 100%;                  /* places it right below the bubble */
    left: 90px;                 /* horizontal offset */
    border-width: 10px;
    border-style: solid;
    border-color: orange transparent transparent transparent;
}
```

**The CSS Triangle Trick (memorize this!):**

A CSS triangle is made by:
1. Creating an element with **zero width and height** (the `::after` has no explicit `width`/`height`, only borders)
2. Setting thick borders on all sides
3. Making three sides `transparent` and one side colored

```
border-color: orange transparent transparent transparent;
```
- `top border` = orange (visible -- forms the downward-pointing triangle)
- `right border` = transparent
- `bottom border` = transparent
- `left border` = transparent

The triangle points **opposite** to the colored side:
| Colored Side | Triangle Points |
|-------------|----------------|
| `top` | Down |
| `bottom` | Up |
| `left` | Right |
| `right` | Left |

**Why `position: relative` on the parent?**
Because `::after` uses `position: absolute`, which positions relative to the nearest positioned ancestor. Without `position: relative` on the bubble div, the arrow would fly off to some unexpected place.

**Why `width: fit-content`?**
Makes the bubble exactly as wide as its text, rather than stretching to fill the container.

**How to reuse:** Need a tooltip, popover, or any show-on-hover element? This is your template. Swap the trigger, swap the content, adjust the arrow direction:
```css
/* Generic tooltip pattern */
.tooltip-trigger {
    position: relative;
}
.tooltip-trigger .tooltip {
    opacity: 0;
    position: absolute;
    bottom: 100%;       /* above the trigger instead of below */
    left: 0;
    background: #333;
    color: #fff;
    border-radius: 6px;
    padding: 4px 8px;
    width: fit-content;
}
.tooltip-trigger:hover .tooltip {
    opacity: 1;
}
/* Arrow pointing DOWN (toward the trigger) */
.tooltip-trigger .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 20px;
    border-width: 6px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}
```

---

### Task 4 -- List Styling with Pseudo-Classes (3 pts)

**Requirement:** Style specific list items using pseudo-classes, not by changing HTML.

```css
/* First element -- highlighted background */
article:nth-last-of-type(2) .task2 li:first-child {
    width: fit-content;
    background-color: orange;
    color: brown;
}

/* All elements EXCEPT .special -- brown text */
article:nth-last-of-type(2) .task2 li:not(.special) {
    color: brown;
}

/* 4th element -- italic */
article:nth-last-of-type(2) .task2 li:nth-child(4) {
    font-style: italic;
}

/* All odd elements -- bold */
article:nth-last-of-type(2) .task2 li:nth-child(odd) {
    font-weight: bold;
}
```

**Pseudo-class cheat sheet for list targeting:**

| Pseudo-class | What It Selects | In This List (5 items) |
|-------------|----------------|----------------------|
| `:first-child` | 1st child | elem1 |
| `:last-child` | Last child | elem5 |
| `:nth-child(4)` | Exactly the 4th | elem4 |
| `:nth-child(odd)` | 1st, 3rd, 5th... | elem1, elem3, elem5 |
| `:nth-child(even)` | 2nd, 4th... | elem2, elem4 |
| `:not(.special)` | All except `.special` | elem1, elem2, elem4, elem5 |

**Why `:not(.special)` instead of listing every other item?**
It's a "negative pseudo-class" -- much cleaner than writing 4 separate selectors. If items are added later, it automatically excludes only `.special`.

**How to reuse:** This combo of pseudo-classes covers almost any "style specific items in a list" scenario you'll run into. Mix and match:
```css
/* Zebra-stripe a table */
tr:nth-child(even) { background-color: #f2f2f2; }

/* Style everything except the "active" item */
.nav-item:not(.active) { opacity: 0.6; }

/* Bold the first and last items only */
li:first-child, li:last-child { font-weight: bold; }

/* Every 3rd item starting from the 2nd */
li:nth-child(3n+2) { color: red; }
```

---

## 4. Part 2 Breakdown: Pseudo-Elements

### Part 2 Base Styling

Same swapped-color pattern as Part 1, but reversed:

```css
article:nth-last-of-type(1) {
    background-color: rgb(245, 201, 147);  /* light outer */
    color: rgb(66, 37, 2);                  /* dark text */
}

article:nth-last-of-type(1) .task1,
article:nth-last-of-type(1) .task2,
article:nth-last-of-type(1) .task3 {
    margin: 6px;
    border: 3px solid transparent;
    background-color: rgb(66, 37, 2);       /* dark subblocks */
    color: rgb(245, 201, 147);              /* light text */
}

article:nth-last-of-type(1) h3 {
    font-style: italic;
}
```

**How to reuse:** The "inverted color scheme" pattern is great for visually separating sections. Just define two color pairs and swap them:
```css
/* Section A: dark outer, light inner */
.section-a { background: #2c3e50; color: #ecf0f1; }
.section-a .card { background: #ecf0f1; color: #2c3e50; }

/* Section B: light outer, dark inner (swapped!) */
.section-b { background: #ecf0f1; color: #2c3e50; }
.section-b .card { background: #2c3e50; color: #ecf0f1; }
```

---

### Task 5 -- Custom Blockquote (3 pts + 1 pt hover)

**Requirement:** Add decorative open/close quote marks as circles positioned at top-left and bottom-right of the blockquote. On hover, quotes and heading change color.

```css
/* The blockquote itself */
article:nth-last-of-type(1) .task1 blockquote {
    position: relative;      /* anchor for the quote circles */
    font-style: italic;
    width: 500px;
    margin-left: 60px;       /* room for the left quote circle */
    margin-right: 60px;      /* room for the right quote circle */
}

/* Opening quote mark (top-left circle) */
article:nth-last-of-type(1) .task1 blockquote::before {
    content: "\201C";         /* Unicode left double quotation mark */
    position: absolute;
    top: -20px;
    left: -40px;
    width: 40px;
    height: 40px;
    background-color: orange;
    border-radius: 50%;       /* makes it a perfect circle */
    color: white;
    font-size: 24px;
    text-align: center;
    line-height: 40px;        /* vertically centers the quote mark */
}

/* Closing quote mark (bottom-right circle) */
article:nth-last-of-type(1) .task1 blockquote::after {
    content: "\201D";         /* Unicode right double quotation mark */
    position: absolute;
    bottom: -20px;
    right: -30px;
    width: 40px;
    height: 40px;
    background-color: orange;
    border-radius: 50%;
    color: white;
    font-size: 24px;
    text-align: center;
    line-height: 40px;
}
```

**The Circle Pattern:**
```css
width: 40px;
height: 40px;
border-radius: 50%;  /* this is what makes it a circle */
```
Any element with equal `width` and `height` + `border-radius: 50%` becomes a perfect circle.

**Centering text inside a circle:**
```css
text-align: center;           /* horizontal centering */
line-height: 40px;            /* vertical centering -- match the height */
```
Setting `line-height` equal to the element's `height` vertically centers a single line of text.

**Unicode content values:**
| Code | Character | Name |
|------|-----------|------|
| `\201C` | " | Left double quotation mark |
| `\201D` | " | Right double quotation mark |
| `\263A` | :) (smiley) | White smiling face |
| `\2714` | checkmark | Heavy check mark |
| `\2716` | X mark | Heavy multiplication X |

**Hover: the `:has()` pseudo-class**

```css
/* When blockquote is hovered, change the h4 heading color */
article:nth-last-of-type(1) .task1:has(blockquote:hover) h4 {
    color: rgb(184, 59, 2);
}

/* When blockquote is hovered, change the quote circles */
article:nth-last-of-type(1) .task1 blockquote:hover::before,
article:nth-last-of-type(1) .task1 blockquote:hover::after {
    background-color: rgb(184, 59, 2);
}
```

**Why `:has()` is special:**
Normal CSS can only style elements based on their parents/siblings, not their children. `:has()` breaks that rule:

```css
/* "Select .task1 that HAS a blockquote being hovered" */
.task1:has(blockquote:hover) h4 { ... }
```

This lets you style the `h4` (which is a sibling of `blockquote`) based on whether `blockquote` is being hovered. Without `:has()`, you'd need JavaScript.

**Pattern:** `:has()` = "parent selector" -- select an ancestor based on the state of a descendant.

**How to reuse:** The blockquote decoration pattern (circles with icons at the corners) works for any "decorated container" scenario. The `:has()` trick is the real gem -- use it whenever you need to style element A based on the state of element B, and B is a descendant of some shared parent:
```css
/* Decorate any container with corner badges */
.quote-box {
    position: relative;
    margin: 0 50px;        /* leave room for the badges */
}
.quote-box::before {
    content: "\2605";      /* star icon */
    position: absolute;
    top: -15px; left: -30px;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: gold;
    text-align: center;
    line-height: 30px;
}

/* :has() -- change a sibling's style based on a child's state */
.form-group:has(input:focus) label {
    color: blue;           /* label turns blue when its sibling input is focused */
}
```

---

### Task 6 -- Custom List Markers (2 pts)

**Requirement:** Replace the bullet marker on even list items with a smiley face emoji.

```css
article:last-of-type .task2 ul li:nth-child(even)::marker {
    content: "\263A";    /* smiley face */
    font-size: 1.2em;
}
```

**What is `::marker`?**
The `::marker` pseudo-element targets the bullet/number that appears before list items. You can change its `content`, `color`, `font-size`, and a few other properties.

**Key limitation:** `::marker` only supports a limited set of CSS properties (`color`, `content`, `font-*`, `direction`, `unicode-bidi`, `animation/transition` properties). You can't set `background-color` or `width` on it.

**Why `\263A`?** It's the Unicode smiley face. Using `content` on `::marker` replaces the default bullet entirely.

**Why `:nth-child(even)`?** Targets items 2, 4, 6... -- in this list that means elem2 and elem4.

Note the selector uses `article:last-of-type` -- this is equivalent to `article:nth-last-of-type(1)`. Both select the last article.

**How to reuse:** Want to swap out bullets with any icon/emoji? Just change the Unicode value in `content`. This works on any `<li>`:
```css
/* Checkmark bullets on all items */
ul.done-list li::marker {
    content: "\2714 ";     /* checkmark + space */
    color: green;
}

/* Arrow bullets on every 3rd item */
ul li:nth-child(3n)::marker {
    content: "\27A4 ";     /* right-pointing arrow */
    font-size: 1.1em;
}
```
Remember: `::marker` only supports `content`, `color`, `font-*`, and a few animation properties. For full control, hide `list-style` and use `::before` instead.

---

### Task 7 -- Right/Wrong Answer Overlays (5 pts)

This is the most complex task. It has three sub-parts.

**Sub-part A: Highlighted header text with `::before` and `::after` (1 pt)**

```css
/* ">> " before the "Right" span */
article:nth-last-of-type(1) .task3 span:first-child::before {
    content: ">> ";
}

/* " / " after the "Right" span (between Right and Wrong) */
article:nth-last-of-type(1) .task3 span:first-child::after {
    content: " / ";
}
```

This turns `<span>Right</span><span>Wrong</span> answers` into the visual output: `>> Right / Wrong answers`

**How to reuse:** Anytime you need to inject decorative text around an element without touching the HTML, use `::before` and `::after` with `content`:
```css
/* Wrap any element in brackets */
.tag::before { content: "["; }
.tag::after  { content: "]"; }

/* Add a "NEW" badge before a heading */
h2.new::before {
    content: "NEW ";
    color: red;
    font-weight: bold;
}
```

**Sub-part B: Overlay cross and checkmark icons (2 pts)**

```css
/* Shared styles for both answer blocks */
article:nth-last-of-type(1) .task3 .wrong,
article:nth-last-of-type(1) .task3 .correct {
    position: relative;     /* anchor for the overlay icon */
    padding: 15px;
    margin: 10px 0;
    background-color: brown;
    width: 900px;
}

/* Red X over the wrong answer */
article:nth-last-of-type(1) .task3 .wrong::after {
    content: "\2716";        /* heavy X mark */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);   /* vertical centering */
    font-size: 80px;
    color: red;
}

/* Green checkmark over the correct answer */
article:nth-last-of-type(1) .task3 .correct::after {
    content: "\2714";        /* heavy check mark */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    font-size: 80px;
    color: green;
}
```

**The centering pattern used here:**
```css
position: absolute;
top: 50%;                    /* moves top edge to vertical center */
left: 50%;                   /* moves left edge to horizontal center */
transform: translateY(-50%); /* shifts up by half its own height */
```

Note: only `translateY` is used here, not `translate(-50%, -50%)`. That means horizontally the icon sits at 50% from the left (its left edge at center), but vertically it is truly centered. This is intentional per the design -- the icon overlaps the middle of the text.

**How to reuse:** This "overlay icon on a block" pattern works for any status indicator, watermark, or badge you want to plop on top of content:
```css
/* "SOLD" watermark over a product card */
.product.sold {
    position: relative;
}
.product.sold::after {
    content: "SOLD";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* fully centered both ways */
    font-size: 3em;
    color: rgba(255, 0, 0, 0.6);
    font-weight: bold;
}
```

**Sub-part C: Interactive hover -- sibling selector magic (2 pts)**

```css
/* Hovering "Right" highlights the correct answer */
article:last-of-type .task3 span:first-child:hover {
    background-color: rgb(184, 59, 2);
}
article:last-of-type .task3 span:first-child:hover ~ .correct {
    background-color: rgb(184, 59, 2);
}

/* Hovering "Wrong" highlights the wrong answer */
article:last-of-type .task3 span:last-of-type:hover {
    background-color: rgb(184, 59, 2);
}
article:last-of-type .task3 span:last-of-type:hover ~ .wrong {
    background-color: rgb(184, 59, 2);
}
```

**The `~` (general sibling combinator):**

`A ~ B` selects all `B` elements that are **siblings** of `A` and come **after** it in the HTML.

```
span:first-child:hover ~ .correct
```
Translation: "When the first span is hovered, select any `.correct` sibling that comes after it."

This works because in the HTML, the `<span>` elements come before `.wrong` and `.correct` divs -- they are all siblings inside `.task3`.

**Key limitation of `~`:** It only works **forward** (can only select later siblings). You cannot style a previous sibling with CSS alone.

**How to reuse:** The sibling-selector hover pattern is perfect for any "click/hover label to highlight a related block" UI:
```css
/* Hovering a tab label highlights the matching content panel */
.tab-label:first-child:hover ~ .panel-1 {
    background-color: lightyellow;
}
.tab-label:nth-child(2):hover ~ .panel-2 {
    background-color: lightyellow;
}
```
Just make sure the trigger element comes **before** the target in the HTML -- `~` can't look backwards.

---

## 5. CSS Properties Reference (Every Property Used)

### Color & Background

| Property | Values Used | What It Does |
|----------|-----------|-------------|
| `background-color` | `rgb(66, 37, 2)`, `rgb(245, 201, 147)`, `orange`, `brown`, `rgb(184, 59, 2)` | Sets the background fill color |
| `color` | `rgb(245, 201, 147)`, `rgb(66, 37, 2)`, `brown`, `white`, `red`, `green`, `rgb(184, 59, 2)` | Sets the text/foreground color |
| `opacity` | `0`, `0.5`, `1` | Controls transparency. `0` = invisible, `0.5` = half-see-through, `1` = fully visible |

### Box Model

| Property | Values Used | What It Does |
|----------|-----------|-------------|
| `margin` | `6px`, `10px 0`, `15px` | Space **outside** the element's border |
| `margin-top/left/right/bottom` | `15px`, `60px`, `-20px` etc. | Individual margin sides |
| `padding` | `5px`, `6px`, `15px` | Space **inside** the element's border |
| `border` | `3px solid transparent`, `3px solid red`, `3px dotted pink` | Border line around the element |
| `border-width` | `10px` | Thickness of border (used for CSS triangle) |
| `border-style` | `solid`, `dotted` | Line style of border |
| `border-color` | `orange transparent transparent transparent` | Color per side (top right bottom left) |
| `border-radius` | `18px`, `50%` | Rounds corners. `50%` on a square = circle |
| `width` | `fit-content`, `500px`, `900px`, `40px` | Element width |
| `height` | `40px` | Element height |

### Typography

| Property | Values Used | What It Does |
|----------|-----------|-------------|
| `font-style` | `italic` | Makes text italic |
| `font-weight` | `bold` | Makes text bold |
| `font-size` | `24px`, `80px`, `1.2em` | Text size. `em` is relative to parent font size |
| `text-align` | `center` | Horizontally centers inline content |
| `line-height` | `40px` | Space between lines; when equal to `height`, vertically centers single-line text |

### Positioning

| Property | Values Used | What It Does |
|----------|-----------|-------------|
| `position` | `relative`, `absolute` | Controls positioning method |
| `top` | `100%`, `50%`, `-20px` | Offset from top edge |
| `bottom` | `-20px` | Offset from bottom edge |
| `left` | `90px`, `50%`, `-40px` | Offset from left edge |
| `right` | `-30px` | Offset from right edge |
| `transform` | `translateY(-50%)` | Shifts element relative to its own size |

### Generated Content

| Property | Values Used | What It Does |
|----------|-----------|-------------|
| `content` | `""`, `"\201C"`, `"\201D"`, `"\263A"`, `"\2716"`, `"\2714"`, `">> "`, `" / "` | Required for `::before`/`::after`/`::marker` to render. Can be text, Unicode, or empty string |

**How to reuse:** This table is your quick-lookup. When you're writing CSS for a new project and forget a property name, scan the relevant group. A couple of combos that come up all the time:
```css
/* Fading card with rounded border that appears on hover */
.card {
    opacity: 1;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 16px;
    transition: opacity 0.3s;         /* smooth fade -- not in this assignment but pairs nicely */
}
.card:hover {
    border-color: orange;
}
```

---

## 6. Selectors Deep Dive

### Types of Selectors Used in This Assignment

| Type | Example | Meaning |
|------|---------|---------|
| **Element** | `article` | All `<article>` elements |
| **Class** | `.task1` | All elements with `class="task1"` |
| **Descendant** (space) | `article .task1` | `.task1` anywhere inside `article` |
| **Child** (>) | Not used here, but: `ul > li` | `li` that is a direct child of `ul` |
| **General sibling** (~) | `span:hover ~ .correct` | `.correct` elements that are later siblings of the hovered span |
| **Comma** (,) | `.task1, .task2` | Either `.task1` OR `.task2` |

### Contextual Selector Combinator Summary

```
A B     /* B anywhere inside A (descendant) */
A > B   /* B directly inside A (child) */
A + B   /* B immediately after A (adjacent sibling) */
A ~ B   /* B anywhere after A at the same level (general sibling) */
```

**How to reuse:** When you're stuck on a selector, walk through this checklist in order:
1. Can I target it with a class/ID? (simplest)
2. Is it a descendant? Use `A B`.
3. Is it a direct child? Use `A > B`.
4. Is it a later sibling? Use `A ~ B` (any) or `A + B` (immediately next).
5. Need to distinguish identical elements? Use `:nth-of-type()` / `:nth-child()`.
6. Need to style based on a child's state? Use `:has()`.

```css
/* Example: style only direct-child paragraphs, not nested ones */
.content > p { margin-bottom: 1em; }

/* Example: style the element immediately after an image */
img + figcaption { font-style: italic; }
```

---

## 7. Pseudo-Classes Reference

Pseudo-classes select elements based on **state** or **position**. They use a single colon `:`.

### Used in This Assignment

| Pseudo-Class | What It Does | Example from Assignment |
|-------------|-------------|----------------------|
| `:hover` | Element under mouse cursor | `.task1:hover { opacity: 1; }` |
| `:first-child` | First child of its parent | `li:first-child` -- selects elem1 |
| `:last-of-type` | Last element of its type among siblings | `article:last-of-type` -- the Part 2 article |
| `:nth-child(n)` | The nth child | `li:nth-child(4)` -- selects elem4 |
| `:nth-child(odd)` | Odd-numbered children (1, 3, 5...) | `li:nth-child(odd)` -- selects elem1, elem3, elem5 |
| `:nth-child(even)` | Even-numbered children (2, 4, 6...) | `li:nth-child(even)` -- selects elem2, elem4 |
| `:nth-last-of-type(n)` | nth from the end, by type | `article:nth-last-of-type(2)` -- Part 1 |
| `:not(selector)` | Everything that does NOT match | `li:not(.special)` -- all li except elem3 |
| `:has(selector)` | Parent contains matching descendant | `.task1:has(blockquote:hover)` -- task1 when its blockquote is hovered |

### How `:nth-child()` Works

The formula is `an + b`:
- `:nth-child(odd)` = `:nth-child(2n + 1)` -- every other starting at 1
- `:nth-child(even)` = `:nth-child(2n)` -- every other starting at 2
- `:nth-child(3)` -- exactly the 3rd child
- `:nth-child(3n)` -- every 3rd child (3, 6, 9...)

### `:nth-child` vs `:nth-of-type`

- `:nth-child(2)` -- the 2nd child regardless of element type
- `:nth-of-type(2)` -- the 2nd child **of that element type**

In this assignment, all list items are `<li>` so both would work the same. But be careful when mixing element types.

**How to reuse:** Here's a decision-tree for picking the right pseudo-class:
- **Exact position known?** Use `:nth-child(3)` or `:first-child` / `:last-child`.
- **Pattern-based?** Use `:nth-child(odd)`, `:nth-child(even)`, or `:nth-child(An+B)`.
- **Exclude something?** Use `:not(.className)`.
- **Based on user interaction?** Use `:hover`, `:focus`, `:active`.
- **Based on a descendant's state?** Use `:has()`.
- **Mixed element types in the same parent?** Prefer `:nth-of-type()` over `:nth-child()`.

```css
/* Show a border on focus (for keyboard navigation) */
input:focus { outline: 2px solid blue; }

/* Highlight a row if it contains an error */
tr:has(td.error) { background-color: #ffe0e0; }
```

---

## 8. Pseudo-Elements Reference

Pseudo-elements create **virtual elements** that don't exist in the HTML. They use double colon `::`.

| Pseudo-Element | What It Creates | Must-Know Rule |
|---------------|----------------|----------------|
| `::before` | Content inserted before the element's content | **Must have `content` property** or it won't render |
| `::after` | Content inserted after the element's content | **Must have `content` property** or it won't render |
| `::marker` | The bullet/number of a list item | Only supports limited properties (`content`, `color`, `font-*`) |

### The Golden Rule

```css
/* This will NOT work -- nothing appears */
.element::before {
    background-color: red;
}

/* This WILL work -- even empty content makes it render */
.element::before {
    content: "";           /* <-- THIS LINE IS REQUIRED */
    background-color: red;
}
```

`content` is **mandatory** for `::before` and `::after`. Even `content: ""` (empty string) is fine if you just want a decorative box.

### `::before` / `::after` are inline by default

They behave like `<span>`. If you need them to have `width`/`height`, make them `display: block` or `display: inline-block`, or use `position: absolute` (which implicitly makes them block-level).

**How to reuse:** Pseudo-elements are your best friend for adding visual flair without touching HTML. The key rules to remember:
1. Always include `content` (even `content: ""`).
2. If you need width/height, also add `display: block` or `position: absolute`.
3. Use `::marker` only for bullet/number tweaks; for anything fancier, hide the default marker and use `::before`.

```css
/* Decorative underline using ::after */
.fancy-link {
    position: relative;
}
.fancy-link::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: orange;
}

/* Full-control custom bullet using ::before instead of ::marker */
ul.custom { list-style: none; }
ul.custom li::before {
    content: "\2605 ";   /* star */
    color: gold;
}
```

---

## 9. Positioning & Layout Patterns

### `position: relative` vs `position: absolute`

This assignment uses these two together extensively.

**`position: relative`:**
- Element stays in normal flow
- Creates a **positioning context** for absolute children
- You CAN use `top/left/bottom/right` to nudge it, but it still takes up its original space

**`position: absolute`:**
- Element is **removed** from normal flow (doesn't take up space)
- Positioned relative to the nearest ancestor with `position: relative` (or `absolute`/`fixed`)
- If no positioned ancestor exists, it positions relative to `<html>`

**The pattern used repeatedly in this assignment:**
```css
.parent {
    position: relative;   /* Step 1: make parent the reference point */
}
.parent::after {
    content: "";
    position: absolute;   /* Step 2: position child absolutely */
    top: 100%;            /* Step 3: place it (100% = just below parent) */
    left: 90px;
}
```

### Centering with `position: absolute` + `transform`

```css
.overlay {
    position: absolute;
    top: 50%;                       /* top edge at 50% of parent */
    left: 50%;                      /* left edge at 50% of parent */
    transform: translate(-50%, -50%); /* shift back by half of own size */
}
```

In this assignment, only `translateY(-50%)` was used (vertical centering only), leaving the horizontal position at the left edge of center.

**How to reuse:** These two patterns (relative/absolute anchoring and absolute+transform centering) show up everywhere. Adapt them to any scenario:
```css
/* Pin a badge to the top-right corner of a card */
.card { position: relative; }
.card .badge {
    position: absolute;
    top: -8px;
    right: -8px;
}

/* Perfectly center a loading spinner inside a container */
.container { position: relative; }
.container .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

---

## 10. Quick Copy Patterns

These are the most reusable patterns from this assignment. Copy and adapt them for exam questions.

---

### Pattern 1: Fade-Inactive-on-Hover

"When hovering a container, fade all children except the one being hovered."

```css
/* All children fade when parent is hovered */
.container:hover .item {
    opacity: 0.5;
}
/* The hovered child stays fully visible + gets a border */
.container .item:hover {
    opacity: 1;
    border: 3px solid red;       /* solid for one style */
    /* border: 3px dotted pink;  /* dotted for another */
}
/* IMPORTANT: set a transparent border in default state to prevent layout shift */
.container .item {
    border: 3px solid transparent;
}
```

---

### Pattern 2: CSS Triangle (Speech Bubble Arrow)

```css
.bubble {
    position: relative;
    background-color: orange;
    border-radius: 18px;
    padding: 6px;
}
/* Triangle pointing DOWN */
.bubble::after {
    content: "";
    position: absolute;
    top: 100%;          /* right below the bubble */
    left: 90px;         /* horizontal position */
    border-width: 10px;
    border-style: solid;
    border-color: orange transparent transparent transparent;
    /* Change which side is colored to change direction:
       Points DOWN:  top-color    transparent transparent transparent
       Points UP:    transparent transparent bottom-color transparent
       Points RIGHT: transparent transparent transparent left-color
       Points LEFT:  transparent right-color transparent transparent
    */
}
```

---

### Pattern 3: Show/Hide on Hover

```css
/* Hidden by default */
.hidden-thing {
    opacity: 0;
}
/* Visible when parent is hovered */
.parent:hover .hidden-thing {
    opacity: 1;
}
```

---

### Pattern 4: Decorative Circle with Centered Text

```css
.element::before {
    content: "\201C";       /* any Unicode character */
    position: absolute;
    top: -20px;
    left: -40px;
    width: 40px;
    height: 40px;
    background-color: orange;
    border-radius: 50%;     /* perfect circle */
    color: white;
    font-size: 24px;
    text-align: center;     /* horizontal center */
    line-height: 40px;      /* vertical center (match height) */
}
```

---

### Pattern 5: Overlay Icon on a Block

```css
.block {
    position: relative;
}
.block::after {
    content: "\2716";       /* or \2714 for checkmark */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    font-size: 80px;
    color: red;             /* or green */
}
```

---

### Pattern 6: Custom List Markers

```css
/* Replace bullet with emoji on even items */
ul li:nth-child(even)::marker {
    content: "\263A";       /* smiley face */
    font-size: 1.2em;
}
```

---

### Pattern 7: Sibling Selector Interaction

"Hovering one element changes the style of a later sibling."

```css
/* Hovering span changes a later sibling div */
.container span:hover ~ .target-div {
    background-color: rgb(184, 59, 2);
}
```
Remember: `~` only works **forward** (later siblings). The trigger element must appear **before** the target in the HTML.

---

### Pattern 8: `:has()` -- Style Parent Based on Child State

```css
/* When blockquote inside .task1 is hovered, style the h4 inside .task1 */
.task1:has(blockquote:hover) h4 {
    color: rgb(184, 59, 2);
}
```

`:has()` is the only way in pure CSS to style an ancestor/sibling based on a descendant's state.

---

### Pattern 9: Injecting Text with `::before` and `::after`

```css
/* Add ">> " before and " / " after an element */
.label::before {
    content: ">> ";
}
.label::after {
    content: " / ";
}
```

---

### Pattern 10: Targeting Elements Without IDs or Unique Classes

When multiple elements share the same class/structure, use positional pseudo-classes:

```css
/* Target by position from end */
article:nth-last-of-type(2)    /* second-to-last article */
article:nth-last-of-type(1)    /* last article (same as :last-of-type) */

/* Target by position from start */
article:nth-of-type(1)         /* first article (same as :first-of-type) */

/* Target specific children */
li:first-child                 /* first li */
li:nth-child(4)                /* 4th li */
li:nth-child(odd)              /* 1st, 3rd, 5th li */
li:not(.special)               /* all li except the one with class="special" */
```

---

## Exam Tips

1. **Always set `content` on `::before`/`::after`** -- even if empty (`content: ""`). Without it, nothing renders.

2. **Use transparent borders as placeholders** when you plan to show borders on hover. This prevents layout jumping.

3. **`position: relative` on parent + `position: absolute` on child** is the fundamental pattern for placing elements precisely.

4. **CSS triangles** = zero-size element + thick borders + three transparent sides.

5. **`:has()` is the "parent selector"** -- the only way to style ancestors based on descendants in pure CSS.

6. **`~` general sibling combinator** only selects **later** siblings, never earlier ones.

7. **`::marker`** is limited in what properties it supports -- mainly `content`, `color`, and `font-*`.

8. **`border-radius: 50%`** on a square element = perfect circle.

9. **`line-height` equal to `height`** = vertical centering for single-line text.

10. **`width: fit-content`** makes an element shrink-wrap its content instead of taking full width.

---

*Good luck on the midterm!*
