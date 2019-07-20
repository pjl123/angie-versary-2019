import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | 2016/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:2016/index');
    assert.ok(controller);
  });
});
