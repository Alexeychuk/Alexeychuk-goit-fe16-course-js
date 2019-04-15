'use strict'

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
while(attemptsLeft){
    
    let inputPassword = prompt('Введите пароль');
    if (inputPassword === null) break;
    if (passwords.includes(inputPassword)){
        alert('Добро пожаловать!');
        break;
    } else{
        attemptsLeft--; 
        if (attemptsLeft === 0){
         alert(`У вас закончились попытки, аккаунт заблокирован!`);
         break;
        }
        alert(`Неверный пароль, у вас осталось ${attemptsLeft } попыток`)
    }

   
}

