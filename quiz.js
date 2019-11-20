let quizQA = [
	{
		prompt: "Seeing is believing, but sometimes the most real things in the world are the things we can't see",
		answers: ["A Christmas Story", "Christmas with the Kranks", "The Polar Express", "White Christmas"],
		correctAnswer: 2
	},
	{
		prompt: "Every time a bell rings, an angel gets his wings",
		answers: ["It's a Wonderful Life", "Jingle All The Way", "A Christmas Story", "A Christmas Carol"],
		correctAnswer: 0
	},
	{
		prompt: "Merry Christmas, Ya Filthy Animal",
		answers: ["Elf", "Home Alone", "Home Alone 2", "How the Grinch Stole Christmas"],
		correctAnswer: 2
	},
	{
		prompt: "Why is the carpet all wet, Todd? I don't know Margot!",
		answers: ["White Christmas", "Christmas Vacation", "Love Actually", "A Christmas Story"],
		correctAnswer: 1
	},
	{
		prompt: "Santa!!! I KNOW HIM!!!",
		answers: ["Home Alone 3", "Rudolph", "A Christmas Story", "Elf"],
		correctAnswer: 3
	}
]
let questionCount
let corrects = []
score = 0

const styleButton = () => {
	let buttonText
	if (questionCount === quizQA.length - 1) {
		buttonText = 'Submit'
	} else {
		buttonText = 'Next Question'
	}
	$('button.submit').text(buttonText)
}

const scoreQuiz = () => {
}

const submitQuiz = () => {
	$('button.submit').remove()
	scoreQuiz()
}

const scoreQuestion = () => {
  let correct = quizQA[questionCount-1].correctAnswer //added -1 to questionCount here because it has already incremented to 1 by the time it gets here
	if (corrects.length > 0) {
		let answer = $('.quiz #showQA input:checked')
		if (`${corrects[questionCount-1]}` === answer.attr('class')[1]) {
			console.log("correct!")
			score += 1
		} else {
			console.log("incorrect")
		}
	}
  let scoreMessage = $(`</p>You got ${score} out of ${questionCount} correct.</p>`)
  if (questionCount === quizQA.length) {
   $('#showQA').html(scoreMessage)
  }
}

const unhideQuestion = () => {
	if (corrects.length > 0) {
		scoreQuestion()
	}
	styleButton()
	$('.quiz #showQA div').remove()
	var showQA = $(`.QA-${questionCount}`)
	$('.quiz #showQA').append(showQA)
	if (questionCount < quizQA.length) {
		corrects.push(quizQA[questionCount].correctAnswer) //moved here
    questionCount += 1
	} else {
		// finished quiz
		submitQuiz()
	}
}

$(document).ready(function() {

	questionCount = 0	

	// add HTML question/answer elements to hidden div
	for (let q = 0; q < quizQA.length; q++) {
		// unique id
		var qID = `q${q}`

		var newDiv = $(`<div class="QA-${q}"></div>`)
		
		// jQuery to make prompt element 
		var qDiv = $(`<div id="${qID}"></div>`).html(`<p>${quizQA[q].prompt}</p>`)
		newDiv.append(qDiv)

		// jQuery to make answers element
		let answers = quizQA[q].answers
		for (let a = 0; a < answers.length; a++) {
			var aDiv = $('<div></div>').html(`<input type="radio" name="${qID}Answer" class="a${a}" unchecked><label for="a${a}">${answers[a]}</label>`)
			newDiv.append(aDiv)
		}
		$('.QA').append(newDiv)
	}


	$('button.submit').on('click', unhideQuestion)

});

