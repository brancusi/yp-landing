import Ember from 'ember';

export default Ember.Mixin.create({
  resizeTimeout: null,
  lastScroll: 0,
  isBottom: false,
  ticking: false,
  lastRatio: 0,

  didInsertElement() {
    this.rules = this.buildAnimations();

    this.rules.forEach(rule => rule.tween.pause());

    this._addInternalListeners();

    // Force refresh
    this._resized();
    this._scrolled();

    this._super();
  },

  willDestroyElement() {
    this._removeInternalListeners();

    this._super();
  },

  buildAnimations() {
    //Override
  },

  scrolled() {
    //Override
  },

  resized() {
    //Override
  },

  onReachedBottom() {
    //Override
  },

  onHasScrollRemaining() {
    //Override
  },

  _addInternalListeners() {
    this.boundScroll = this._scrollThrottler.bind(this);
    this.resizeScroll = this._resizeThrottler.bind(this);

    window.addEventListener('scroll', this.boundScroll);
    window.addEventListener('resize', this.resizeScroll);
  },

  _removeInternalListeners() {
    window.removeEventListener('scroll', this.boundScroll);
    window.removeEventListener('resize', this.resizeScroll);
  },

  _internalScrolled(ratio) {
    this.rules = this.rules
      .filter(rule => !rule.completed)
      .map(rule => this._processRule(rule, ratio));
  },

  _processRule(rule, ratio) {
    const {
      scrub = false,
      scrubReverse = false,
      range = [0, 1],
      repeat = true,
      maxRatioToDate = 0,
      tween
    } = rule;

    const beforeStartRange = ratio < range[0];
    let completed = false;

    if(beforeStartRange) {
      return rule;
    }

    const diff = range[1] - range[0];
    const reset = ratio - range[0];
    const normalizedRatio = Math.min(reset / diff, 1);

    if(scrub) {
      const isGreaterThanPast = ratio > maxRatioToDate;
      if(scrubReverse || isGreaterThanPast) {
        tween.progress(normalizedRatio);
        if(ratio >= range[1]) {
          if(!repeat) {
            completed = true;
          }
        }
      }
    } else if(ratio >= range[0]) {
      tween.play();
      if(!repeat) {
        completed = true;
      }
    }

    return {
      scrub,
      scrubReverse,
      range,
      repeat,
      maxRatioToDate: Math.max(ratio, maxRatioToDate),
      completed,
      tween
    }
  },

  _scrollThrottler() {
    this.lastScroll = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this._scrolled(this.lastScroll);
        this.ticking = false;
      });
    }
    this.ticking = true;
    const remainingScroll = (document.body.scrollHeight - $(window).height()) - window.scrollY;

    if(remainingScroll <= 0) {
      if(!this.isBottom) {
        this.isBottom = true;
        this.onReachedBottom();
      }
    } else {
      if(this.isBottom) {
        this.isBottom = false;
        this.onHasScrollRemaining();
      }

    }

  },

  _resizeThrottler() {
    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this._resized();
       }, 66);
    }
  },

  _resized() {
    this.set('position', this.$('').offset());
    this.set('height', this.$('').height());
    this.set('width', this.$('').width());

    this.resized(this.$(window).height());
  },

  _scrolled() {
    const center = window.scrollY + (window.innerHeight/2) - this.get('position').top;
    const numerator = window.scrollY + window.innerHeight - this.get('position').top;
    const denominator = this.get('height') + window.innerHeight;
    const ratio = numerator/denominator;

    if(ratio < 0) {
      if(this.get('lastRatio') > 0) {
        this.get('lastRatio');
        this.scrolled(0, center);
      }
    } else if(ratio > 1) {
      if(this.get('lastRatio') < 1) {
        this.set('lastRatio', 1);
        this.scrolled(1, center);
      }
    } else {
      this.set('lastRatio', ratio);
      this._internalScrolled(ratio);
      this.scrolled(ratio, center);
    }
  }
});
