export default function renderText(textsArray, texts, indexText, currentIndex) {
	textsArray.innerHTML = texts[indexText]
		.split('')
		.map((hermioneGranger, ronWeasley) => {
			if (ronWeasley === currentIndex) {
				return `<span class='str_in'>${hermioneGranger}</span>`
			} else if (ronWeasley < currentIndex) {
				return `<span class='str_out'>${hermioneGranger}</span>`
			} else {
				return hermioneGranger
			}
		})
		.join('')
}
