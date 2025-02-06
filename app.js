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

function selectOption(option) {
	if (option === 'yes') {
		flashRainbowColors(function () {
			document.getElementById('question').innerText = 'Available for date? This February 14, 2025?'
			document.getElementById('yes-button').innerText = 'Yes'
			document.getElementById('no-button').innerText = 'No'
			document.getElementById('yes-button').onclick = function () {
				selectDateOption('yes')
			}
			document.getElementById('no-button').onclick = function () {
				selectDateOption('no')
			}
		})
		sendEmail(option)
	} else if (option === 'no') {
		document.getElementById('no-button').innerText = 'You sure?'
		var yesButton = document.getElementById('yes-button')
		var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size')
		var newSize = parseFloat(currentFontSize) * 2
		yesButton.style.fontSize = newSize + 'px'
		sendEmail(option)
	} else {
		alert('Invalid option!')
	}
}

function selectDateOption(option) {
	if (option === 'yes') {
		displayCatHeart()
		sendEmail('yes', 'yes')
	} else if (option === 'no') {
		alert('Maybe next time!')
		sendEmail('yes', 'no')
	} else {
		alert('Invalid option!')
	}
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

function sendEmail(option, secondAnswer = '') {
	emailjs
		.send('service_5wybsfi', 'template_xpjbdb2', {
			answer: option,
			second_answer: secondAnswer,
			to_email: 'franc200078@gmail.com',
		})
		.then(
			function (response) {
				console.log('SUCCESS!', response.status, response.text)
			},
			function (error) {
				console.log('FAILED...', error)
			},
		)
}

displayCat()
