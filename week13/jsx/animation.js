const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATION = Symbol("animation");

export class Timeline {
  constructor() {
    this[ANIMATION] = new Set();
  }
  start() {
    let startTime = Date.now();
    this[TICK] = () => {
      let t = Date.now() - startTime;
      for (const animation of this[ANIMATION]) {
          console.log(t);
          let t0=t
        if (t > animation.duration) {
          this[ANIMATION].delete(animation);
          t0=animation.duration
        }
        animation.receive(t0);
      }
      requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }
  pause() {}
  resume() {}

  reset() {}

  add(animation) {
    this[ANIMATION].add(animation);
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
  }
  receive(time) {
    let range = this.endValue - this.startValue;
    this.object[this.property] =
      this.startValue + (range * time) / this.duration; //?
  }
}
