import renderText from './modules/renderText.js'
import { startTimer, stopTimer } from './modules/timer.js'
import randomIndex from './modules/randomText.js'
import restartGame from './modules/restartGame.js'

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
let timeStart = false
let goodNumbers = 0
let indexText = randomIndex(texts)

renderText(textsArray, texts, indexText, currentIndex)

// событие по клику на любую клавишу
document.addEventListener('keydown', (event) => {
	if (event.key === texts[indexText][currentIndex]) {
		currentIndex++
		goodNumbers++
		renderText(textsArray, texts, indexText, currentIndex)
		if (!timeStart) {
			startTimer()
			timeStart = true
			console.log('Timer started: ' + timeStart)
		}
	}
	if (currentIndex === texts[indexText].length) {
		let totalTime = stopTimer()
		console.log(goodNumbers)
		let wpm = Math.round(goodNumbers / (totalTime / 60))
		result.innerHTML = `Скорость набора: ${wpm}. Время: ${totalTime} секунд`
		timeStart = false
		console.log('Timer started: ' + timeStart)
		goodNumbers = 0
		restartButton.style.display = 'block'
	}
})

// событие по клику на кнопку Рестарт
restartButton.addEventListener('click', restartGame)
