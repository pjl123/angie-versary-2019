import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  fingerprint: {
    exclude: [
      'assets/Art/Background.png',
      'assets/Art/Heart.png',
      'assets/Art/Pointer.png',
      'assets/Art/TurnSpriteSheet.png'
    ]
  },
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
