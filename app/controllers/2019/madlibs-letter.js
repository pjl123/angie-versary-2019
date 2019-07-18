import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveAnswer(questions) {
      this.set('model.questions', questions);
    }
  }
});
