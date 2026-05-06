let toggle = document.getElementById('menu-toggle');
let list = document.getElementById('sweeties');
let image = document.getElementById('sweet-image');
let isOpen = false;

toggle.addEventListener('click', () => {
  isOpen = !isOpen;
  if (isOpen) {
    toggle.textContent = '▼ Sweeties (click me)!';
    list.classList.remove('hidden');
  } else {
    toggle.textContent = '▶ Sweeties (click me)!';
    list.classList.add('hidden');
    image.classList.add('hidden');
    let items = list.querySelectorAll('li');
    items.forEach(li => li.classList.remove('selected'));
  }
});

list.addEventListener('click', event => {
  if (event.target.tagName !== 'LI') return;

  let items = list.querySelectorAll('li');
  items.forEach(li => li.classList.remove('selected'));

  event.target.classList.add('selected');
  image.src = event.target.dataset.sweet + '.png';
  image.classList.remove('hidden');
});
