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
	Question.create("What is the box of Laplas?", 
		["a person", "a mobile suit", "the original constitution"]
		,2),
	Question.create("Which part of a MS is the less useful?", 
		["Leg", "Body", "Head"]
		,0),
	Question.create("What did Zeon drop on to Australia?", 
		["A ship", "A colony", "A comet"]
		,1),
	Question.create("What is the power output of the RX-0", 
		["2864 kW", "4520 kW", "3480 kW"]
		,2),
	Question.create("What is the sepcial system used by RX-0", 
		["Zero System", "Blue Destiney", "NT-D"]
		,2),
	Question.create("Which is the first mass produced MS?", 
		["AMX-004 Qubeley", "MS-06 Zaku-II", "MS-06 Zaku-I"]
		,1),
	Question.create("真红闪电指的是谁", 
		["阿姆罗 雷", "强尼 莱丁", "夏亚 阿兹纳布卢"]
		,1),
	Question.create("白狼指的是谁", 
		["阿姆罗 雷", "阿纳贝尔·卡多", "松永真"]
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
		$("#choices").append(`<div id="question" class ="m-1">
						<input type="radio" class="form-check-input" name="answer" id="answer-`+i+`" value="`+i+`">
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
		$("#answer-"+selected).parent().toggleClass("border border-danger");
	}
	$("#answer-"+quiz.getCurrentProblem().answer).parent().toggleClass("border border-success");
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
