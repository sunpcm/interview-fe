// a.js
console.log('a start');
import { b } from './b.js';
console.log('a end', b);
export const a = 'A';
