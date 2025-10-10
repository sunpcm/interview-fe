class Singleton {
  static _instance = null;

  constructor(name) {
    if (Singleton._instance) return Singleton._instance;
    this.name = name;
    Singleton._instance = this;
  }
  get() {
    return this.name;
  }
  set(value) {
    this.name = value;
  }
}
