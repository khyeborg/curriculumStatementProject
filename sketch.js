let spritesheet;
let downMe = [], leftMe = [], rightMe = [], upMe = [];
let allMe = [downMe, leftMe, rightMe, upMe];
let myCurrentArray = downMe;
let myCurrentCounter = 0;
let myXPos = 400, myYPos = 400;
let myXSpeed = 2, myYSpeed = 2;
let mySize = 100;
let mySizeChange = 0.6;
let counterRate = 0.18;
let addCounter = false;
let movedHorizontal = false, movedVertical = false;

let moveUpArray = [];

let map;



function preload() {
	spritesheet = loadImage("images/spritesheet.png");
	map = loadImage("images/map.jpg");
}

function setup() {
	createCanvas(800, 500);
	imageMode(CENTER);

	processSpritesheet();

	//frameRate(40);
}

function draw() {
	image(map, width / 2, height / 2);
	image(myCurrentArray[Math.floor(myCurrentCounter)], myXPos, myYPos, mySize, mySize);

	detectArrowKeys();

	// console.log(myXPos, myYPos);
}

function processSpritesheet() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			allMe[i].push(spritesheet.get(j * 64, i * 64, 64, 64));
		}
	}
}

function detectArrowKeys() {
	movedHorizontal = false;
	movedVertical = false;
	addCounter = false;

	// top part
	if (myYPos < 375) {
		if (myXPos >= 378 && myXPos <= 430) {
			movement();

			if (myXPos < 378) {
				myXPos = 378;
			}

			if (myXPos > 430) {
				myXPos = 430;
			}

			if (myYPos < 310) {
				myYPos = 310;

				if (mySize < 43) {
					mySize = 43;
				}
			}

			if (keyIsDown(UP_ARROW)) {
				mySize -= mySizeChange;
				myYSpeed -= 0.07;
				myXSpeed -= 0.013;

				if (myYSpeed < 0.5) {
					myYSpeed = 0.5;
				}

				if (myXSpeed < 0.8) {
					myXSpeed = 0.8;
				}

				if (mySize > 43) {
					moveUpArray.push(mySize, myYSpeed, myXSpeed);
				}
			}

			if (keyIsDown(DOWN_ARROW)) {
				if (moveUpArray.length > 0) {
					myXSpeed = moveUpArray[moveUpArray.length - 1];
					moveUpArray.pop();
					myYSpeed = moveUpArray[moveUpArray.length - 1];
					moveUpArray.pop();
					mySize = moveUpArray[moveUpArray.length - 1];
					moveUpArray.pop();
				}

				else {
					mySize = 100;
					myYSpeed = 2;
					myXSpeed = 2;
				}
			}
		}

		else {
			movement();

			if (myYPos < 375) {
				myYPos = 375;
			}
		}
	}

	// bottom part
	else {
		movement();

		if (myYPos > 438) {
			myYPos = 438;
		}
	}

	if (addCounter == true) {
		myCurrentCounter += counterRate;
	}

	else {
		myCurrentCounter = 0;
	}

	// reset myCurrentCounter
	if (myCurrentCounter >= 4) {
		myCurrentCounter = 0;
	}
}

function movement() {
	if (keyIsDown(DOWN_ARROW) && movedVertical == false) {
		myCurrentArray = downMe;
		myYPos += myYSpeed;
		addCounter = true;
		movedVertical = true;
	}

	else if (keyIsDown(UP_ARROW) && movedVertical == false) {
		myCurrentArray = upMe;
		myYPos -= myYSpeed;
		addCounter = true;
		movedVertical = true;
	}

	if (keyIsDown(LEFT_ARROW) && movedHorizontal == false) {
		myCurrentArray = leftMe;
		myXPos -= myXSpeed;
		addCounter = true;
		movedHorizontal = true;
	}

	else if (keyIsDown(RIGHT_ARROW) && movedHorizontal == false) {
		myCurrentArray = rightMe;
		myXPos += myXSpeed;
		addCounter = true;
		movedHorizontal = true;
	}
}

