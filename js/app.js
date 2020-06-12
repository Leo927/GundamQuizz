var Question = {
	question:"",
	choices:[],
	answer:-1,
	create:function(_question, _choices, _answer){
		var temp = Object.create(Question);
		temp.question = _question;
		temp.choices = _choices;
		temp.answer = _answer;
		return temp;
	}
}

var Quiz = {
	questions:[],
	currentProblem:0,
	correct:0,
	getWrong:function(){
		return this.currentProblem - this.correct ;
	},
	create:function(_questions){
		var temp = Object.create(Quiz);
		temp.questions = _questions;
		temp.correct =0;
		return temp;
	},
	getCurrentProblem:function(){
		return this.questions[this.currentProblem]
	}
	
}

var questions =[
	Question.create("What is the model of the original gundam?", 
		["RT-06", "RX-78", "RX-78-2", "NT-2"]
		,2),
	Question.create("Which of the following MS did Amulo pilot", 
		["NT-1", "RX-78", "MS-06", "v"]
		,3),
	Question.create("What is the box of laplas", 
		["a person", "a mobile suit", "original constitute"]
		,2),
	Question.create("What is the model number of the original gundam", 
		["RT-06", "RX-78", "RX-78-2"]
		,2),
]

$(document).ready(function(){
	initialize();
});

function initialize(){
	$("form").hide();
	$("form").submit(function(event){
		event.preventDefault();
	});
	$("#button-next").hide();
	$("#btn-restart").hide();
}

var quiz ={};

function startNewQuiz(){
	$("#btn-start").hide();
	$("#btn-restart").hide();
	$("form").show();
	quiz = Quiz.create(questions);
	populateQuestion(quiz.questions[quiz.currentProblem]);
	$("#score-correct").text(quiz.correct);
	$("#score-wrong").text(quiz.getWrong());
	$("#answeredQuestionNumber").text(0);
	$("#totalQuestionNumber").text(quiz.questions.length);
}

function populateQuestion(question){
	$("#question").text(question.question);
	$("#choices").text("");
	for (var i = 0 ; i < question.choices.length; i++) {
		$("#choices").append(`<div id="question">
						<input type="radio" class="form-check-input " name="answer" id="answer-`+i+`" value="`+i+`">
						<label class="form-check-label" for="answer-`+i+`">`+question.choices[i]+`</label>
					</div>`);
	}
}

function handleSubmit(){
	if($("input[name='answer']:checked").length <=0)
	{
		alert("Must select an answer");
		return;
	}

	var selected= $("input[name='answer']:checked").val();

	if(selected== quiz.getCurrentProblem().answer)
	{
		quiz.correct += 1;
	}
	else
	{
		$("#answer-"+selected).parent().toggleClass("bg-danger");
	}
	$("#answer-"+quiz.getCurrentProblem().answer).parent().toggleClass("bg-success");
	quiz.currentProblem++;
	$(".progress-bar").css("width",  quiz.currentProblem/quiz.questions.length*100 +  "%");
	$("#button-submit").hide();
	$("#button-next").show();
	$("#score-correct").text(quiz.correct);
	$("#score-wrong").text(quiz.getWrong());
	$("#answeredQuestionNumber").text(quiz.currentProblem);	
}

function gotoNextQuestion(){
	if(quiz.currentProblem > quiz.questions.length -1)
	{
		endQuiz();
		return;
	}
	populateQuestion(quiz.getCurrentProblem());
	$("#button-submit").show();
	$("#button-next").hide();
}

function endQuiz(){
	$("#btn-restart").show();
	$("form").hide();
}
