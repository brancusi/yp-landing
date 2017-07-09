import Ember from 'ember';
import ScrollAnimatable from 'youpressed-landing/mixins/scroll-animatable';
import { TweenLite, easing } from 'gsap';

const { Power2 } = easing;

export default Ember.Component.extend(ScrollAnimatable, {
  classNames: ['full-frame'],

  buildAnimations() {
    const tl = new TimelineMax({
      tweens:[
        TweenLite.to(this.$('.background'), .5, { opacity: 0.3 }),
        TweenLite.to(this.$('.image-container img'), .5, { opacity: 1, 'margin-top':0, delay:0.25 }),
        TweenLite.to(this.$('.copy-container span'), 1, { opacity: 1, 'margin-left':0, 'margin-right':0, delay:0.5, ease:Power2.easeInOut })
      ]
    });

    return [
      {tween: tl},
    ];
  }
});
