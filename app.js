(function(){
 'use strict';
 var app = angular.module('myQuiz', []);
app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
//set variables
$scope.score = 0;
$scope.activeQuestion = -1;
$scope.activeQuestionAnswered = 0;
$scope.percentage = 0;

//HTTP Service Data
$http.get('quiz_russian.json').then(function(quiz){
        $scope.quizQuestions = quiz.data;
        $scope.totalQuestions = $scope.quizQuestions.length;
     });

//SELECET ANSWER function
 $scope.selectAnswer = function(qIndex, aIndex) {
 // set Question State
 var questionState = $scope.quizQuestions[qIndex].questionState;
 var correctAnswer = $scope.quizQuestions[qIndex].correct;
 $scope.quizQuestions[qIndex].correctAnswer = correctAnswer;
//check the status ANSWERED
 if(questionState !== 'answered') {
  $scope.quizQuestions[qIndex].selected = aIndex;
 //check the correctness
      if(aIndex === correctAnswer) {
             $scope.quizQuestions[qIndex].correctness = 'correct';
             $scope.score += 1;
      } else { $scope.quizQuestions[qIndex].correctness = 'incorrect'; }//CORRECT
}//ANSWERED
 $scope.quizQuestions[qIndex].questionState = 'answered';
 $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
}; // function selectAnswer

 $scope.isSelected = function(qIndex, aIndex) {
 return $scope.quizQuestions[qIndex].selected === aIndex;
};
$scope.isCorrect = function(qIndex, aIndex) {
 return $scope.quizQuestions[qIndex].correctAnswer === aIndex;
};
$scope.selectContinue = function() {
 return $scope.activeQuestion += 1;
};
$scope.shareLink = function(percentage) {
 var url = 'http://...';
 var emailLink = '<a href="mailto:?subject=Try to beat my score!&amp;body=I scored a '+percentage+'% on this quiz about Pitirim Sorokin. Try to beat my score at '+url+'" class="btn email">Email a friend</a>';
 var twitterLink = '<a class="btn tweet" target="_blank" href="http://twitter.com/share?text=I scored a '+percentage+'% on this quiz about Pitirim Sorokin. Try to beat my score at&amp;hashtags=PitirimSorokinQuiz&amp;url='+url+'" >Tweet your score</a>';
 var newMarkup = emailLink + twitterLink;
 return $sce.trustAsHtml(newMarkup);
};

 }]);//controller
})();





















