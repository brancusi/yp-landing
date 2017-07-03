import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('passive/scroll-down-indicator', 'Integration | Component | passive/scroll down indicator', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{passive/scroll-down-indicator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#passive/scroll-down-indicator}}
      template block text
    {{/passive/scroll-down-indicator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
