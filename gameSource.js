/* 
 * Game name: moneyClocker
 * Copyright 2019 Nathan Martin
*/

//Start Variable Declarations//
var time = 0;
var clocks = 1;
var clockPricing = Math.pow(10, clocks);
var clockHandDoc = null;
var clockPos = 0;
var clockSpeed = 0;
var upgradeMenu = null;
var displayToggle = null;
var tickAudio = null;
var soundSwitch = 1;
var tempMenuNum = -1;
var tempMenuToggle = null;
var tempMenu = null;
var displayToggleState = [
	false,
	false
];
var menusList = [
	'upgrade',
	'settings'
];
var numMenusList = menusList.length;
//End Variable Declarations//

var arrayTrue = function(element) { //Checks if givin element from array is true
	return element == true; 
}

function gameMain() {
    var clockIncrease = window.setInterval(clockTick, 10);
}

function timeUpdate() { //Updates the screens and logs current time values.
    document.getElementById('timeValue').innerHTML = time;
    console.log('time: ' + time);
}

function clockUpdate() {
	clockPricing = Math.pow(10, clocks);
    document.getElementById('clocks').innerHTML = clocks;
    console.log('Clocks: ' + clocks);
    document.getElementById('clockPrice').innerHTML = clockPricing;
    console.log('Current clock price: ' + clockPricing);
}

function clockAdd() {
    clockUpdate();
    if(time >= clockPricing) {
        time = time - clockPricing;
        timeUpdate();
        clocks = clocks + 1;
    } else {
        console.log('Not enough time.');
    }
    clockUpdate();
}

function timeAdd() { //Adds one to time
    time = time + 1;
    timeUpdate();
}

function clockTick() {
	clockHandDoc = document.getElementById('clockHand');
	tickAudio = document.getElementById("tickAudio");
	if(clockPos >= 360) {
		if(soundSwitch == true) {
			tickAudio.play();
		}
	    clockPos = clockPos - 360;
		timeAdd();
	}
	
	clockSpeed = 3.6 * clocks;
	
    clockPos = clockPos + clockSpeed;
    clockHandDoc.style.transform = 'rotate(' + clockPos + 'deg' + ')';
    //console.log(clockPos);
}

function showMenu(menu, menuNum) {
	upgradeDiv = document.getElementById(menu + 'Div');
	displayToggle = document.getElementById(menu + 'Toggle');
	if(displayToggleState[menuNum] == false) {
		console.log(displayToggleState.some(arrayTrue));
		console.log(displayToggleState.findIndex(arrayTrue));

		for(x = 0; displayToggleState.some(arrayTrue) == true; x = 0) {
			tempMenuNum = displayToggleState.findIndex(arrayTrue);
            tempMenu = document.getElementById(menusList[tempMenuNum] + 'Div');
            //tempMenuToggle = document.getElementById(menusList[tempMenuNum] + 'Toggle');
			tempMenu.style.display = 'none';
			tempMenuToggle.innerHTML = 'Show ' + menusList[tempMenuNum] + ' Menu';
			displayToggleState[tempMenu] = false;
		}

		upgradeDiv.style.display = 'inline-block';
		displayToggle.innerHTML = 'Hide ' + menu + ' Menu';
		displayToggleState[menuNum] = true;
	} else if(displayToggleState[menuNum] == true) {
		upgradeDiv.style.display = 'none';
		displayToggle.innerHTML = 'Show ' + menu + ' Menu';
		displayToggleState[menuNum] = false;
	}
	console.log(menu + " menu state: " + displayToggleState[menuNum]);
	console.log(tempMenuNum);
}

function gameRestart() {
	var gameRestartConfirm = confirm('Are you sure you want to lose ALL your progress!');
	if(gameRestartConfirm == true) {
		location.reload(true);
	}
}

function credits() {
	window.open('credits.html');
}

function toggleSound() {
	if(soundSwitch == 0) {
		soundSwitch = 1;
	} else {
		soundSwitch = 0;
	}
	console.log(soundSwitch);
}

function createSettings() {
	var settingsArray = new Array();
		settingsArray[0] = '<button id="toggleSound" onclick="toggleSound()">Toggle Sound</button>';
					
	var settingsTable = '<table id="menuSettings"><tr><td>Settings</td></tr>';
								
	var settingsSize = settingsArray.length;
	for(var i=0.; i<settingsSize; i++) {
		settingsTable += '<tr><td>' + settingsArray[i] + '</td></tr>';
	}
	document.getElementById('settingsDiv').innerHTML = settingsTable;
}