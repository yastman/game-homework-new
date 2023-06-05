let startTime, stopTime

export function startTimer() {
	startTime = new Date()
}

export function stopTimer() {
	stopTime = new Date()
	let allTime = stopTime - startTime
	return allTime / 1000
}
