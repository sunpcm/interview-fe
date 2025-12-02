function myNew(ObjF, ...args) {
  const newObj = Object.create(ObjF.prototype);

  const result = ObjF.apply(newObj, args);

  const isObj =
    result !== null &&
    (typeof result === 'function' || typeof result === 'object');

  return isObj ? result : newObj;
}

// 解释为什么要判断 return 的值得是不是 null，因为 null会被忽略，改为 return this
// function Person(name) {
// 	this.name = name;
// 	// 开发者试图返回 null，可能是想表示“创建失败”？
// 	return null;
// }
//
// const p = new Person("Tom");
//
// console.log(p);
// 输出: Person { name: "Tom" }
// 惊不惊喜？虽然你 return null，但我依然给了你一个正常的实例对象。
// 这里的 null 被完全忽略了。
