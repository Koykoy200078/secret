$(document).ready(function () {
	let hideTimeout

	$('.container')
		.mouseenter(function () {
			clearTimeout(hideTimeout)
			$('.card')
				.stop()
				.animate(
					{
						top: '-90px',
					},
					'slow',
					function () {
						$('#text-container').fadeIn('slow')
					},
				)
		})
		.mouseleave(function () {
			hideTimeout = setTimeout(function () {
				$('.card')
					.stop()
					.animate(
						{
							top: 0,
						},
						'slow',
						function () {
							$('#text-container').fadeOut('slow')
						},
					)
			}, 60000)
		})

	$('#text-container').hide()
})

let firstAnswer = ''
let secondAnswer = ''
let thirdAnswer = ''
let fourthAnswer = ''

function handleFirstQuestion(option) {
	if (option === 'yes') {
		firstAnswer = 'yes'
		flashRainbowColors(function () {
			displaySecondQuestion()
		})
	} else if (option === 'no') {
		firstAnswer = 'no'
		document.getElementById('no-button').innerText = 'You sure?'
		var yesButton = document.getElementById('yes-button')
		var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size')
		var newSize = parseFloat(currentFontSize) * 2
		yesButton.style.fontSize = newSize + 'px'
		sendEmail(firstAnswer)
	} else {
		alert('Invalid option!')
	}
}

function displaySecondQuestion() {
	document.getElementById('question').innerText = 'Available for date? This February 14, 2025?'
	document.getElementById('yes-button').innerText = 'Yes'
	document.getElementById('no-button').innerText = 'No'
	document.getElementById('yes-button').onclick = function () {
		handleSecondQuestion('yes')
	}
	document.getElementById('no-button').onclick = function () {
		handleSecondQuestion('no')
	}
}

function handleSecondQuestion(option) {
	if (option === 'yes') {
		secondAnswer = 'yes'
		displayThirdQuestion()
	} else if (option === 'no') {
		secondAnswer = 'no'
		alert('Maybe next time!')
		sendEmail(firstAnswer, secondAnswer)
	} else {
		alert('Invalid option!')
	}
}

function displayThirdQuestion() {
	document.getElementById('question').innerText = 'Where we go?'
	document.getElementById('yes-button').innerText = 'Foodtrip'
	document.getElementById('no-button').innerText = 'Sine'

	// Create a new button for the third option
	var thirdButton = document.createElement('button')
	thirdButton.id = 'third-button'
	thirdButton.innerText = 'Park'
	thirdButton.onclick = function () {
		handleThirdQuestion('Park')
	}

	// Append the third button to the options container
	document.getElementById('options').appendChild(thirdButton)

	document.getElementById('yes-button').onclick = function () {
		handleThirdQuestion('Foodtrip')
	}
	document.getElementById('no-button').onclick = function () {
		handleThirdQuestion('Sine')
	}
}

function handleThirdQuestion(option) {
	thirdAnswer = option
	displayFourthQuestion()
}

function displayFourthQuestion() {
	document.getElementById('question').innerText = 'Available time and location?'
	document.getElementById('yes-button').innerText = 'Morning'
	document.getElementById('no-button').innerText = 'Afternoon'

	// Remove the third button if it exists
	var thirdButton = document.getElementById('third-button')
	if (thirdButton) {
		thirdButton.remove()
	}

	// Create a new button for the third option
	var eveningButton = document.createElement('button')
	eveningButton.id = 'evening-button'
	eveningButton.innerText = 'Evening'
	eveningButton.onclick = function () {
		handleFourthQuestion('Evening')
	}

	// Append the evening button to the options container
	document.getElementById('options').appendChild(eveningButton)

	document.getElementById('yes-button').onclick = function () {
		handleFourthQuestion('Morning')
	}
	document.getElementById('no-button').onclick = function () {
		handleFourthQuestion('Afternoon')
	}
}

function handleFourthQuestion(option) {
	fourthAnswer = option
	displayCatHeart()
	sendEmail(firstAnswer, secondAnswer, thirdAnswer, fourthAnswer)
}

function sendEmail(firstAnswer, secondAnswer = '', thirdAnswer = '', fourthAnswer = '') {
	const templateParams = {
		answer: firstAnswer,
		second_answer: secondAnswer,
		third_answer: thirdAnswer,
		fourth_answer: fourthAnswer,
		to_email: 'franc200078@gmail.com',
	}

	emailjs.send('service_5wybsfi', 'template_xpjbdb2', templateParams).then(
		function (response) {
			console.log('SUCCESS!', response.status, response.text)
		},
		function (error) {
			console.log('FAILED...', error)
		},
	)
}

function flashRainbowColors(callback) {
	var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
	var i = 0
	var interval = setInterval(function () {
		document.body.style.backgroundColor = colors[i]
		i = (i + 1) % colors.length
	}, 200)
	setTimeout(function () {
		clearInterval(interval)
		document.body.style.backgroundColor = ''
		if (callback) {
			callback()
		}
	}, 2000)
}

function displayCat() {
	var imageContainer = document.getElementById('image-container')
	var catImage = new Image()
	catImage.src = 'cat.gif'
	catImage.alt = 'Cat'
	catImage.onload = function () {
		imageContainer.appendChild(catImage)
	}
}

function displayCatHeart() {
	document.getElementById('image-container').innerHTML = ''
	var imageContainer = document.getElementById('image-container')
	var catHeartImage = new Image()
	catHeartImage.src = 'cat.gif'
	catHeartImage.alt = 'Cat Heart'
	catHeartImage.onload = function () {
		imageContainer.appendChild(catHeartImage)
		document.getElementById('options').style.display = 'none'
		document.querySelector('.card').style.display = 'none'
		document.querySelector('.envelope').style.display = 'none'
		document.querySelector('.front').style.display = 'none'
		document.querySelector('.hearts').style.display = 'none'
		document.querySelector('.shadow').style.display = 'none'
		imageContainer.style.display = 'block'
		imageContainer.style.margin = '0 auto'
		var text = document.createElement('div')
		text.innerText = 'Yes heheheee... see you po soon! 😻'
		text.className = 'yes-text'
		imageContainer.appendChild(text)
	}
}

displayCat()
