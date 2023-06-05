const texts = [
	'напечатай этот текст и узнай свою скорость печати, нажимая на клавиши на клавиатуре',
	'после того как ты напечатаешь этот текст, ты узнаешь свою скорость печати',
	'печатай быстрее и ты увидишь свою скорость печати',
	'скорость печати зависит от тебя',
	'печать это скорость',
	'печатай быстрее',
	'печатай как можно быстрее',
	'печатай быстрее и ты увидишь свою скорость печати',
	'скорость печати зависит от тебя',
	'печать быстро - это круто'
]

const textsArray = document.querySelector('#text')
const result = document.querySelector('#result')
const restartButton = document.querySelector('#restart')
let currentIndex = 0
let startTime
let stopTime
let timeStart = false
let goodNumbers = 0

// Получение случайного индекса

Array.prototype.random = function () {
	let index = Math.floor(Math.random() * this.length)
	return index
}
let indexText = texts.random()

// Рендер текста

function renderText() {
	textsArray.innerHTML = texts[indexText]
		.split('')
		.map((a, b) => {
			if (b === currentIndex) {
				return `<span class='str_in'>${a}</span>`
			} else if (b < currentIndex) {
				return `<span class='str_out'>${a}</span>`
			} else {
				return a
			}
		})
		.join('')
}

renderText()

// Timer
function startTimer() {
	startTime = new Date()
}

function stopTimer() {
	stopTime = new Date()
	let allTime = stopTime - startTime
	return allTime / 1000
}

// событие по клику на любую клавишу
document.addEventListener('keydown', (event) => {
	if (event.key === texts[indexText][currentIndex]) {
		currentIndex++
		goodNumbers++
		console.log(goodNumbers)
		renderText()
		if (!timeStart) {
			startTimer()
			timeStart = true
		}
	}
	if (currentIndex === texts[indexText].length) {
		let totalTime = stopTimer()
		console.log(totalTime)
		let wpm = Math.round(goodNumbers / (totalTime / 60))
		result.innerHTML = `Скорость набора: ${wpm}. Время: ${totalTime} секунд`
		timeStart = false
		goodNumbers = 0
		restartButton.style.display = 'block'
	}
})

// рестарт игры
function restartGame() {
	location.reload()
}

// событие по клику на кнопку Рестарт
restartButton.addEventListener('click', restartGame)
