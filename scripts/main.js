var game = document.querySelector('#game');
var counter = document.querySelector('#counter');
var boxColor = '#897D77';
var darkBoxColor = '#7e736d';
var money = 0;
displayMoney();
/*global businesses*/

for(var j = 0; j < businesses.length; j++){
    var business = businesses[j];
    addListener(business);
}

function addListener(business){
    document.querySelector("#"+business.id).addEventListener('click', function(){
        if(business.amount > 0){
            if(business.active == false){
                move(business);
                business.active = true;
            }
        }
    });
        
    document.querySelector("#"+business.id+"Bottom").addEventListener('click', function(){
        if(business.cost <= money){
            money -= business.cost;
            displayMoney();
            business.amount++;
            business.cost = roundMoney(business.cost * business.increment);
            updateAmount(business);
            updateProfit(business);
            
        }
    });
}

function roundMoney(m){
    return (Math.round(m * 100) / 100).toFixed(2)
}

function move(business) {
    var elem = document.querySelector("#"+business.id);
    var width = 0;
    var green = '#83B24F';
    var id = setInterval(frame, business.time/100);
    function frame() {
        var c = '#897D77';
        width++;
        if(elem.className.includes("box-mouse-in")){
            c = '#7e736d';
        }
        if(width < 50){
            elem.style.background = '-webkit-linear-gradient(right, '+c+', '+c+' '+(100-width)+'%, '+green+' 30%, '+green+')';
        }
        else if(width<=100){
            elem.style.background = '-webkit-linear-gradient(left, '+green+', '+green+' '+width+'%, '+c+' 30%, '+c+')';
        }
        else if(width == 101){
            setTimeout(function(){
                elem.style.background = darkBoxColor;
                addMoney(business.profit * business.amount);
                business.active = false;
                clearInterval(id);
            }, 100);
        }
    }
}

function updateProfit(business){
    var thisBox = document.querySelector("#"+business.id);
    thisBox.innerHTML = '<p class="type">'+business.name+'</p><p class="val">Profit: $'+moneyString(business.profit*business.amount)+'</p>';
}

function updateAmount(business){
    document.querySelector("#"+business.id+"Bottom").innerHTML = '<p>Amount: '+business.amount+'</p><p>Cost: $'+moneyString(business.cost)+'</p>';
}

function addMoney(val){
    money += val;
    displayMoney();
}

function moneyString(m){
    return commafy(roundMoney(m));
}

function displayMoney(){
    document.querySelector('#counter').innerHTML = "Money: $" + moneyString(money);
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}