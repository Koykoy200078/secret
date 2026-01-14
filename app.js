$(document).ready(function () {
	let hideTimeout;
	let envelopeOpened = false;
	let questionsStarted = false;

	// Hide the heart initially - it's inside the envelope
	$('.heart').hide();

	// Click handler for envelope - opens it and reveals the heart
	$('.container').on('click', function (e) {
		// Don't handle clicks if questions have started or if clicking on buttons
		if (
			questionsStarted ||
			$(e.target).is('button') ||
			$(e.target).closest('#options').length > 0
		) {
			return;
		}

		if (!envelopeOpened && !$(e.target).hasClass('heart')) {
			envelopeOpened = true;
			$('.card')
				.stop()
				.animate(
					{
						top: '-90px',
					},
					'slow',
					function () {
						// Show the heart after card animates up
						$('.heart').fadeIn(500);
					},
				);
		}
	});

	$('.container')
		.mouseenter(function () {
			clearTimeout(hideTimeout);
			if (envelopeOpened) {
				$('.card').stop().animate(
					{
						top: '-90px',
					},
					'slow',
				);
			}
		})
		.mouseleave(function () {
			hideTimeout = setTimeout(function () {
				// Check if questions have started
				if (!$('#text-container').hasClass('visible') && envelopeOpened) {
					$('.card').stop().animate(
						{
							top: 0,
						},
						'slow',
					);
				}
			}, 60000);
		});

	// Add click handler for the heart
	$('.heart').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		questionsStarted = true;
		startQuestions();
	});
});

let firstAnswer = '';
let secondAnswer = '';
let thirdAnswer = '';
let fourthAnswer = '';

function startQuestions() {
	// Hide the \"Happy Valentine's Day\" text
	$('.text').fadeOut(300);
	// Hide the floating hearts animation
	$('.hearts').fadeOut(300);
	// Hide the main heart when first question appears
	$('.heart').fadeOut(300);

	// Set the first question dynamically
	$('#question').text('Will you be my valentine?');
	$('#yes-button').text('Yes');
	$('#no-button').text('No');

	// Set onclick handlers for the first question
	document.getElementById('yes-button').onclick = function () {
		handleFirstQuestion('yes');
	};
	document.getElementById('no-button').onclick = function () {
		handleFirstQuestion('no');
	};

	// Show the questions
	setTimeout(function () {
		$('#text-container').addClass('visible');
	}, 100);
}

function handleFirstQuestion(option) {
	if (option === 'yes') {
		firstAnswer = 'yes';

		flashRainbowColors(function () {
			displaySecondQuestion();
		});
	} else if (option === 'no') {
		firstAnswer = 'no';
		document.getElementById('no-button').innerText = 'You sure?';
		var yesButton = document.getElementById('yes-button');
		var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
		var newSize = parseFloat(currentFontSize) * 2;
		yesButton.style.fontSize = newSize + 'px';
		sendEmail(firstAnswer);
	} else {
		alert('Invalid option!');
	}
}

function displaySecondQuestion() {
	// Hide the heart for subsequent questions immediately
	document.querySelector('.heart').style.display = 'none';

	document.querySelector('.text').innerHTML = "Great!</br>Let's</br>Plan!";
	document.getElementById('question').innerText = 'Available for date? This February 14, 2026?';
	document.getElementById('question').style.fontSize = '19px';
	document.getElementById('yes-button').innerText = 'Yes';
	document.getElementById('no-button').innerText = 'No';
	document.getElementById('yes-button').onclick = function () {
		handleSecondQuestion('yes');
	};
	document.getElementById('no-button').onclick = function () {
		handleSecondQuestion('no');
	};
}

function handleSecondQuestion(option) {
	if (option === 'yes') {
		secondAnswer = 'yes';
		displayThirdQuestion();
	} else if (option === 'no') {
		secondAnswer = 'no';
		alert('Maybe next time!');
		sendEmail(firstAnswer, secondAnswer);
	} else {
		alert('Invalid option!');
	}
}

function displayThirdQuestion() {
	document.querySelector('.text').innerHTML = 'Perfect!</br>Where</br>to?';
	document.getElementById('question').innerText = 'Where we go?';
	document.getElementById('question').style.fontSize = '';

	// Change options layout to column
	document.getElementById('options').style.flexDirection = 'column';
	document.getElementById('options').style.gap = '10px';
	document.getElementById('options').style.alignItems = 'center';

	document.getElementById('yes-button').innerText = 'Foodtrip';
	document.getElementById('yes-button').style.fontSize = '11px';
	document.getElementById('yes-button').style.width = 'auto';
	document.getElementById('yes-button').style.maxWidth = '120px';
	document.getElementById('no-button').innerText = 'Sine';
	document.getElementById('no-button').style.fontSize = '11px';
	document.getElementById('no-button').style.width = 'auto';
	document.getElementById('no-button').style.maxWidth = '120px';

	// Create a new button for the third option
	var thirdButton = document.createElement('button');
	thirdButton.id = 'third-button';
	thirdButton.innerText = 'Park';
	thirdButton.style.fontSize = '11px';
	thirdButton.style.width = 'auto';
	thirdButton.style.maxWidth = '120px';
	thirdButton.onclick = function () {
		handleThirdQuestion('Park');
	};

	// Append the third button to the options container
	document.getElementById('options').appendChild(thirdButton);

	document.getElementById('yes-button').onclick = function () {
		handleThirdQuestion('Foodtrip');
	};
	document.getElementById('no-button').onclick = function () {
		handleThirdQuestion('Sine');
	};
}

function handleThirdQuestion(option) {
	thirdAnswer = option;
	displayFourthQuestion();
}

function displayFourthQuestion() {
	document.querySelector('.text').innerHTML = 'Nice!</br>What</br>Time?';
	document.getElementById('question').innerText = 'Available time?';

	// Reset options layout to row for fourth question
	document.getElementById('options').style.flexDirection = 'column';
	document.getElementById('options').style.gap = '15px';

	document.getElementById('yes-button').innerText = 'Morning';
	document.getElementById('no-button').innerText = 'Afternoon';

	// Remove the third button if it exists
	var thirdButton = document.getElementById('third-button');
	if (thirdButton) {
		thirdButton.remove();
	}

	// Create a new button for the third option
	var eveningButton = document.createElement('button');
	eveningButton.id = 'evening-button';
	eveningButton.innerText = 'Evening';
	eveningButton.onclick = function () {
		handleFourthQuestion('Evening');
	};

	// Append the evening button to the options container
	document.getElementById('options').appendChild(eveningButton);

	document.getElementById('yes-button').onclick = function () {
		handleFourthQuestion('Morning');
	};
	document.getElementById('no-button').onclick = function () {
		handleFourthQuestion('Afternoon');
	};
}

function handleFourthQuestion(option) {
	fourthAnswer = option;
	displayCatHeart();
	sendEmail(firstAnswer, secondAnswer, thirdAnswer, fourthAnswer);
}

function sendEmail(firstAnswer, secondAnswer = '', thirdAnswer = '', fourthAnswer = '') {
	const templateParams = {
		answer: firstAnswer,
		second_answer: secondAnswer,
		third_answer: thirdAnswer,
		fourth_answer: fourthAnswer,
		to_email: 'franc200078@gmail.com',
	};

	emailjs.send('service_5wybsfi', 'template_xpjbdb2', templateParams).then(
		function (response) {
			console.log('SUCCESS!', response.status, response.text);
		},
		function (error) {
			console.log('FAILED...', error);
		},
	);
}

function flashRainbowColors(callback) {
	var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
	var i = 0;
	var interval = setInterval(function () {
		document.body.style.backgroundColor = colors[i];
		i = (i + 1) % colors.length;
	}, 100);
	setTimeout(function () {
		clearInterval(interval);
		document.body.style.backgroundColor = '';
		if (callback) {
			callback();
		}
	}, 700);
}

function displayCat() {
	var imageContainer = document.getElementById('image-container');
	var catImage = new Image();
	catImage.src = 'cat.gif';
	catImage.alt = 'Cat';
	catImage.onload = function () {
		imageContainer.appendChild(catImage);
	};
}

function displayCatHeart() {
	document.getElementById('image-container').innerHTML = '';
	var imageContainer = document.getElementById('image-container');
	var catHeartImage = new Image();
	catHeartImage.src = 'cat.gif';
	catHeartImage.alt = 'Cat Heart';
	catHeartImage.onload = function () {
		imageContainer.appendChild(catHeartImage);
		document.getElementById('options').style.display = 'none';
		document.querySelector('.card').style.display = 'none';
		document.querySelector('.envelope').style.display = 'none';
		document.querySelector('.front').style.display = 'none';
		document.querySelector('.hearts').style.display = 'none';
		document.querySelector('.shadow').style.display = 'none';
		imageContainer.style.display = 'flex';
		imageContainer.style.flexDirection = 'column';
		imageContainer.style.alignItems = 'center';
		imageContainer.style.justifyContent = 'center';
		imageContainer.style.position = 'fixed';
		imageContainer.style.top = '50%';
		imageContainer.style.left = '50%';
		imageContainer.style.transform = 'translate(-50%, -50%)';
		imageContainer.style.width = '100%';
		imageContainer.style.textAlign = 'center';
		var text = document.createElement('div');
		text.innerText = 'Yes heheheee... see you po soon! 😻';
		text.className = 'yes-text';
		text.style.fontFamily = "'Brush Script MT', cursive";
		text.style.fontSize = '24px';
		imageContainer.appendChild(text);
	};
}

// Only display cat on page load, don't start questions automatically
displayCat();
