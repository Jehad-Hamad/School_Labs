import { scoreManager } from './Utils.js';

export class Card {
  constructor(question, options, correctAnswer) {
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.done = false;
    this.id = "card-" + Card.count++;
  }

  render() {
    let wrapper = $('<div>').addClass('card-front');
    let name = this.id;

    let pQuestion = $('<p>').text(this.question);
    wrapper.append(pQuestion);

    this.options.forEach(function (option) {
      let label = $('<label>');
      let radio = $('<input>').attr({
        type: 'radio',
        name: name,
        value: option,
      });
      label.append(radio, " " + option);
      wrapper.append(label);
    });

    this.checkBtn = $('<button>').text('Check').addClass('checkBtn');
    this.checkBtn.on("click", (e) => {
      e.stopPropagation();
      if (this.done) return;
      let selected = wrapper.find("input[name='" + name + "']:checked").val();
      if (selected === this.correctAnswer) {
        $('#message').text('Yay Correct!').fadeIn().delay(1000).fadeOut();
        scoreManager.add(1);
      } else {
        $('#message').text('Wrong!').fadeIn().delay(1000).fadeOut();
      }
      this.done = true;
      wrapper.closest(".tile").addClass("done");
    });

    wrapper.append(this.checkBtn);
    return wrapper;
  }

  show(container) {
    let result = this.render();
    $(container).append(result);
  }
}

Card.count = 0;
