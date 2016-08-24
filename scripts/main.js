var game = document.getElementById('game');
var counter = document.getElementById('counter');
var money = 0;
displayMoney();
/*global businesses*/

for(var j = 0; j < businesses.length; j++){
    var business = businesses[j];
    addListener(business);
}

function addListener(business){
    document.getElementById(business.id).addEventListener('click', function(){
        if(business.amount > 0){
            if(business.active == false){
                move(business);
                business.active = true;
            }
        }
    });
        
        
    document.getElementById(business.id+"Bottom").addEventListener('click', function(){
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
    var elem = document.getElementById(business.id);
    var width = 0;
    var green = '#83B24F';
    var id = setInterval(frame, business.time/100);
    function frame() {
        width++; 
        if(width < 50){
            elem.style.background = '-webkit-linear-gradient(right, #897D77, #897D77 '+(100-width)+'%, '+green+' 30%, '+green+')';
        }
        else if(width<=100){
            elem.style.background = '-webkit-linear-gradient(left, '+green+', '+green+' '+width+'%, #897D77 30%, #897D77)';
        }
        else if(width == 101){
            setTimeout(function(){
                elem.style.background = '#897D77';
                addMoney(business.profit * business.amount);
                business.active = false;
                clearInterval(id);
            }, 100);
        }
    }
}

function updateProfit(business){
    var thisBox = document.getElementById(business.id);
    thisBox.innerHTML = '<p class="type">'+business.name+'</p><p class="val">Profit: $'+roundMoney(business.profit*business.amount)+'</p>';
}

function updateAmount(business){
    document.getElementById(business.id+"Bottom").innerHTML = '<p>Amount: '+business.amount+'</p><p>Cost: $'+roundMoney(business.cost)+'</p>';
}

function addMoney(val){
    money += val;
    displayMoney();
}

function displayMoney(){
    document.getElementById('counter').innerHTML = "Money: $" + roundMoney(money);
}