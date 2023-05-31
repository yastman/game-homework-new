// Переменные для отслеживания начального времени и интервала таймера
let startTime
let timerInterval

// Массив текстов для тестирования скорости печати
const text = [
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

// Получение ссылок на DOM-элементы
const textContainer = document.querySelector('#text') // контейнер для текста тестирования
const resultContainer = document.querySelector('#result') // контейнер для вывода результатов
const restartButton = document.querySelector('#restart') // кнопка перезапуска теста
const textIndex = getRandomInt(0, text.length - 1)

// Функция для генерации случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
	// Округление до ближайшего большего числа
	min = Math.ceil(min)
	// Округление до ближайшего меньшего числа
	max = Math.floor(max)
	// Генерация случайного числа
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// Получение случайного индекса текста для тестирования
// Получение ссылки на DOM-элемент для отображения времени
const timerContainer = document.querySelector('#timer')

// Переменная для отслеживания текущего индекса символа в выбранном тексте
let currentIndex = 0

// Обработчик событий для отслеживания нажатий клавиш
document.addEventListener('keydown', event => {
	// Если нажатая клавиша соответствует текущему символу в тексте, индекс увеличивается
	if (event.key === text[textIndex][currentIndex]) {
		// инкремент индекса
		currentIndex++
		// Если это первый символ, стартуем таймер
		if (currentIndex === 1) {
			startTimer()
		}
		// Если все символы введены, останавливаем таймер и подсчитываем результаты
		if (currentIndex === text[textIndex].length) {
			// остановка таймера
			stopTimer()
			// расчет времени и скорости
			const elapsedTime = Date.now() - startTime
			const seconds = Math.floor(elapsedTime / 1000)
			const charactersPerMinute = Math.round((text.length / seconds) * 60)
			// вывод результатов
			resultContainer.textContent = `Время: ${seconds} секунд. Скорость: ${charactersPerMinute} символов в минуту.`
			// отображение кнопки перезапуска
			restartButton.style.display = 'block'
		}
		// отрисовка текста
		renderText()
	}
})

// Функция для отображения текста с выделением текущего и введенных символов
function renderText() {
	textContainer.innerHTML = text[textIndex]
		.split('')
		.map((char, idx) => {
			if (idx === currentIndex) {
				// текущий символ
				return `<span class='str_in'>${char}</span>`
			} else if (idx < currentIndex) {
				// уже введенные символы
				return `<span class='str_out'>${char}</span>`
			} else {
				// еще не введенные символы
				return char
			}
		})
		.join('') // сборка всех символов обратно в строку
}

// Отрисовка первоначального текста при загрузке страницы
renderText()

// Функция для начала отсчета времени
function startTimer() {
	// Запись текущего времени
	startTime = Date.now()
	// Запуск таймера, который каждую секунду обновляет отображаемое время
	timerInterval = setInterval(() => {
		// Вычисление прошедшего времени и его отображение
		const elapsedTime = Date.now() - startTime
		const seconds = Math.floor(elapsedTime / 1000)
	}, 1000)
}

// Функция для остановки таймера
function stopTimer() {
	// Очистка интервала таймера
	clearInterval(timerInterval)
}

// Функция для перезапуска игры
function restartGame() {
	// Сброс переменных и элементов на странице в исходное состояние
	currentIndex = 0
	startTime = null
	stopTimer()
	resultContainer.textContent = ''
	restartButton.style.display = 'none'
	// Отрисовка нового текста
	renderText()
}

// Добавление слушателя на кнопку перезапуска, чтобы начать игру заново при клике
restartButton.addEventListener('click', restartGame)
