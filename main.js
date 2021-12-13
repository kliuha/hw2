"use strict"
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

class SuperArray {
    constructor(n, m, options,temp){
        this.n = n;
        this.m = m;
        this.options = options;
        this.temp = temp;   //Змінна для запам'ятовування положення маркеру
        this.arr = Array.from(Array(n), () => new Array(m));
        for(let i = 0; i < this.arr.length; i++){    //Заповнюємо массив випадковими значеннями в заданому діапазоні
            for(let j = 0;j < this.arr[i].length; j++){
                this.arr[i][j] = getRandomIntInclusive(options.min,options.max);
            }
        }
    }
    render(separator){
        let arrayLength = this.arr.length;
        for (let i = 0; i < arrayLength; i++) {
            for(let j = 0;j < this.arr[i].length; j++){
            document.getElementById('arr').innerHTML =document.getElementById('arr').innerHTML +' '+ this.arr[i][j];
            }
            document.getElementById('arr').innerHTML = document.getElementById('arr').innerHTML + '<br>'  ;
        }
        document.getElementById('arr').innerHTML = document.getElementById('arr').innerHTML + separator + '<br>' ;
    }

    clear(direction, k){
        if(direction == 'row'){
            this.arr.splice(k , 1);
        }
        if(direction == 'column'){
            for (let i = 0; i < this.arr.length; i++) {
                let row = this.arr[i];
                row.splice(k, 1);
            }
        }
    }
    setMarker(rowcol){
        if(this.temp === undefined  ){
            this.temp = [rowcol.x,rowcol.y,this.arr[rowcol.x][rowcol.y]];    //Запам'ятовуємо місце і значення нового маркеру
            this.arr[rowcol.x][rowcol.y] = '&'; //Ставимо маркер
        }else{
            this.arr[this.temp[0]][this.temp[1]] = this.temp[2];  // На місце минулого маркера повертаємо значення
            this.temp = [rowcol.x,rowcol.y,this.arr[rowcol.x][rowcol.y]];    //Запам'ятовуємо місце і значення нового маркеру
            this.arr[rowcol.x][rowcol.y] = '&'; //Ставимо маркер
        }

    }
    goTo(rowcol){
        if(Object.entries(this.temp).length === 0 ){
            this.temp = [rowcol.x,rowcol.y,this.arr[rowcol.x][rowcol.y]];
            this.arr[rowcol.x][rowcol.y] = '&';
        } else {
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];
                this.temp = [rowcol.x,rowcol.y,this.arr[rowcol.x][rowcol.y]];
                this.arr[rowcol.x][rowcol.y] = '&';
        }
    }
    shift(direction){
        if(direction == 'left'){
            if(this.temp === undefined  ){
                alert('Use "setMarket" instead of "shift"')    //Якщо маркер ніде не встановлено, вказівка на використання setMarket
            }else if(  this.temp[1] == 0){          //Якщо маркер встановлено на першому елементі рядка, то переносимо маркер на останній елемент
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];   // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0],this.arr[0].length - 1,this.arr[0][this.arr[0].length - 1]];   //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][this.arr[0].length - 1] = '&';
            } else{
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];      // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0],this.temp[1]-1,this.arr[this.temp[0]][this.temp[1]-1]]     //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][this.temp[1]] = '&';  //Зміщуємо маркер вліво
            }
        }
        if(direction == 'right'){
            if(this.temp === undefined  ){
                alert('Use "setMarket" instead of "shift"')          //Якщо маркер ніде не встановлено, вказівка на використання setMarket
            }else if( this.temp[1] == this.arr[this.temp[0]].length - 1 ){  //Якщо маркер встановлено на останньому елементі рядка, то переносимо маркер на перший елемент
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];     // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0],0,this.arr[this.temp[0]][0]];    //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][0] = '&';
            } else{
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];       // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0],this.temp[1]+1,this.arr[this.temp[0]][this.temp[1]+1]];      //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][this.temp[1]] = '&';  //Зміщуємо маркер вправо
            }
        }
        if(direction == 'top'){
            if(this.temp === undefined  ){
                alert('Use "setMarket" instead of "shift"')          //Якщо маркер ніде не встановлено, вказівка на використання setMarket
            } else if(this.temp[0] == 0) {       //Якщо маркер встановленно в першому рядку, то переносимо його на останній рядок
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];     // На місце минулого маркера повертаємо значення
                this.temp = [this.arr.length-1,this.temp[1],this.arr[this.arr.length-1][this.temp[1]]];        //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.arr.length-1][this.temp[1]] = '&';
            }else{
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];   // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0]-1,this.temp[1],this.arr[this.temp[0]-1][this.temp[1]]];    //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][this.temp[1]] = '&';   //Зміщуємо маркер вверх
            }
        }
        if(direction == 'bottom'){
            if(this.temp === undefined  ){
                alert('Use "setMarket" instead of "shift"')     //Якщо маркер ніде не встановлено, вказівка на використання setMarket
            }else if( this.temp[0] == this.arr.length - 1){    //Якщо маркер встановлено на останньому рядку, то переносимо його на перший
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];    // На місце минулого маркера повертаємо значення
                this.temp = [0,this.temp[1],this.arr[0][this.temp[1]]];   //Запам'ятовуємо місце і значення нового маркеру
                this.arr[0][this.temp[1]] = '&';
            } else{
                this.arr[this.temp[0]][this.temp[1]] = this.temp[2];      // На місце минулого маркера повертаємо значення
                this.temp = [this.temp[0]+1,this.temp[1],this.arr[this.temp[0]+1][this.temp[1]]];     //Запам'ятовуємо місце і значення нового маркеру
                this.arr[this.temp[0]][this.temp[1]] = '&';//Зміщуємо маркер вниз
            }
        }
    }
}

const superArray = new SuperArray(3, 3, {min:10,max:55});
