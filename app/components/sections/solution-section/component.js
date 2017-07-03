import Ember from 'ember';
import ScrollAnimatable from 'youpressed-landing/mixins/scroll-animatable';
import { TweenLite, easing } from 'gsap';

const { Power2 } = easing;

export default Ember.Component.extend(ScrollAnimatable, {
  tagName: "section",
  classNames: ["row"],

  buildAnimations() {
    const $imageContainer = this.$('.image-container');

    return [
      {
        tween: TweenLite.to($imageContainer, 2, {opacity:1}),
        range: [.2, .5]
      }
    ];
  }
});
