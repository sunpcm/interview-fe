function get(obj, path) {
  const keys = path.replace(/\[(\d)+\]/g, '.$1').split('.');

  return keys.reduce((acc, cur) => {
    return acc?.[cur];
  }, obj);
}
