export function newInstance(instance, type) {
  if (instance == null) return false;
  const instanceType = typeof instance;
  if (instanceType !== 'object' && instanceType != 'function') return false;

  let prototype = Object.getPrototypeOf(instance);
  while (prototype) {
    if (prototype == type.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
