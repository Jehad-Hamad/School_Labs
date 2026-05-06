import { questions, assets } from './Data.js';
import { Card } from './Card.js';
import { arrShuffle, gameTimer, scoreManager } from './Utils.js';

$('#startBtn').click(function () {
  // reset everything
  gameTimer.stop();
  $('#board').empty().removeClass('active');
  $('#message').hide().text('');
  Card.count = 0;
  scoreManager.reset();

  // merge and shuffle
  let allCards = arrShuffle([...questions, ...assets]);

  $('#scoreArea').fadeIn();
  $('#timerArea').fadeIn();
  $('#board').addClass('active');

  // build the board
  allCards.forEach(function (item) {
    // create the tile (face-down)
    let tile = $('<div>').addClass('tile');

    if (item.question) {
      // it's a quiz question — use Card class
      let card = new Card(item.question, item.options, item.correctAnswer);
      let front = card.render();
      front.hide(); // hidden until flipped
      tile.append(front);

      tile.on('click', function () {
        if (card.done) {
          $('#message')
            .text('You can do nothing! Just watching your timer!')
            .fadeIn()
            .delay(1000)
            .fadeOut();
          return;
        }
        tile.addClass('flipped');
        front.show();
      });
    } else {
      // it's an asset — regular block
      let front = $('<div>').addClass('asset-front').hide();
      front.append($('<i>').addClass('fa ' + item.value + ' asset-icon'));
      front.append($('<p>').text(item.description));
      tile.append(front);

      tile.on('click', function () {
        if (tile.hasClass('done')) {
          $('#message')
            .text('You can do nothing! Just watching your timer!')
            .fadeIn()
            .delay(1000)
            .fadeOut();
          return;
        }
        tile.addClass('flipped done');
        front.show();
        $('#message').text(item.description).fadeIn().delay(1000).fadeOut();

        // asset effects
        if (item.value === 'fa-diamond') {
          scoreManager.add(1);
        } else if (item.value === 'fa-paw') {
          scoreManager.subtract(1);
          if (scoreManager.score < 0) {
            $('#message').text('You just started & already with debts!').fadeIn().delay(1000).fadeOut();
          }
        } else if (item.value === 'fa-times') {
          gameTimer.stop();
          $('#board').empty().removeClass('active');
          $('#message').text('Game OVER!!!').fadeIn();
        } else if (item.value === 'fa-clock-o') {
          gameTimer.addTime(5);
        } else if (item.value === 'fa-star') {
          scoreManager.add(2);
        } else if (item.value === 'fa-snowflake-o') {
          gameTimer.freeze(5);
        }
      });
    }

    $('#board').append(tile);
  });

  // start timer: number of cards * 2
  gameTimer.start(allCards.length * 2);
});
