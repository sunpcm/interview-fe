class Singleton {
  static #_instance = null;
  constructor(name) {
    if (Singleton.#_instance !== null) {
      console.log('Singleton Existed, Value may not changed');
      return Singleton.#_instance;
    }
    this.name = name;
    Singleton.#_instance = this;
  }

  get() {
    return this.name;
  }
  set(name) {
    this.name = name;
  }
}

const SingletonFunc = (function () {
  let _instance = null;
  function SingletonConstructor(name) {
    if (_instance !== null) {
      console.log('Singleton Existed, Value may not changed');
      return _instance;
    }
    this.name = name;
    _instance = this;
  }

  SingletonConstructor.prototype.get = function () {
    return this.name;
  };
  SingletonConstructor.prototype.set = function (name) {
    this.name = name;
  };

  return SingletonConstructor;
})();

export { Singleton, SingletonFunc };
