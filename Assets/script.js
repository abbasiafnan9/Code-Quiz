var countdown = document.getElementById("countdown");
var questions = document.getElementById("questions");
var h2El = document.querySelector("h2");
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");
var score = document.getElementById("score");

var startQuiz = document.getElementById("start-quiz");
var results = document.querySelector(".results");
var answers = document.getElementById("answers");
var done = document.getElementById("done");
var scores = document.getElementById("scores");

var scorebtn = document.getElementById("scorebtn");
var startbtn = document.querySelector("#startbtn");
var ansbtn = document.querySelector(".ansbtn");
var subbtn = document.querySelector("#submitbtn");
var backbtn = document.querySelector("#backbtn");
var clearbtn = document.querySelector("#clearbtn");

var hs1 = document.getElementById("hs1");
var hs2 = document.getElementById("hs2");
var hs3 = document.getElementById("hs3");
var hs4 = document.getElementById("hs4");

var counter = 0;
var secondsLeft = 90;
var timerTrigger = true;
var savedScore;
var savedInitials;
var addScores;

startQuiz.setAttribute("style", "display: ");
questions.setAttribute("style", "display:none");
done.setAttribute("style", "display:none");
scores.setAttribute("style", "display:none");

var retrievedData = localStorage.getItem("highScore");

if (retrievedData) {
  addScores = true;
}

const highScoreArray = retrievedData ? JSON.parse(retrievedData) : [];

renderHighScores();

function setTime() {
  var timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft--;
      countdown.textContent = secondsLeft;
      if (timerTrigger === false) {
        countdown.textContent = secondsLeft;
        score.textContent = secondsLeft;
        clearInterval(timerInterval);
      }
    } else {
      timerTrigger = false;
      secondsLeft = 0;
      countdown.textContent = secondsLeft;
      score.textContent = secondsLeft;
      clearInterval(timerInterval);
      questions.setAttribute("style", "display:none");
      questions.setAttribute("style", "display:none");
      done.setAttribute("style", "display:none");
      done.setAttribute("style", "display: ");
    }
  }, 1000);
}

scorebtn.addEventListener("click", function () {
  timerTrigger = false;
  startQuiz.setAttribute("style", "display:none");
  questions.setAttribute("style", "display:none");
  done.setAttribute("style", "display:none");
  scores.setAttribute("style", "display: ");
});

startbtn.addEventListener("click", function () {
  startQuiz.setAttribute("style", "display:none");
  questions.setAttribute("style", "display: ");
  secondsLeft = 90;
  setTime();
  setQuestion();
});

var questionsArray = [
  {
    question: "When is the National day of United States?",
    a: "4th of June",
    b: "4th of November",
    c: "4th of July",
    d: "None of the above",
    correct: "4th of July",
  },
  {
    question: "What is something the ancient Romans used as mouthwash??",
    a: "Salt water",
    b: "Urine.",
    c: "Mint tea.",
    d: "Fresh water.",
    correct:
      "Urine.",
  },
  {
    question:
      "What is the tallest waterfall in the world?",
    a: "Angel Falls, Venezuela",
    b: "Denmark Strait cataract, Denmark",
    c: "Wailua Falls, Hawaii",
    d: "Sutherland Falls, New Zealand",
    correct: "Denmark Strait cataract, Denmark",
  },
  {
    question: "About how many scents can a human nose remember?",
    a: "Around 500",
    b: "Around 10,000",
    c: "Around 1 million",
    d: "Around 50,000",
    correct: "Around 50,000",
  },
  {
    question: "People with what color hair are genetically mutants?",
    a: "Black",
    b: "Red.",
    c: "Blonde",
    d: "Brown.",
    correct: "Blonde",
  },
];

function setQuestion() {
  h2El.textContent = questionsArray[counter].question;
  a1.textContent = questionsArray[counter].a;
  a2.textContent = questionsArray[counter].b;
  a3.textContent = questionsArray[counter].c;
  a4.textContent = questionsArray[counter].d;
}

answers.addEventListener("click", function (event) {
  if (event.target.textContent === questionsArray[counter].correct) {
    results.textContent = "Correct";
    counter++;
    if (counter === questionsArray.length) {
      timerTrigger = false;
      counter = 0;
      questions.setAttribute("style", "display:none");
      done.setAttribute("style", "display: ");
      console.log(timerTrigger);
    } else {
      setQuestion();
    }
  } else {
    results.textContent = "Wrong! Try Again";
    secondsLeft -= 15;
  }
});

console.log(highScoreArray);

JSON.stringify(highScoreArray);

var highScore = (savedScore, savedInitials) => {
  return {
    savedScore: savedScore,
    savedInitials: savedInitials,
  };
};

subbtn.addEventListener("click", function (event) {
  event.preventDefault();
  addScores = true;

  var initials = document.getElementById("initials").value;
  var highScore = {
    savedScore: secondsLeft,
    savedInitials: initials.trim(),
  };

  highScoreArray.push(highScore);
  localStorage.setItem("highScore", JSON.stringify(highScoreArray));
  done.setAttribute("style", "display:none");
  scores.setAttribute("style", "display: ");
  retrievedData = localStorage.getItem("highScore");
  renderHighScores();
});

function renderHighScores() {
  if (addScores) {
    var retrievedHighScore = JSON.parse(retrievedData);
    retrievedHighScore.sort((a, b) => b.savedScore - a.savedScore);
    if (retrievedHighScore[0]) {
      hs1.textContent = `${retrievedHighScore[0].savedInitials} - ${retrievedHighScore[0].savedScore}`;
    }
    if (retrievedHighScore[1]) {
      hs2.textContent = `${retrievedHighScore[1].savedInitials} - ${retrievedHighScore[1].savedScore}`;
    }
    if (retrievedHighScore[2]) {
      hs3.textContent = `${retrievedHighScore[2].savedInitials} - ${retrievedHighScore[2].savedScore}`;
    }
    if (retrievedHighScore[3]) {
      hs4.textContent = `${retrievedHighScore[3].savedInitials} - ${retrievedHighScore[3].savedScore}`;
    }
  } else {
    hs1.textContent = " ";
    hs2.textContent = " ";
    hs3.textContent = " ";
    hs4.textContent = " ";
  }
}

backbtn.addEventListener("click", function () {
  startQuiz.setAttribute("style", "display: ");
  scores.setAttribute("style", "display:none");
  secondsLeft = 90;
  countdown.textContent = "";
  timerTrigger = true;
  document.getElementById("initials").value = "";
});

clearbtn.addEventListener("click", function () {
  localStorage.clear();
  startQuiz.setAttribute("style", "display: ");
  scores.setAttribute("style", "display:none");
  secondsLeft = 90;
  countdown.textContent = "";
  timerTrigger = true;
  addScores = false;
  renderHighScores();
  document.getElementById("initials").value = "";
});
