let arrButtons = generateButtons();
displayButtons(arrButtons);

let colorBtn = new ColorButton('white', 'Special', 'navy', 'Special is shown on the navy background');
setTimeout(() => {
	colorBtn.show();
}, arrButtons.length * 30000);
