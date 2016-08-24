var game = document.getElementById('game');

var businesses = [];

function createObject(idVal, nameVal, amountVal, profitVal, costVal, timeVal){
    var thisObj = {
        id: idVal,
        name: nameVal,
        amount: amountVal,
        profit: profitVal,
        cost: costVal,
        time: timeVal,
        active: false
    };
    
    businesses.push(thisObj);
}

createObject('lemonadeStand','Lemonade Stand', 1, 1, 20, 500);
createObject('newsPaperDelivery','Newspaper Delivery', 0, 10, 40, 1000);

for(var i = 0; i < businesses.length; i++){
    var business = businesses[i];
    addBox(business);
}

function addBox(business){
    var rowName = business.id+"Row";
    game.innerHTML += '<div class="box" id="'+business.id+'"><span id="'+business.id+'Progress"></span></div>';
    document.getElementById(business.id).innerHTML += '<p class="type">'+business.name+'</p><p class="val">Profit: '+business.profit+'</p>';
    game.innerHTML += '<div class="second box" id="'+business.id+'Bottom"></div>';
    document.getElementById(business.id+"Bottom").innerHTML += '<p>Amount: '+business.amount+'</p><p>Cost: '+business.cost+'</p>';
    game.innerHTML += '<div class="progressBar"><span id="'+business.id+'Progress"></span></div>';
}