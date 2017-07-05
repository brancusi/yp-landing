import Ember from 'ember';
import { TweenMax, easing } from 'gsap';

const {
  Power1
} = easing;

export default Ember.Component.extend({
  classNames: ['scroll-down-indicator'],

  willDestroyElement() {
    this.tween.kill();
    this.fadeInTween.kill();
    this._super();
  },

  didInsertElement() {
    this.fadeInTween = TweenMax.to(this.$('.content'), 1, {opacity:1, ease:Power1.easeInOut, delay:2});
    this.tween = TweenMax.to(this.$('.content'), .5, {y:"+=10px", ease:Power1.easeInOut, yoyo:true, repeat: Number.POSITIVE_INFINITY});
  }
});
