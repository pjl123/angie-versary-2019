import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | 2019/madlibs-letter/letter', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:2019/madlibs-letter/letter');
    assert.ok(controller);
  });
});
