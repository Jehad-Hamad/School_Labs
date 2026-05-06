class ColorButton extends Button {
  constructor(fColor, ...args) {
    super(...args);
    this.fColor = fColor;
  }
  show() {
    document.write(
      `<button style="background-color: ${this.btnBgColor}; color: ${this.fColor};" title="${this.btnTitle}">${this.btnText}</button>`
    );
  }
}
