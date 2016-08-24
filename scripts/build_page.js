var game = document.getElementById('game');

var businesses = [];

function createObject(idVal, nameVal, amountVal, profitVal, costVal, timeVal, incrementVal){
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

createObject('lemonadeStand','Lemonade Stand', 1, 1, 4, 500, 1.07);
createObject('newsPaperDelivery','Newspaper Delivery', 0, 60, 60, 3000, 1.15);
createObject('carWash','Car Wash',0,540,720,6000, 1.14);

for(var i = 0; i < businesses.length; i++){
    var business = businesses[i];
    addBox(business);
}

function addBox(business){
    var rowName = business.id+"Row";
    game.innerHTML += '<div class="box" id="'+business.id+'"><span id="'+business.id+'Progress"></span></div>';
    document.getElementById(business.id).innerHTML += '<p class="type">'+business.name+'</p><p class="val">Profit: $'+roundMoney(business.profit)+'</p>';
    game.innerHTML += '<div class="second box" id="'+business.id+'Bottom"></div>';
    document.getElementById(business.id+"Bottom").innerHTML += '<p>Amount: '+business.amount+'</p><p>Cost: $'+roundMoney(business.cost)+'</p>';
}

function roundMoney(m){
    return (Math.round(m * 100) / 100).toFixed(2)
}