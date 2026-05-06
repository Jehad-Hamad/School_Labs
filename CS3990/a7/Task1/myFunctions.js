function generateButtons() {
	let arrButtons = [];
	arrTexts.forEach((e, i) => {
		let title = `${e} is shown on the ${arrColors[i]} background`;
		arrButtons.push(new Button(e, arrColors[i], title));
	});
	return arrButtons;
}

function displayButtons(arrButtons) {
	arrButtons.forEach((btn, i) => {
		setTimeout(() => {
			btn.show();
		}, i * 30000);
	});
}
