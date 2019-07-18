import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  useDefaults: false,
  formattedLetter: computed('model.questions.@each', 'useDefaults', function () {
    var questions = this.get('model.questions');
    var letter = this.get('model.letterTemplate');
    for (var i = 0; i < questions.length; i++) {
      letter = letter.replace(questions.objectAt(i).replacement, this.get('useDefaults') ? questions.objectAt(i).defaultAnswer : questions.objectAt(i).userAnswer);
    }
    return letter;
  }),

  actions: {
    useDefaultAnswers() {
      this.set('useDefaults', true);
    },
    useUserAnswers() {
      this.set('useDefaults', false);
    }
  }
});
