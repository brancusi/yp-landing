import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNameBindings: ['menuOpen:menu-open'],
  menuOpen:false,

  isActive: computed("menuOpen", function(){
    return this.get("menuOpen") ? "is-active" : "";
  }),

  actions: {
    toggle() {
      this.set("menuOpen", !this.get("menuOpen"));
    },

    closeMenu() {
      this.set("menuOpen", false);
    }
  }
});
