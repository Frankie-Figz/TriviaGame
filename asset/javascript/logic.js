var counter = 0;
var number = 90;
var clockRunning = false;
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionCounter = 0;

var questions = {
    q1: "Question 1 : What type of number is PI ?",
    q2: "Question 2 : What are the roots of the polynomial X^2 - 4 ? ",
    q3: "Question 3 : What is the solution of the equation 10 X + 5 = 25 ?",
    q4: "Question 4 : Given the following equation of a circle X^2 + Y^2 = 25 what is the diameter?"
};

var questionOptions = {
        q1: [{
            optionValue: "Integer",
            truthValue: "0"
          }, {
            optionValue: "Rational Number",
            truthValue: "0"
          }, {
            optionValue: "Real Number",
            truthValue: "1" 
          }, {
            optionValue: "Natural Number",
            truthValue: "0" 
          }],

          q2: [{
            optionValue: "X = 2, -2",
            truthValue: "1"
          }, {
            optionValue: "X = 4, 1",
            truthValue: "0"
          }, {
            optionValue: "X = -4, -1",
            truthValue: "0" 
          }, {
            optionValue: "X = -2, -2",
            truthValue: "0" 
          }],

          q3: [{
            optionValue: "X = 2",
            truthValue: "1"
          }, {
            optionValue: "X = 4",
            truthValue: "0"
          }, {
            optionValue: "X = 1",
            truthValue: "0" 
          }, {
            optionValue: "X = -2",
            truthValue: "0" 
          }],

          q4: [{
            optionValue: "25",
            truthValue: "0"
          }, {
            optionValue: "5",
            truthValue: "0"
          }, {
            optionValue: "10",
            truthValue: "1" 
          }, {
            optionValue: "50",
            truthValue: "0" 
          }]

    };

// Count points
// window.onload = function()
//     $("#done").on("click", checkAnswer);

// Iterate over the options JSON object
    var generateQuestions = function(q,o){
        for (var key in q) {
          var row = $('<div>');
          row.addClass("row");

          var col = $('<div>');
          col.addClass("col-12");
          // row.append(col);

          var rowQuestion = $('<div>');
          rowQuestion.text(q[key]);
          col.append(rowQuestion);

            if (q.hasOwnProperty(key)) {

                var val = o[key];

                for(j in val){
                  
                  var rowOptionDiv = $('<div>');
                  rowOptionDiv.addClass('custom-control custom-radio custom-control-inline');

                  var rowInput = $('<input>');
                  rowInput.attr("type", "radio");
                  rowInput.attr("id","customRadioInline-" + key + "-opt-" + j);
                  rowInput.attr("name","customRadioInline-" + key);
                  rowInput.addClass("custom-control-input");
                  rowInput.attr("value",val[j].truthValue);

                  var rowInputText = $('<label>');

                  rowInputText.addClass("custom-control-label");
                  rowInputText.attr("for","customRadioInline-" + key + "-opt-" + j);
                  rowInputText.text(val[j].optionValue);

                  rowOptionDiv.append(rowInput);
                  rowOptionDiv.append(rowInputText);
                  
                  col.append(rowOptionDiv);
                  }
              }

          row.append(col);
          var rowSeperator = $('<hr>');
          $("#myForm").append(row);
          $("#myForm").append(rowSeperator);
          
          }
      }

    function timeConverter(t) {

      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
        
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
        
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
        
      return minutes + ":" + seconds;
      }

    function start() {
      // DONE: Use setInterval to start the count here and set the clock to running
      if (!clockRunning) {
          intervalId = setInterval(decrement, 1000);
          clockRunning = true;
      }
    }

      
    //  The decrement function
    function decrement() {

      //  Decrease number by one.
      number--;

      //  Show the number in the #show-number tag.
      $("#displayTimer").text(timeConverter(number));

      //  Once number hits zero...
      if (number == 0) {
        //  ...run the stop function.
        stop();
        $("#done").hide();
        checkAnswer(questions,questionOptions);
        displayStats();
        //  Alert the user that time is up.
        alert("Time Up!");
      }
    };

    function stop(){
      clearInterval(intervalId);
      clockRunning = false;
    }

    function checkAnswer(q,o){

      for (var key in q) {
        questionCounter++;
        if (q.hasOwnProperty(key)) {
          var val = o[key];

          for(j in val){

            var answerValue = document.getElementById("customRadioInline-" + key + "-opt-" + j).value;
            var answerChecked = document.getElementById("customRadioInline-" + key + "-opt-" + j).checked;
            if ((answerValue == 1) && (answerChecked == true)){
              correctAnswers++;
              // console.log("Correct: " + correctAnswers + " at question: " + key + " answer: " + j);
            }
            if ((answerValue == 0) && (answerChecked == true)){
              incorrectAnswers++;
              // console.log("Incorrect: " + incorrectAnswers + " at question: " + key + " answer: " + j);
            }
    
        }

      }

    }
    
    unanswered = questionCounter - (incorrectAnswers + correctAnswers);
    console.log("Unanswered : " + unanswered);
    console.log("Correct : " + correctAnswers);
    console.log("Incorrect : " + incorrectAnswers);
  
  }

  
  function displayStats(){
    $("#myForm").empty();

    var correctDiv = $("<div>");
    var incorrectDiv = $("<div>");
    var unansweredDiv = $("<div>");

    correctDiv.text("Correct Answers : " + correctAnswers);
    incorrectDiv.text("Incorrect Answers : " + incorrectAnswers);
    unansweredDiv.text("Unanswered : " + unanswered);

    $("#myForm").append(correctDiv).append(incorrectDiv).append(unansweredDiv);

  }
