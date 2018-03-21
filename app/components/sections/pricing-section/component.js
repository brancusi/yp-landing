import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signup(){
      window.location = 'mailto:hello@youpressed.com?subject=Get started with youpressed!';
    }
  }
});
