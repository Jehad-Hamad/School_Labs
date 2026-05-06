class ColorButton {
  constructor(color) {
    this.color = color;
    this.element = document.createElement('div');
    this.element.className = 'color-cell';
    this.element.style.backgroundColor = color;
  }

  show(container) {
    container.appendChild(this.element);
  }
}

class PaletteMenu {
  constructor(paletteId, textBlockId) {

    this.palette = document.getElementById(paletteId);
    this.textBlock = document.getElementById(textBlockId);
    this.palette.addEventListener('click', this);
    this.palette.addEventListener('mouseover', this);
  }

  handleEvent(event) {
    if (!event.target.classList.contains('color-cell')) return;

    if (event.type === 'click') {
      this.textBlock.style.color = event.target.style.backgroundColor;
    }
    if (event.type === 'mouseover') {
      this.textBlock.style.backgroundColor = event.target.style.backgroundColor;
    }
  }
}

function generatePalette() {
  let colors = [
    'black',
    'navy',
    'red',
    'orange',
    'green',
    'lime',
    'cyan',
    'blue',
    'purple',
    'magenta',
    'yellow',
    'white',
  ];
  let palette = document.getElementById('palette');

  for (let i = 0; i < colors.length; i++) {
    let btn = new ColorButton(colors[i]);
    btn.show(palette);
  }
}

// Start everything
const menu = new PaletteMenu('palette', 'containter');
generatePalette();
