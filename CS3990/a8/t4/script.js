let myFruits = [
  { fruit: 'apple', color: 'red' },
  { fruit: 'pear', color: 'green' },
  { fruit: 'mango', color: 'red' },
  { fruit: 'plum', color: 'blue' },
];

// Part A: Fruit class
class Fruit {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  show() {
    this.element = document.createElement('li');
    this.element.textContent = this.name;
    this.element.style.backgroundColor = this.color;
    this.element.setAttribute('data-color', this.color);
    document.querySelector('#fruits ul').appendChild(this.element);
  }
}

// Part B: btnColor class
class btnColor {
  constructor(color) {
    this.color = color;
  }

  show() {
    this.element = document.createElement('button');
    this.element.textContent = this.color;
    this.element.style.backgroundColor = this.color;
    document.querySelector('#colors').appendChild(this.element);
  }
}

// Part C: jQuery event delegation for color buttons
$('#colors').on('click', 'button', function () {
  let color = $(this).text();
  $('#fruits li').css('box-shadow', 'none');
  $('#fruits li[data-color="' + color + '"]').css(
    'box-shadow',
    '5px 5px 10px black'
  );
});

// Part D: RatedFruit class (extends Fruit)
class RatedFruit extends Fruit {
  constructor(name, color, rating) {
    super(name, color);
    this.rating = rating;
  }

  show() {
    super.show();
    let starContainer = document.createElement('span');
    starContainer.className = 'star-rating';
    starContainer.textContent = ' Star Rating: ';
    for (let i = 1; i <= 5; i++) {
      let star = document.createElement('span');
      star.className = 'star';
      star.textContent = '\u2605';
      star.style.color = i <= this.star ? 'orange' : 'black';
      starContainer.appendChild(star);
    }
    this.element.appendChild(starContainer);
  }
}

// jQuery event delegation for stars
$('#fruits').on('click', '.star', function () {
  $(this).css('color', 'orange');
  $(this).prevAll('.star').css('color', 'orange');
  $(this).nextAll('.star').css('color', 'black');
});

// Generate everything
myFruits.forEach(f => {
  let fruit = new RatedFruit(f.fruit, f.color, 3);
  fruit.show();
});

// Get unique colors and create buttons
let uniqueColors = [...new Set(myFruits.map(f => f.color))];
uniqueColors.forEach(c => {
  let btn = new btnColor(c);
  btn.show();
});
