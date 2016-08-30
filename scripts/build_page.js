var businesses = [];

createObject('lemonadeStand','Lemonade Stand', 1, 4, 1, 500, 1.07, '#F2DC38', '#f0d71b');
createObject('newsPaperDelivery','Newspaper Delivery', 0, 60, 60, 3000, 1.15, '#E2DDDA', '#d5cdc9');
createObject('carWash','Car Wash',0,720,540,6000, 1.14, '#68B7EF', '#4caaec');
createObject('pizzaDelivery', 'Pizza Delivery',0,8640,4320,12000,1.13, '#AF2705', '#912004');
createObject('donutShop','Donut Shop',0,103680,51840,24000,1.12, '#EB9034', '#e88118');

setAnimations();

function createObject(idVal, nameVal, amountVal, costVal, profitVal, timeVal, incrementVal, colorVal, darkColorVal){
    var thisObj = {
        id: idVal,
        name: nameVal,
        amount: amountVal,
        profit: profitVal,
        cost: costVal,
        time: timeVal,
        increment: incrementVal,
        color: colorVal,
        darkColor: darkColorVal,
        active: false
    };
    
    businesses.push(thisObj);
    addBox(thisObj);
}

function addBox(business){
    if(business.amount >= 1){
        var classList = 'box';
    }
    else{
        classList = 'unowned box';
    }
    document.querySelector("#firstRow").innerHTML += '<div class="'+classList+' " id="'+business.id+'"><span id="'+business.id+'Progress"></span></div>';
    document.querySelector("#"+business.id).innerHTML += '<p class="type">'+business.name+'</p><p class="val">Profit: $'+moneyString(business.profit)+'</p>';
    document.querySelector("#secondRow").innerHTML += '<div class="second '+classList+' " id="'+business.id+'Bottom"></div>';
    document.querySelector("#"+business.id+"Bottom").innerHTML += '<p>Amount: '+business.amount+'</p><p>Cost: $'+moneyString(business.cost)+'</p>';
}

function setAnimations(){
    for(var l = 0; l < businesses.length; l++){
        var bus = businesses[l];
        var thisBox = document.querySelector("#"+bus.id);
        refreshListeners(bus);
        if(bus.amount < 1){
            thisBox.style.background = 'gray';
        }
    }
}

function refreshListeners(bus){
    resetTags(bus);
    addMouseListeners(bus);
}

function resetTags(bus){
    var thisBox = document.querySelector("#"+bus.id);
    var bottomBox = document.querySelector("#"+bus.id+"Bottom");
    removeMouseTags(bus, thisBox);
    removeMouseTags(bus, bottomBox);
}

function removeMouseTags(bus, thisBox){
    var mouseOutReg = new RegExp(bus.id+"-mouse-out","g");
    var mouseInReg = new RegExp(bus.id+'-mouse-in',"g");
    thisBox.className = thisBox.className.replace(mouseOutReg,'');
    thisBox.className = thisBox.className.replace(mouseInReg, '');
    if(bus.amount >= 1){
        removeUnownedClass(thisBox);
    }
}

function addMouseListeners(bus){
    var thisBox = document.querySelector("#"+bus.id);
    var bottomBox = document.querySelector("#"+bus.id+"Bottom");
    addListener(bus, thisBox);
    addListener(bus, bottomBox);
}

function addListener(bus, thisBox){
    thisBox.addEventListener("mouseover", function(){
        animateIn(bus, thisBox);
    });
    
    thisBox.addEventListener("mouseout", function(){
        animateOut(bus, thisBox);
    });
}

function animateIn(bus, thisBox){
    if(bus.amount >= 1){
        var thisId = bus.id;
    }
    else{
        thisId = 'unowned';
    }
    
    if(thisBox.className.includes(thisId+'-mouse-in') == false){
        var re = new RegExp(thisId+"-mouse-out","g");
        thisBox.className = thisBox.className.replace(re,'');
        thisBox.className += thisId+'-mouse-in';
    }
}

function animateOut(bus, thisBox){
    if(bus.amount >= 1){
        var thisId = bus.id;
    }
    else{
        thisId = 'unowned';
    }
    
    if(thisBox.className.includes(thisId+'-mouse-in')){
        var re = new RegExp(thisId+'-mouse-in',"g");
        thisBox.className = thisBox.className.replace(re, '');
        thisBox.className += thisId+'-mouse-out';
    }
}

function roundMoney(m){
    return (Math.round(m * 100) / 100).toFixed(2);
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

function setColor(thisBusiness, thisBox){
    thisBox.style.background = thisBusiness.color;
    document.querySelector("#"+thisBusiness.id+"Bottom").style.background = thisBusiness.color;
    setAnimations();
}

function removeUnownedClass(thisBox){
    var unownedReg = new RegExp('unowned', 'g');
    var unownedOutReg = new RegExp('-mouse-out', 'g');
    var unownedInReg = new RegExp('-mouse-in', 'g');
    thisBox.className = thisBox.className.replace(unownedReg, '');
    thisBox.className = thisBox.className.replace(unownedOutReg, '');
    thisBox.className = thisBox.className.replace(unownedInReg, '');
}