'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    return this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter(
      (currentListener) => currentListener !== listener,
    );

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].slice().forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    return this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};
    } else {
      delete this.events[event];
    }

    return this;
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
