import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.transitionTo('2019.cross-compatibility');
  }
});