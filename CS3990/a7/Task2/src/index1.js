let arrRecourses = [
  {
    srcImg: 'Images/1.png',
    newsTitle: 'FISHHHH',
    newsContent: 'I LOVE FISH',
  },
  {
    srcImg: 'Images/2.png',
    newsTitle: 'CATTT',
    newsContent: 'I LOVE CATSSS SO MUCH',
  },
  {
    srcImg: 'Images/3.png',
    newsTitle: 'THE GOAT',
    newsContent: 'IT MUST GET BETTER IT HAS TO GET BETTER SO ELSE',
  },
];

class News {
  constructor(title, imgSrc, content, id) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.content = content;
    this.likes = 0;
    this.id = id;
  }

  render() {
    return `
			<div id="news-${this.id}">
				<h3 id="title-${this.id}">${this.title}</h3>
				<span id="likes-${this.id}"></span>
				<br>
				<img id="img-${this.id}" src="${this.imgSrc}" width="200">
				<p id="text-${this.id}">${this.content}</p>
				<span>Likes: <span id="count-${this.id}">0</span></span>
				<br>
				<button id="likeBtn-${this.id}" onclick="newsItems[${this.id}].incLikes()">LIKE</button>
				<button onclick="newsItems[${this.id}].hide()">HIDE</button>
			</div>
		`;
  }

  show(element) {
    element.innerHTML = this.render();
  }

  incLikes() {
    this.likes += 1;
    document.getElementById(`count-${this.id}`).innerHTML = this.likes;
    document.getElementById(`likes-${this.id}`).innerHTML = '&#9824;'.repeat(
      this.likes
    );
  }

  hide() {
    document.getElementById(`img-${this.id}`).style.opacity = '0.3';
    document.getElementById(`title-${this.id}`).style.color = 'darkgray';
    document.getElementById(`title-${this.id}`).style.backgroundColor =
      'lightgray';
    document.getElementById(`text-${this.id}`).style.color = 'darkgray';
    document.getElementById(`text-${this.id}`).style.backgroundColor =
      'lightgray';
    document.getElementById(`likeBtn-${this.id}`).disabled = true;
  }
}

let newsItems = [];

function generatenews() {
  let paragraphs = document.querySelectorAll('#content p');
  paragraphs.forEach((p, i) => {
    let news = new News(
      arrRecourses[i].newsTitle,
      arrRecourses[i].srcImg,
      arrRecourses[i].newsContent,
      i
    );
    newsItems.push(news);
    newsItems[i].show(p);
  });
}

generatenews();
