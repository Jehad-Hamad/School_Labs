class NumberGenerator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.number = 0;
    this.render();
  }

  render() {
    // Down arrow button
    let downButton = document.createElement('button');
    downButton.textContent = '⬇';
    downButton.addEventListener('click', () => {
      if (this.number > 0) this.number -= 1;
      this.numberDisplay.textContent = this.number;
      this.updateNews();
    });
    this.container.appendChild(downButton);

    // Number display
    this.numberDisplay = document.createElement('span');
    this.numberDisplay.textContent = this.number;


    this.container.appendChild(this.numberDisplay);

    // Up arrow button
    let upButton = document.createElement('button');
    upButton.textContent = '⬆';
    upButton.addEventListener('click', () => {
      if (this.number < 100) this.number += 1;
      this.numberDisplay.textContent = this.number;
      this.updateNews();
    });
    this.container.appendChild(upButton);

    // Generate button
    let generateButton = document.createElement('button');
    generateButton.textContent = 'Make your number now!';
    generateButton.style.display = 'block';
    generateButton.style.margin = '5px auto';
    generateButton.addEventListener('click', () => {
      this.number = Math.floor(Math.random() * 101);
      this.numberDisplay.textContent = this.number;
      this.updateNews();
    });
    this.container.appendChild(generateButton);
  }

  updateNews() {
    generateNews(this.number);
  }
}

function generateNews(count) {
  let newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    let newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    let title = document.createElement('h3');
    title.textContent = 'Title #' + i;
    newsItem.appendChild(title);

    let text = document.createElement('p');
    text.className = 'text-item';
    text.textContent =
      'It has to get better. It has to get better. It has to get better.';
    newsItem.appendChild(text);

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove 🗑';
    removeBtn.addEventListener('click', () => {
      newsItem.remove();
    });
    newsItem.appendChild(removeBtn);

    newsContainer.appendChild(newsItem);
  }
}

// Start everything
const gen = new NumberGenerator('generator');
