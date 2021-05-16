var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("vissza").addEventListener("click", back);
    document.getElementById("elore").addEventListener("click", forward);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (!localStorage.getItem("hotList")) {
        for (let i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        console.log("A local storage tartalmával dolgozunk.");
        kerdesMegjelenites();
    }
});

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination}. helyére`);

            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kerdesMegjelenites();
            }
        })
}

function kerdesMegjelenites() {

    

    let kerdes = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kerdes.questionText;
    document.getElementById("válasz1").innerText = kerdes.answer1;
    document.getElementById("válasz2").innerText = kerdes.answer2;
    document.getElementById("válasz3").innerText = kerdes.answer3;

    if (kerdes.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kép1").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz");

    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function forward() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites();
}

function back() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kerdesMegjelenites();
}

function valasztas(n) {
    let kerdes = hotList[displayedQuestion].question;
    if (n === kerdes.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kerdes.correctAnswer).classList.add("jó");
    }

    document.getElementById("válaszok").style.pointerEvents = "none";

    timerHandler = setTimeout(forward, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}