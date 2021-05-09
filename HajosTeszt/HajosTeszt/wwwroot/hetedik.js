var kérdés;
const ELSO = '/questions/first'
const UTOLSO = '/questions/last'
const KÖV = '/questions/next'
const ELŐZŐ = '/questions/prev'

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdés = d;
    kérdésMegjelenítés(0);
}

var kérdésMegjelenítés = function () {

    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdés.questionText

    if (kérdés.image != "") {
        kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    else {
        kép.src = "";
    }

    válasz1.innerText = kérdés.answer1
    válasz2.innerText = kérdés.answer2
    válasz3.innerText = kérdés.answer3
}

function kérdésBetöltés(utvonal, id = null) {
    var url;
    if (id) url = utvonal + '/' + id;
    else url = utvonal;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => letöltésBefejeződött(data));
}

window.onload = () => {

    kérdésBetöltés(ELSO);


    document.getElementById("vissza").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "dimgrey";
        document.getElementById("válasz2").style.backgroundColor = "dimgrey";
        document.getElementById("válasz3").style.backgroundColor = "dimgrey";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        kérdésBetöltés(ELŐZŐ, kérdés.questionId);
    }

    document.getElementById("elore").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "dimgrey";
        document.getElementById("válasz2").style.backgroundColor = "dimgrey";
        document.getElementById("válasz3").style.backgroundColor = "dimgrey";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        kérdésBetöltés(KÖV, kérdés.questionId);
    }


    document.getElementById("válasz1").onclick = () => {

        if (kérdés.correctAnswer == 1) {
            document.getElementById("válasz1").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz1").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés.correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';

    }

    document.getElementById("válasz2").onclick = () => {

        if (kérdés.correctAnswer == 2) {
            document.getElementById("válasz2").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz2").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés.correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }

    document.getElementById("válasz3").onclick = () => {

        if (kérdés.correctAnswer == 3) {
            document.getElementById("válasz3").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz3").style.background = "lightcoral";
            document.getElementById("válasz" + kérdés.correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }
}
