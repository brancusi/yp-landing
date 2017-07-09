import Ember from 'ember';
import ScrollAnimatable from 'youpressed-landing/mixins/scroll-animatable';
import { TweenLite, easing } from 'gsap';

const { Power2 } = easing;

export default Ember.Component.extend(ScrollAnimatable, {
  tagName: "section",
  classNames: ["row"],

  startTyping() {
    var typewriter = new Typewriter(this.$('.typewriter-container')[0], {});

    typewriter.typeString("Let's face it")
        .pauseFor(500)
        .typeString(', calculating production is a pain')
        .pauseFor(500)
        .changeSettings({deleteSpeed: 200, typingSpeed: 300})
        .deleteChars(9)
        .typeString('sucks!')
        .start();
  },

  buildAnimations() {
    const $imageContainer = this.$('.fruit-container');

    return [
      {
        tween: TweenLite.to($imageContainer, 2, {opacity:1, onStart: this.startTyping.bind(this)}),
        range: [.2, .5]
      }
    ];
  }
});
