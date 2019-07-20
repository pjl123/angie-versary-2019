import Controller from '@ember/controller';

export default Controller.extend({
  answers: {
    "question1": "heather",
    "question2": "cheesesteak",
    "question3": "zee bar",
    "question4": "alize",
    "question5": "cheesy bread",
    "question6": "miami",
    "question7": "card suits",
    "question8": "50 cent",
    "question9": "couples massage",
    "question10": "e"
  },
  quizComplete: false,

  actions: {
    validateForm() {
      var quizComplete = this.get('quizComplete');
      var answers = this.get('answers');
      if (quizComplete){
        this.transitionToRoute('2016.prize');
        return;
      }
      
      var valid = true;      
      var questionInputs = document.getElementsByName("question");
      for (var i = 0; i < questionInputs.length; i++){
        var correct = questionInputs[i].value.toLowerCase().indexOf(answers[questionInputs[i].attributes["id"].value]) >= 0;
        if (correct) {
          questionInputs[i].parentNode.classList.remove("table-danger");
          questionInputs[i].parentNode.classList.add("table-success");
        }                        
        else {
          questionInputs[i].parentNode.classList.remove("table-success");
          questionInputs[i].parentNode.classList.add("table-danger");
        }
        valid &= correct;
      }
      
      if (valid){
        document.getElementById("submit").innerHTML = "Click for prize!";
        quizComplete = true;
      }
      this.set('quizComplete', quizComplete);
    }
  }
});
