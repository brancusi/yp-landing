import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/demo-section', 'Integration | Component | sections/demo section', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/demo-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/demo-section}}
      template block text
    {{/sections/demo-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
