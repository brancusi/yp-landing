import Ember from 'ember';
import uuid from 'youpressed-landing/utils/uuid';
import _ from 'lodash';
import downloadFile from "youpressed-landing/utils/download-file";

const sortFunc = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();
  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  return 0;
}

const buildCollection = (data, type) => {
  return _
    .map(data)
    .filter(child => child.type === type)
    .filter(child => child.factor > 0)
    .map(child => child.tree)
    .map(tree => {
      return {
        label: tree.label,
        q: tree.q,
        uom: tree.uom,
        collection: tree.tree.sort(sortFunc)
      }
    })
    .sort(sortFunc);
}

export default Ember.Component.extend({
  store: Ember.inject.service(),
  pdfGenerator: Ember.inject.service(),

  buildRel(label, children, type = 'recipe', uom = 'floz') {
    const s = this.get('store');
    const a = s.createRecord('node', {id: uuid(), label, type, uom});

    children
      .forEach(data => {
        s.createRecord('edge', {a, b:data[0], q:data[1], uom:data[2]})
      });

    return a;
  },

  init() {
    this._super();
    const s = this.get('store');

    // Ingredients
    const orange = s.createRecord('node', {id:1, label:'Oranges', uom:'lb'});
    const limes = s.createRecord('node', {id:2, label:'Limes', uom:'lb'});
    const apples = s.createRecord('node', {id:3, label:'Apples', uom:'lb'});
    const carrots = s.createRecord('node', {id:4, label:'Carrots', uom:'lb'});
    const kale = s.createRecord('node', {id:5, label:'Kale', uom:'lb'});

    // Recipes
    const orangeJuice = this.buildRel('Orange Juice', [[orange, 1.5, 'lb']]);
    const limeJuice = this.buildRel('Lime Juice', [[limes, 1, 'lb']]);
    const appleJuice = this.buildRel('Apple Juice', [[apples, 1.1, 'lb']]);
    const carrotJuice = this.buildRel('Carrot Juice', [[carrots, 2, 'lb']]);
    const kaleJuice = this.buildRel('Kale Juice', [[kale, 0.8, 'lb']]);

    // Products
    const product1 = this.buildRel('Sunny in LA', [[orangeJuice, 4, 'floz'], [limeJuice, 4, 'floz']], 'product', 'count');
    const product2 = this.buildRel('92° And Hot', [[appleJuice, 2, 'floz'], [carrotJuice, 5, 'floz']], 'product', 'count');
    const product3 = this.buildRel('Superman Flew', [[kaleJuice, 4, 'floz'], [orangeJuice, 4, 'floz']], 'product', 'count');

    // Production
    const production = this.buildRel('production1', [[product1, 1, 'count'], [product2, 1, 'count'], [product3, 1, 'count']], 'production', 'count');

    this.set('model', production);
  },

  recipes: Ember.computed('model.normalizedChildren', function() {
    return buildCollection(this.get('model.normalizedChildren'), 'recipe');
  }),

  ingredients: Ember.computed('model.normalizedChildren', function() {
    return buildCollection(this.get('model.normalizedChildren'), 'ingredient');
  }),

  actions: {
    handleQuantityUpdate(edge, q) {
      edge.set('q', q);
    },

    handleQuantityBlur(edge, event) {
      if(event.target.value === "" || event.target.value === undefined) {
        edge.set('q', 0);
      }
    },

    async printAll() {
      const { url } = await this.get('pdfGenerator').generateFullPrepSheet(this.get('model'));
      return downloadFile(url, 'mykey');
    }
  }
});
