export let scoreManager = {
  score: 0,

  reset() {
    this.score = 0;
    $('#stars').text('');
  },

  add(n) {
    this.score += n;
    this.updateDisplay();
  },

  subtract(n) {
    this.score -= n;
    this.updateDisplay();
  },

  updateDisplay() {
    if (this.score > 0) {
      $('#stars').text('⭐'.repeat(this.score));
    } else if (this.score < 0) {
      $('#stars').text(this.score + ' Star');
    } else {
      $('#stars').text('');
    }
  }
};

export function arrShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export let gameTimer = {
  time: 0,
  countdown: null,
  frozen: false,

  start(seconds) {
    this.time = seconds;
    $("#timer").text(this.time + " secs.");

    this.countdown = setInterval(() => {
      if (!this.frozen) {
        this.time--;
        $("#timer").text(this.time + " secs.");
        if (this.time <= 0) {
          this.stop();
          $("#board").empty().removeClass("active");
          $("#message").text("Game OVER!").fadeIn();
        }
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.countdown);
  },

  addTime(secs) {
    this.time += secs;
    $("#timer").text(this.time + " secs.");
  },

  freeze(secs) {
    this.frozen = true;
    setTimeout(() => {
      this.frozen = false;
    }, secs * 1000);
  },
};
