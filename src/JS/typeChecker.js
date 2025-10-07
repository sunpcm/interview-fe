function getType(value) {
  const typeString = Object.prototype.toString.call(value);
  return typeString.slice(8, -1).toLowerCase();
}

console.log(getType([])); // "array"
console.log(getType(null)); // "null"
console.log(getType(new Date())); // "date"
