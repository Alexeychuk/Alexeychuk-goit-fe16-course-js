'use strict'

let country = prompt("Введите страну").toLowerCase();
let price;

switch(country){

    case "китай": price = 100;       
        break; 

    case "южная америка": price = 250;
       
        break; 
    case "австралия": price = 170;       
        break; 

    case "индия": price = 80;      
        break; 

    case "ямайка": price = 120;
        break;  

    default: alert("В вашей стране доставка не доступна");
}

if (price !== undefined){
    alert(`Доставка в ${country} будет стоить ${price} кредитов`);
}