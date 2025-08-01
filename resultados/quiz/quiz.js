const IniciarQuiz = document.getElementById("btn");
const quizContainer = document.getElementById("quiz-container");

quizContainer.style.display = "none";

function iniciarQuiz() {
    quizContainer.style.display = "block";
    IniciarQuiz.style.display = "none";
}

fetch("https://opentdb.com/api.php?amount=8&category=9")
    .then(data => { return data.json() })
    .then(json => {
        console.log(json);
        const quizData = json.results;
        const quizContainer = document.getElementById("quiz-container");
        let index = 0;
        let quiz = quizData[index];

        const answers = [...quiz.incorrect_answers, quiz.correct_answer];
        answers.sort(() => Math.random() - 0.5); // Shuffle answers
        const questionElement = document.createElement("div");

        answers.forEach(answer => {
            const answerElement = document.createElement("div");
            answerElement.classList.add("answer");
            answerElement.innerHTML = `<input type="radio" name="question${index}" value="${answer}"> ${answer}`;
            questionElement.appendChild(answerElement);
        });


        quizContainer.appendChild(questionElement);

        const nextButton = document.createElement("next");
        nextButton.innerText = "Próxima Pergunta";

        nextButton.style.backgroundColor = "chocolate";
        nextButton.style.color = "white";
        nextButton.style.border = "solid 1px chocolate";
        nextButton.style.borderRadius = "5px";
        nextButton.style.margin = "10px";

        quizContainer.appendChild(nextButton);
        nextButton.addEventListener("click", () => {
            index++;
            if (index < quizData.length) {
                quiz = quizData[index];
                const questionElement = document.createElement("div");
                questionElement.innerHTML = `<h2>${quiz.question}</h2>`;

                const answers = [...quiz.incorrect_answers, quiz.correct_answer];
                answers.sort(() => Math.random() - 0.5); // Shuffle answers

                answers.forEach(answer => {
                    const answerElement = document.createElement("div");
                    answerElement.classList.add("answer");
                    answerElement.innerHTML = `<input type="radio" name="question${index}" value="${answer}"> ${answer}`;
                    questionElement.appendChild(answerElement);
                });


                quizContainer.innerHTML = ""; // Clear previous question
                quizContainer.appendChild(questionElement);
                quizContainer.appendChild(nextButton);
            } else {
                alert("Fim do Quiz!");
            }
        })
    })
