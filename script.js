var acuanTimeLeft = 10; // Waktu untuk melihat acuan (detik)
var testTimeLeft = 60; // Waktu total untuk mengerjakan soal (detik)
var questionTimeLeft = 5; // Waktu untuk menjawab satu soal (detik)
var numbers; // Array untuk menyimpan angka acuan
var options = ['A', 'B', 'C', 'D', 'E']; // Array untuk opsi jawaban
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
            startTestTime(); // Memulai waktu tes setelah melihat acuan
        }
    }, 1000);
}

function startTestTime() {
    startTime = new Date().getTime();
    showNextQuestion(); // Tampilkan soal pertama
    questionTimer = setInterval(showNextQuestion, questionTimeLeft * 1000); // Tampilkan soal setiap waktu yang ditentukan
}

function generateReference() {
    var referenceTable = document.getElementById("referenceBody");
    referenceTable.innerHTML = ""; // Bersihkan isi sebelum mengisi kembali
    numbers = [];

    // Memilih 5 angka acak yang berbeda untuk acuan
    while (numbers.length < 5) {
        var randomNumber = Math.floor(Math.random() * 9) + 1;
        if (numbers.indexOf(randomNumber) === -1) {
            numbers.push(randomNumber);
        }
    }

    // Menampilkan angka acak pada kolom acuan
    var acuanRow = referenceTable.insertRow();
    for (var i = 0; i < numbers.length; i++) {
        var cell = acuanRow.insertCell();
        cell.textContent = numbers[i];
    }

    // Menampilkan abjad a-e pada baris kedua kolom acuan
    var alphabetRow = referenceTable.insertRow();
    for (var i = 0; i < 5; i++) {
        var cell = alphabetRow.insertCell();
        cell.textContent = String.fromCharCode(65 + i);
    }
}

function showNextQuestion() {
    var currentTime = new Date().getTime();
    var elapsedTime = (currentTime - startTime) / 1000; // Waktu yang telah berlalu dalam detik
    if (elapsedTime >= testTimeLeft) {
        clearInterval(questionTimer); // Hentikan interval setelah waktu berakhir
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
    event.target.disabled = true; // Menonaktifkan tombol setelah diklik
    event.target.classList.add("disabled"); // Mengubah warna tombol menjadi abu-abu
    clearInterval(questionTimer); // Hentikan timer setelah menjawab
    showNextQuestion(); // Tampilkan soal berikutnya
}

function calculateScore() {
    var scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = "<h2>Penilaian</h2><p>Benar: " + correctCount + "</p><p>Salah: " + wrongCount + "</p>";
    document.body.appendChild(scoreDiv);
}

function startTest() {
    document.querySelector(".content").style.display = "block"; // Tampilkan konten
    document.getElementById("timer").style.display = "block";
    document.getElementById("reference").style.display = "block";
    document.getElementById("history").style.display = "none"; // Sembunyikan riwayat
    startTimer();
    generateReference();
}

// Simpan riwayat tes dalam bentuk array objek
var historyData = [
    { dateTime: "2024-03-17 10:30:15", correct: 8, wrong: 2 },
    { dateTime: "2024-03-16 15:45:22", correct: 9, wrong: 1 },
    { dateTime: "2024-03-15 09:20:50", correct: 7, wrong: 3 }
];

// Fungsi untuk menampilkan riwayat tes dalam tabel
function showHistory() {
    var historyTableBody = document.querySelector("#historyTable tbody");
    historyTableBody.innerHTML = ""; // Kosongkan isi tabel

    // Loop melalui data riwayat dan tambahkan baris baru ke dalam tabel
    historyData.forEach(function(data) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + data.dateTime + "</td>" +
                        "<td>" + data.correct + "</td>" +
                        "<td>" + data.wrong + "</td>";
        historyTableBody.appendChild(row);
    });

    // Sembunyikan konten tes dan tampilkan riwayat
    document.querySelector(".content").style.display = "none";
    document.getElementById("history").style.display = "block";
}

// Fungsi untuk menyembunyikan riwayat saat halaman dimuat
window.onload = function() {
    document.getElementById("history").style.display = "none";
};

// Dark Mode and Light Mode Toggle
function toggleMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
}

// Function to show history and hide content
function showHistory() {
    document.getElementById("content").style.display = "none";
    document.getElementById("history").style.display = "block";
}
