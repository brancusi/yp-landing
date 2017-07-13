import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  buildRel(label, children, type = 'recipe') {
    const s = this.get('store');
    const a = s.createRecord('node', {label, type, uom:'floz'});

    children
      .forEach(child => {
        s.createRecord('edge', {a, b:child[0], q:child[1], uom:'floz'})
      });

    return a;
  },

  init() {
    this._super();
    const s = this.get('store');

    // Ingredients
    const orange = s.createRecord('node', {label:'Oranges', uom:'lbs'});
    const limes = s.createRecord('node', {label:'Limes', uom:'lbs'});
    const apples = s.createRecord('node', {label:'Apples', uom:'lbs'});
    const carrots = s.createRecord('node', {label:'Carrots', uom:'lbs'});
    const kale = s.createRecord('node', {label:'Kale', uom:'lbs'});

    // Recipes
    const orangeJuice = this.buildRel('Orange Juice', [[orange, 1.5]]);
    const limeJuice = this.buildRel('Lime Juice', [[limes, 1]]);
    const appleJuice = this.buildRel('Apple Juice', [[apples, 1.1]]);
    const carrotJuice = this.buildRel('Carrot Juice', [[carrots, 2]]);
    const kaleJuice = this.buildRel('Kale Juice', [[kale, 0.8]]);

    // Products
    this.buildRel('Sunny in LA', [[orangeJuice, 4], [limeJuice, 4]], 'product');


    const products = s.peekAll('node').filter(node => node.get('type') === 'product');

    this.set('model', products);
  }
});
