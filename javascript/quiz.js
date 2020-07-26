$(document).ready(function () {
    var selectedFishes = [];
    var quizQuestions = [];

    // Function to start quiz
    $("#startQuiz").click(function () {
        if (selectedFishes.length < 2) {
            alert("You need to click/select at least 2 fishes");
            return;
        }
        $.each(selectedFishes, function (index, value) {
            console.log(value);
            quizQuestions.push(quizData[value].questions);
        });
        $(".bg-modal").css("display", "flex");
    });

    // Function to close the quiz abruptly
    $(".close").click(function () {
        selectedFishes = [];
        quizQuestions = [];
        $(".bg-modal").css("display", "none");
    });

    // Function to submit the quiz
    $("#submitQuiz").click(function (event) {
        console.log(selectedFishes);
    });

    // Function to add fishes in selection
    $(".fish").click(function (event) {
        var fishId = event.currentTarget.id;
        console.log(fishId);

        if (!selectedFishes.contains(fishId)) {
            selectedFishes.push(fishId);
            if (selectedFishes.length > 5) {
                selectedFishes.shift();
            }
        }
    });
});
