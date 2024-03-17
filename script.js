var acuanTimeLeft = 10;
var testTimeLeft = 60;
var questionTimeLeft = 5;
var numbers;
var options = ['A', 'B', 'C', 'D', 'E'];
var correctCount = 0;
var wrongCount = 0;
var timerInterval;
var questionTimer;
var startTime;

function startTimer() {
    timerInterval = setInterval(function() {
        acuanTimeLeft--;
        document.getElementById("timer").textContent = acuanTimeLeft;

        if(acuanTimeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").style.display = "none";
            document.getElementById("reference").style.display = "none";
            document.getElementById("question").style.display = "block";
            startTestTime();
        }
    }, 1000);
}

function startTestTime() {
    console.log("Tes dimulai!");
    startTime = new Date().getTime();
    showNextQuestion();
    questionTimer = setInterval(showNextQuestion, questionTimeLeft * 1000);
}

function generateReference() {
    var referenceTable = document.getElementById("referenceBody");
    referenceTable.innerHTML = "";
    numbers = [];

    while (numbers.length < 5) {
        var randomNumber = Math.floor(Math.random() * 9) + 1;
        if (numbers.indexOf(randomNumber) === -1) {
            numbers.push(randomNumber);
        }
    }

    var acuanRow = referenceTable.insertRow();
    for (var i = 0; i < numbers.length; i++) {
        var cell = acuanRow.insertCell();
        cell.textContent = numbers[i];
    }

    var alphabetRow = referenceTable.insertRow();
    for (var i = 0; i < 5; i++) {
        var cell = alphabetRow.insertCell();
        cell.textContent = String.fromCharCode(65 + i);
    }
}

function showNextQuestion() {
    var currentTime = new Date().getTime();
    var elapsedTime = (currentTime - startTime) / 1000;
    if (elapsedTime >= testTimeLeft) {
        clearInterval(questionTimer);
        calculateScore();
        return;
    }

    var questionNumbers = generateQuestion();
    var questionNumbersHtml = "<div>";
    for (var i = 0; i < questionNumbers.length; i++) {
        questionNumbersHtml += questionNumbers[i] + " ";
    }
    questionNumbersHtml += "</div>";
    document.getElementById("questionNumbers").innerHTML = questionNumbersHtml;

    var optionsHtml = "<div class='options'>";
    for (var i = 0; i < options.length; i++) {
        optionsHtml += "<button onclick='checkAnswer(\"" + options[i] + "\")'>" + options[i] + "</button>";
    }
    optionsHtml += "</div>";
    document.getElementById("options").innerHTML = optionsHtml;
}

function generateQuestion() {
    var questionNumbers = [];
    var missingIndex = Math.floor(Math.random() * numbers.length);
    for (var i = 0; i < numbers.length; i++) {
        if (i !== missingIndex) {
            questionNumbers.push(numbers[i]);
        }
    }
    return questionNumbers;
}

function checkAnswer(selectedOption) {
    var missingIndex = numbers.indexOf(numbers[missingIndex]);
    if (selectedOption === String.fromCharCode(65 + missingIndex)) {
        correctCount++;
        event.target.classList.add("correct");
    } else {
        wrongCount++;
        event.target.classList.add("wrong");
    }
    event.target.disabled = true;
    event.target.classList.add("disabled");
    clearInterval(questionTimer);
    showNextQuestion();
}

function calculateScore() {
    var scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = "<h2>Penilaian</h2><p>Benar: " + correctCount + "</p><p>Salah: " + wrongCount + "</p>";
    document.body.appendChild(scoreDiv);
}

function startTest() {
    document.querySelector(".content").style.display = "block";
    document.getElementById("timer").style.display = "block";
    document.getElementById("reference").style.display = "block";
    document.getElementById("history").style.display = "none";
    startTimer();
    generateReference();
}

var historyData = [
    { dateTime: "2024-03-17 10:30:15", correct: 8, wrong: 2 },
    { dateTime: "2024-03-16 15:45:22", correct: 9, wrong: 1 },
    { dateTime: "2024-03-15 09:20:50", correct: 7, wrong: 3 }
];

function showHistory() {
    var historyTableBody = document.querySelector("#historyTable tbody");
    historyTableBody.innerHTML = "";

    historyData.forEach(function(data) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + data.dateTime + "</td>" +
                        "<td>" + data.correct + "</td>" +
                        "<td>" + data.wrong + "</td>";
        historyTableBody.appendChild(row);
    });

    document.querySelector(".content").style.display = "none";
    document.getElementById("history").style.display = "block";
}

window.onload = function() {
    document.getElementById("history").style.display = "none";
};
