import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signup(){
      window.location = 'https://app.youpressed.com/signup';
    }
  }
});
