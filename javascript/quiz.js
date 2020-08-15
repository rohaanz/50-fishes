$(document).ready(function () {
    var selectedFishes = [];
    var quizQuestions = [];
    var selectedQuizQuestions = [];
    var selectedIndexes = [];

    // Function to start quiz
    $("#startQuiz").click(function () {
        if (selectedFishes.length < 4) {
            alert("You need to click/select at least 4 distinct fishes");
            return;
        }
        $.each(selectedFishes, function (index, value) {
            quizQuestions = quizQuestions.concat(quizData[value].questions);
        });
        quizQuestions = shuffle(quizQuestions);

        while (
            selectedQuizQuestions.length < quizQuestions.length &&
            selectedQuizQuestions.length < 4
        ) {
            var index = Math.floor(Math.random() * quizQuestions.length);
            if (selectedIndexes.indexOf(index) == -1) {
                selectedIndexes.push(index);
                selectedQuizQuestions.push(quizQuestions[index]);
            }
        }

        var answers = [];

        $.each(selectedQuizQuestions, function (index, value) {
            $("#question" + (index + 1)).append(
                "<p><strong>Q" +
                    (index + 1) +
                    "</strong>: " +
                    selectedQuizQuestions[index].question +
                    "</p>"
            );
            answers.push(selectedQuizQuestions[index].answer);
        });

        for (var index = 0; index < 4; index++) {
            var shuffledAnswers = shuffle(answers);

            $.each(shuffledAnswers, function (a, value) {
                $("#question" + (index + 1)).append(
                    "<label><input type='radio' name='q" +
                        (index + 1) +
                        "' value='" +
                        value +
                        "' />" +
                        value +
                        "</label>"
                );
            });
        }

        $(".bg-modal").css("display", "flex");
    });

    // Function to close the quiz
    $(".close").click(function () {
        clearData();
        $(".bg-modal").css("display", "none");
    });

    // Function to submit the quiz
    var attempt = 1;
    $("#submitQuiz").click(function (event) {
        clearResults();
        addAttempt(attempt++);
        var $checkedRadio = $("input[type=radio]:checked");
        if ($checkedRadio.length < 4) {
            alert("Please complete all questions");
            return;
        }

        $checkedRadio.each(function () {
            var index = this.name.charAt(1);
            var correctAnswer = selectedQuizQuestions[index - 1].answer;
            var selectedAnswer = this.value;
            if (correctAnswer == selectedAnswer) {
                $("#question" + index).append("<div class='result correct'></div>");
            } else {
                console.log("Answer " + index + " Wrong");
                $("#question" + index).append("<div class='result wrong'>+</div>");
            }
        });
    });

    // Function to add fishes in selection
    $(".fish").click(function (event) {
        var fishId = event.currentTarget.id;

        if (selectedFishes.indexOf(fishId) == -1) {
            selectedFishes.push(fishId);
            if (selectedFishes.length > 5) {
                selectedFishes.shift();
            }
        }
    });

    var clearResults = () => {
        $(".result").remove();
    };

    var clearData = () => {
        selectedFishes = [];
        quizQuestions = [];
        selectedQuizQuestions = [];
        selectedIndexes = [];
        attempt = 1;
        clearAllQuestions();
    };

    var shuffle = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    var addAttempt = (attempt) =>  {
       $("#submitQuiz").html("Submit Quiz (Attempt " + attempt + ")");
    };

    var clearAllQuestions = () => {
        $('div[id^="question"]').empty();
    }
});
