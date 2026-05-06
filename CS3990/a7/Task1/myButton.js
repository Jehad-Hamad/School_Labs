class Button {
	constructor(btnText, btnBgColor, btnTitle) {
		this.btnText = btnText;
		this.btnBgColor = btnBgColor;
		this.btnTitle = btnTitle;
	}

	show() {
		document.write(
			`<button style="background-color: ${this.btnBgColor};" title="${this.btnTitle}">${this.btnText}</button>`
		);
	}
}
