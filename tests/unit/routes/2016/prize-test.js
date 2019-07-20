import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | 2016/prize', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:2016/prize');
    assert.ok(route);
  });
});
