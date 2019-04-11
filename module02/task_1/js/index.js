'use strict'

let input = prompt('Введите число');
let total = 0;
const numbers = [];

while (input !== null){
  numbers.push(input);
  input = prompt('Введите еще число');
}
if (numbers.length !== 0){
  for (let number of numbers){
  total += Number(number); 
}

console.log(`Общая сумма чисел равна ${total} `);
}
