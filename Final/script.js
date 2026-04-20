let hannahDishs = [
  {
    dish: 'Cheesy Pesto Chicken Bake',
    category: 'Dinner',
    image:
      'https://www.maryswholelife.com/wp-content/uploads/2025/05/Cheesy-Pesto-Chicken-Bake-09.jpg',
    descr:
      'This cheesy pesto chicken bake is a delicious and easy-to-make dish that combines tender chicken breasts with a flavorful pesto sauce and melted cheese. It’s perfect for a weeknight dinner or a weekend meal.',
  },
  {
    dish: 'Tomato soup and grilled cheese',
    category: 'Dinner',
    image:
      'https://diethood.com/wp-content/uploads/2025/06/tomato-soup-grilled-cheese-recipe-by-diethood.jpg',
    descr:
      'This classic comfort food combination is a perfect meal for a cozy day. The creamy tomato soup pairs perfectly with the crispy, gooey grilled cheese sandwich, making it a satisfying and delicious option for lunch or dinner.',
  },
  {
    dish: 'Zaatar Sandwindich',
    category: 'Sandwichs',
    image:
      'https://urbanfarmandkitchen.com/wp-content/uploads/2023/08/manakish-zaatar-2.jpg',
    descr:
      'This Zaatar sandwich is a delicious and flavorful Middle Eastern dish that features a flatbread filled with a mixture of zaatar (a blend of herbs and spices), olive oil, and sometimes cheese or vegetables.',
  },
];

class Category {
  constructor(category) {
    this.category = category;
  }

  render() {
    const btnHtml = `<button class="categoryBtn" data-category="${this.category}">${this.category}</button>`;
    $('#dishPanel').append(btnHtml);
  }
}

function generateButtons() {
  const categories = [];
  hannahDishs.forEach(dish => {
    if (!categories.includes(dish.category)) {
      categories.push(dish.category);
    }
  });

  categories.forEach(cat => {
    const c = new Category(cat);
    c.render();
  });
}

generateButtons();

class Dish {
  constructor(dish, category, image, descr) {
    this.dish = dish;
    this.category = category;
    this.image = image;
    this.descr = descr;
  }

  render() {
    const dishHtml = `
      <article class="dishCard">
        <h2>${this.dish}</h2>
        <img src="${this.image}" alt="${this.dish}" />
        <p>${this.descr}</p>
      </article>
    `;
    $('#dishDesc').append(dishHtml);
  }
}

$('#dishPanel').on('click', '.categoryBtn', function () {
  const category = $(this).data('category');

  $('.categoryBtn').css('box-shadow', 'none');
  $(this).css('box-shadow', '6px 6px');

  $('#dishDesc').empty();

  hannahDishs
    .filter(d => d.category === category)
    .forEach(d => {
      const dish = new Dish(d.dish, d.category, d.image, d.descr);
      dish.render();
    });
});
