import Ember from 'ember';
import _ from 'lodash';

import { toBest } from 'youpressed-landing/utils/converters';
import { roundTo } from 'youpressed-landing/utils/math';

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

export default Ember.Service.extend({

  async generateFullPrepSheet(production) {
    const normalizedChildren = await production.get('normalizedChildren');

    const date = moment(production.get('date')).format('ddd MM/DD/YY');

    const ingredients = {
      renderer: 'items-v2',
      title: 'Step 1 - Gather All Material',
      collection: [
        {
          label: 'Items',
          collection: buildCollection(normalizedChildren, 'ingredient')
        }
      ]
    };

    const recipes = {
      renderer: 'simplified-composite',
      title: 'Step 2 - Juice All Items',
      collection: buildCollection(normalizedChildren, 'recipe')
    };

    const products = {
      renderer: 'composites-v2',
      title: 'Step 3 - Mix Juices',
      collection: buildCollection(normalizedChildren, 'product')
    };

    const payload = {
      data: [
        ingredients,
        recipes,
        products
      ]
    };

    return Ember.$.ajax({
      url: 'https://bywqxz2ic7.execute-api.us-west-1.amazonaws.com/dev/docs/generate-all',
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
