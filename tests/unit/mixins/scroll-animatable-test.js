import Ember from 'ember';
import ScrollAnimatableMixin from 'youpressed-landing/mixins/scroll-animatable';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll animatable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollAnimatableObject = Ember.Object.extend(ScrollAnimatableMixin);
  let subject = ScrollAnimatableObject.create();
  assert.ok(subject);
});
