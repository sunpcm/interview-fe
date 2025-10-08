class LazyMan {
  task = [];
  constructor(name) {
    this.name = name;
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.task.shift();
    if (task) {
      task();
    }
  }

  eat(food) {
    const task = () => {
      console.log(this.name + 'eat' + food);
      this.next();
    };
    this.task.push(task);
    return this;
  }
  sleep(time) {
    const task = () => {
      console.log(this.name + 'will sleep' + time + 's');
      setTimeout(() => {
        console.log(this.name + 'slept' + time + 's');
        this.next();
      }, time * 1000);
    };
    this.task.push(task);
    return this;
  }
}
