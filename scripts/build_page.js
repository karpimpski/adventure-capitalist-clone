var game = document.querySelector("#game");
var boxColor = '#897D77';
var businesses = [];

function createObject(idVal, nameVal, amountVal, costVal, profitVal, timeVal, incrementVal){
    var thisObj = {
        id: idVal,
        name: nameVal,
        amount: amountVal,
        profit: profitVal,
        cost: costVal,
        time: timeVal,
        increment: incrementVal,
        active: false
    };
    
    businesses.push(thisObj);
}

createObject('lemonadeStand','Lemonade Stand', 1, 4, 1, 500, 1.07);
createObject('newsPaperDelivery','Newspaper Delivery', 0, 60, 60, 3000, 1.15);
createObject('carWash','Car Wash',0,720,540,6000, 1.14);
createObject('pizzaDelivery', 'Pizza Delivery',0,8640,4320,12000,1.13);
createObject('donutShop','Donut Shop',0,103680,51840,24000,1.12);

for(var i = 0; i < businesses.length; i++){
    var business = businesses[i];
    addBox(business);
}

var boxes = document.querySelectorAll('.box');

function addBox(business){
    var rowName = business.id+"Row";
    game.innerHTML += '<div class="box" id="'+business.id+'"><span id="'+business.id+'Progress"></span></div>';
    document.querySelector("#"+business.id).innerHTML += '<p class="type">'+business.name+'</p><p class="val">Profit: $'+moneyString(business.profit)+'</p>';
    game.innerHTML += '<div class="second box" id="'+business.id+'Bottom"></div>';
    document.querySelector("#"+business.id+"Bottom").innerHTML += '<p>Amount: '+business.amount+'</p><p>Cost: $'+moneyString(business.cost)+'</p>';
}

function roundMoney(m){
    return (Math.round(m * 100) / 100).toFixed(2)
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

function moneyString(m){
    return commafy(roundMoney(m));
}

for(var j = 0; j < boxes.length; j++){
    boxes[j].addEventListener('mouseover',function(){
        if(this.className.includes('box-mouse-in') == false){
            this.className = this.className.replace(/\bbox-mouse-out\b/,'');
            this.className += ' box-mouse-in';
        }
    });
    boxes[j].addEventListener('mouseout',function(){
        if(this.className.includes('box-mouse-in')){
            this.className = this.className.replace(/\bbox-mouse-in\b/,'');
            this.className += ' box-mouse-out';
        }
    });
    boxes[j].addEventListener('click',function(){
        this.className = this.className.replace(/\bbox-mouse-in\b/,'');
        this.className = this.className.replace(/\bbox-mouse-out\b/,'');
        this.className += ' box-mouse-in';
    });
}