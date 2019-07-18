import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('2019.madlibs-letter'); 
  }
});
