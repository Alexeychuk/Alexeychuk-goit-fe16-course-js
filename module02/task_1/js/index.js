'use strict'


let total = 0;
const numbers = [];
let input;
do {
  input = prompt('Введите число');
  if(isNaN(input) === false && input !== "" && input !== null){
   numbers.push(input); 
  }
} while (input !== null);

if (numbers.length !== 0){
  for (let number of numbers){
  total += Number(number); 
}

console.log(`Общая сумма чисел равна ${total} `);
}

