var money = 1000000;
displayMoney();
/*global businesses setColor*/

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
        var thisBox = document.querySelector("#"+business.id+"");
        if(business.cost <= money){
            if(thisBox.className.includes('unowned')){
                thisBox.className = thisBox.className.replace(/\bunowned\b/g,'');
            }
            updateBusiness(business);
        }
    });
}

function roundMoney(m){
    return (Math.round(m * 100) / 100).toFixed(2);
}

function move(business) {
    var elem = document.querySelector("#"+business.id);
    var width = 0;
    var green = '#83B24F';
    var id = setInterval(frame, business.time/100);
    function frame() {
        var c = business.darkColor;
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
                elem.style.background = c;
                addMoney(business.profit * business.amount);
                business.active = false;
                clearInterval(id);
            }, 100);
        }
    }
}

function updateBusiness(business){
    var thisBox = document.querySelector("#"+business.id);
    money -= business.cost;
    displayMoney();
    business.amount++;
    business.cost = roundMoney(business.cost * business.increment);
    setColor(business, thisBox);
    thisBox.innerHTML = '<p class="type">'+business.name+'</p><p class="val">Profit: $'+moneyString(business.profit*business.amount)+'</p>';
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
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}