import Component from '@ember/component';

export default Component.extend({
  tagName: 'td',
  classNames: ['gridSquare'],
  currInputCorrect: false,

  actions: {
    answerEntered() {
      if (!this.get('userInput')) {
        return;
      }

      if (this.get('squareInfo.answer') === this.get('userInput').toUpperCase()) {
        if (this.get('currInputCorrect')) {
          this.sendAction('tallyAnswers', 0, this.get('squareInfo.id'), this.get('squareInfo.orientation'), this.get('newOrientation'));
        }
        else {
          this.set('currInputCorrect', true);
          this.sendAction('tallyAnswers', 1, this.get('squareInfo.id'), this.get('squareInfo.orientation'), this.get('newOrientation'));
        }
      }
      else {
        if (this.get('currInputCorrect')) {
          this.set('currInputCorrect', false);
          this.sendAction('tallyAnswers', -1, this.get('squareInfo.id'), this.get('squareInfo.orientation'), this.get('newOrientation'));
        }
        else {
          this.sendAction('tallyAnswers', 0, this.get('squareInfo.id'), this.get('squareInfo.orientation'), this.get('newOrientation'));
        }
      }
      this.set('newOrientation', false);
    },
    
    setNewOrientation() {
      this.set('newOrientation', true);
    }
  }
});
