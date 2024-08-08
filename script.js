let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3 
    },

    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3 
    },

    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt; and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2 
    },
    
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&lt;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1 
    },
    
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1 
    },
    
    {
        "question": "Wie wählst du alle Elemente von Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1 
    },
    
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate",
        "answer_3": "rate = 100",
        "answer_4": "let rate = 100;",
        "right_answer": 4 
    }
];

let currentQuestion = 0;
let correctAnswer = 0;
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAILURE = new Audio('./audio/failure.mp3');

function init() {
    document.getElementById("total-questions").innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById("quiz-question").innerHTML = question.question;
    document.getElementById("answer_1").innerHTML = question.answer_1;
    document.getElementById("answer_2").innerHTML = question.answer_2;
    document.getElementById("answer_3").innerHTML = question.answer_3;
    document.getElementById("answer_4").innerHTML = question.answer_4;

    document.getElementById("current-question").innerHTML = currentQuestion + 1;
    document.getElementById("btn-next-question").disabled = true;
}

function checkAnswer(answer) {
    if(rightAnswer(answer)){
        document.getElementById(answer).classList.add("bg-success-subtle");
        AUDIO_SUCCESS.play();
        correctAnswer++; 
        for (let index = 1; index <= 4; index++) {
            document.getElementById("answer_"+ index).onclick = "";
        }
    }else{
        AUDIO_FAILURE.play();
        for (let index = 1; index <= 4; index++) {
            if(("answer_"+ index).includes(questions[currentQuestion].right_answer)){
                document.getElementById("answer_"+ index).classList.add("bg-success-subtle"); 
            }else {
                document.getElementById("answer_"+ index).classList.add("bg-danger-subtle"); 
            }
            document.getElementById("answer_"+ index).onclick = "";          
        }
    }

    if(thereIsNextQuestion()){
        document.getElementById("btn-next-question").disabled = false;
    }else {
        document.getElementById("btn-show-result").classList.remove("hidden");
    }
}

function rightAnswer(answer){
    return answer.includes(questions[currentQuestion].right_answer);
}

function thereIsNextQuestion() {
    return currentQuestion + 1 < questions.length;
}

function resetAnswers() {
    for (let index = 1; index <= 4; index++) {
        if(("answer_"+ index).includes(questions[currentQuestion].right_answer)){
            document.getElementById("answer_"+ index).classList.remove("bg-success-subtle"); 
        }else {
            document.getElementById("answer_"+ index).classList.remove("bg-danger-subtle"); 
        }  
        
        document.getElementById("answer_"+ index).setAttribute('onclick',`checkAnswer('${"answer_"+ index}')`);
    }
}

function nextQuestion() {
    resetAnswers();

    if(thereIsNextQuestion()){
        currentQuestion = currentQuestion + 1;
        showQuestion();
    }   
}

function showResult() {
    document.getElementById("question-answer-card").classList.add("hidden");
    document.getElementById("result-card").classList.remove("hidden");
    document.getElementById("img-quiz").src = "./img/trophy.png";

    let result = ((correctAnswer/questions.length) * 100).toFixed(1);

    document.getElementById("result-value").innerHTML = `${correctAnswer} von ${questions.length} Fragen (${result}%)`;

    document.getElementById("result-progress").style.width = `${result}%`;
}

function restartQuiz() {
    document.getElementById("question-answer-card").classList.remove("hidden");
    document.getElementById("result-card").classList.add("hidden");
    document.getElementById("btn-show-result").classList.add("hidden");
    document.getElementById("img-quiz").src = "./img/education.jpg";
    resetAnswers();
    currentQuestion = 0;
    correctAnswer = 0;
    showQuestion();
}