import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  questionIndex: 0,
  currentQuestion: computed('model.questions', 'questionIndex', function() {
    return this.get('model.questions').objectAt(this.get('questionIndex'));
  }),

  onLastQuestion: computed('questionIndex', function() {
    return this.get('questionIndex') === (this.get('model.questions.length') - 1);
  }),

  actions: {
    saveAnswer() {
      this.sendAction('saveAnswer', this.get('model.questions'));
    },
    previousQuestion() {
      var questionIndex = this.get('questionIndex');
      if (questionIndex !== 0) {
        this.set('questionIndex', questionIndex - 1);
      }
    },
    nextQuestion() {
      var questionIndex = this.get('questionIndex');
      if (questionIndex !== this.get('model.questions.length') - 1) {
        this.set('questionIndex', questionIndex + 1);
      }
    }
  }
});
