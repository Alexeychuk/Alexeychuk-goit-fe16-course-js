'use strict'

let credits = 23580;
const pricePerDroid = 3000;
let droidAmount = prompt('Введите кол-во дроидов') ;
if (droidAmount === null || Number(droidAmount) !== Number(droidAmount)){
    alert('Отменено пользователем!');
} else { 
    const totalPrice = droidAmount * pricePerDroid;
    if (totalPrice > credits) {
        alert('Недостаточно средств на счету!');
    } else {
        alert(`Вы купили ${droidAmount} дроидов, на счету осталось ${credits - totalPrice} кредитов.`)
    }
};

