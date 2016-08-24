var game = document.getElementById('game');
var counter = document.getElementById('counter');
var money = 0;
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
                setTimeout(function(){
                    addMoney(business.profit * business.amount);
                    business.active = false;
                }, business.time + 100);
            }
        }
    });
        
        
    document.getElementById(business.id+"Bottom").addEventListener('click', function(){
        if(business.cost <= money){
            money -= business.cost;
            displayMoney();
            business.amount++;
            updateAmount(business);
            updateProfit(business);
        }
    });
}

function move(business) {
    var elem = document.getElementById("lemonadeStandProgress");
    var width = 0;
    var id = setInterval(frame, business.time/100);
    function frame() {
        if (width >= 100) {
            setTimeout(function(){
                elem.style.width = '0%';
                clearInterval(id);
            }, 100);
        } else {
            width++; 
            elem.style.width = '100%'; 
        }
    }
}

function updateProfit(business){
    var thisBox = document.getElementById(business.id);
    thisBox.innerHTML = '<div class="box" id="'+business.id+'"><p class="type">'+business.name+'</p><p class="val">Profit: '+business.profit*business.amount+'</p></div>';
}

function updateAmount(business){
    document.getElementById(business.id+"Bottom").innerHTML = '<p>Amount: '+business.amount+'</p><p>Cost: '+business.cost+'</p>';
}

function addMoney(val){
    money += val;
    displayMoney();
}

function displayMoney(){
    document.getElementById('counter').innerHTML = "Money: " + money;
}