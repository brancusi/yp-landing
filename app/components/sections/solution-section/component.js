import Ember from 'ember';
import ScrollAnimatable from 'youpressed-landing/mixins/scroll-animatable';
import { TweenLite, easing } from 'gsap';

const { Power2 } = easing;

export default Ember.Component.extend(ScrollAnimatable, {
  tagName: "section",
  classNames: ["row"],

  buildAnimations() {
    return [
      {
        tween: TweenLite.to(this.$('.image-container'), .5, { opacity: 1, 'margin-top':0, delay:0.25 }),
        range: [.2, .5]
      },
      {
        tween: TweenLite.to(this.$('.copy span'), 1, { opacity: 1, 'margin-left':0, 'margin-right':0, delay:0.5, ease:Power2.easeInOut }),
        range: [.2, .5]
      },
      {
        tween: TweenLite.to(this.$('.solution-image-container'), .5, { opacity: 1, 'margin-top':'4em', delay:0.25 }),
        range: [.2, .5]
      }
    ];
  }
});
