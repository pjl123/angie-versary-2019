import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('2019', function() {
    this.route('cross-compatibility');
    this.route('madlibs-letter', function() {
      this.route('questions');
      this.route('letter');
    });
  });
});

export default Router;
