import Ember from 'ember';
import { TweenMax, easing } from 'gsap';

const {
  Power1
} = easing;

export default Ember.Component.extend({
  willDestroyElement() {
    this.tween.kill();
    this._super();
  },

  didInsertElement() {
    const $imageContainer = this.$('.img-container');
    this.tween = TweenMax.to(this.$('.content'), .5, {y:"+=10px", ease:Power1.easeInOut, yoyo:true, repeat: Number.POSITIVE_INFINITY});
  }
});
