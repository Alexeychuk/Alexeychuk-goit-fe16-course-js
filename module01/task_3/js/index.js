'use strict'

let country = prompt("Введите страну").toLowerCase();
const priceChina = 100;
const priceSA = 250;
const priceAustralia = 170;
const priceIndia = 80;
const priceYamaica = 120;


switch(country){

    case "китай": 
    alert(`Доставка в ${country} будет стоить ${priceChina} кредитов`);      
        break; 

    case "южная америка": 
    alert(`Доставка в ${country} будет стоить ${priceSA} кредитов`);
       
        break; 
    case "австралия":  
    alert(`Доставка в ${country} будет стоить ${priceAustralia} кредитов`);     
        break; 

    case "индия": 
    alert(`Доставка в ${country} будет стоить ${priceIndia} кредитов`);    
        break; 

    case "ямайка": 
    alert(`Доставка в ${country} будет стоить ${priceYamaica} кредитов`);
        break;  

    default: alert("В вашей стране доставка не доступна");
}

