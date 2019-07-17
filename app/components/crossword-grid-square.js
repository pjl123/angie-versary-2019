import Component from '@ember/component';

export default Component.extend({
  tagName: 'td',
  classNames: ['gridSquare'],
  currInputCorrect: false,

  actions: {
    answerEntered() {
      if (this.get('squareInfo.answer') === this.get('userInput').toUpperCase()) {
        if (this.get('currInputCorrect')) {
          this.sendAction('tallyAnswers', 0);
        }
        else {
          this.set('currInputCorrect', true);
          this.sendAction('tallyAnswers', 1);
        }
      }
      else {
        if (this.get('currInputCorrect')) {
          this.set('currInputCorrect', false);
          this.sendAction('tallyAnswers', -1);
        }
        else {
          this.sendAction('tallyAnswers', 0);
        }
      }
    }
  }
});
