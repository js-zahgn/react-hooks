function EventBus() {
  this.fnQueue = {};
}

EventBus.prototype = {
  $on: function (fnName, fn) {
    if (this.fnQueue.hasOwnProperty(fnName)) {
      if (typeof this.fnQueue[fnName] === "function") {
        this.fnQueue[fnName] = [this.fnQueue[fnName], fn];
      } else {
        this.fnQueue[fnName] = [...this.fnQueue[fnName], fn];
      }
    } else {
      this.fnQueue[fnName] = fn;
    }
  },
  $once: function (fnName, fn) {
    this.fnQueue[fnName] = fn;
  },
  $emit: function (fnName, params) {
    if (!this.fnQueue.hasOwnProperty(fnName)) return;
    if (typeof this.fnQueue[fnName] === "function") {
      this.fnQueue[fnName](params);
    } else {
      this.fnQueue[fnName].map(fn => fn(params));
    }
  },
  $off: function (fnName) {
    if (!this.fnQueue.hasOwnProperty(fnName)) return;
    delete this.fnQueue[fnName];
  },
};

export default new EventBus();
