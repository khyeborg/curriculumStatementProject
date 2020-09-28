let spritesheet;
let downMe = [], leftMe = [], rightMe = [], upMe = [];
let allMe = [downMe, leftMe, rightMe, upMe];
let myCurrentArray = downMe;
let myCurrentCounter = 0;
let myXPos = 480, myYPos = 400;
let myXSpeed = 2, myYSpeed = 2;
let mySize = 100;
let mySizeChange = 0.6;
let counterRate = 0.18;
let addCounter = false;
let movedHorizontal = false, movedVertical = false;

let moveUpArray = [];
let map;

let mainRoom = true, referencesRoomBoolean = false;
let stateObject;

let aboutMeImage, criticalPedagogyImage, antiRacismImage, referencesImage, starfieldImage, booksImage, backImage;

let goBackRectX = 785, goBackRectY = 70, goBackRectWidth = 160, goBackRectHeight = 60;
let goBackAlpha = 255;

let referencesRectX = 140, referencesRectY = 45, referencesRectWidth = 250, referencesRectHeight = 60;
let referencesAlpha = 255;

let starfieldX, starfieldY1, starfieldY2, starfieldY3;
let starfieldMoveRate = 2;

function preload() {
	spritesheet = loadImage("images/spritesheet.png");
	map = loadImage("images/map.jpg");
	aboutMeImage = loadImage("images/about_me.png");
	criticalPedagogyImage = loadImage("images/critical_pedagogy.png");
	antiRacismImage = loadImage("images/anti_racism.png");
	referencesImage = loadImage("images/references.png");
	starfieldImage = loadImage("images/starfield.png");
	booksImage = loadImage("images/books.png");
	backImage = loadImage("images/back.png");
}

function setup() {
	createCanvas(960, 500);
	imageMode(CENTER);
	rectMode(CENTER);
	noStroke();

	processSpritesheet();

	// scrolling background
	starfieldX = width / 2;
	starfieldY1 = -250;
	starfieldY2 = 250;

	//frameRate(40);
}

function draw() {
	// mainRoom stuff
	if (mainRoom == true) {
		image(map, width / 2, height / 2);
		image(myCurrentArray[Math.floor(myCurrentCounter)], myXPos, myYPos, mySize, mySize);

		detectArrowKeys();
		references();

		// myXPos = -1;

		if (myXPos <= 15) {
			mainRoom = false;
			roomObject = new Room("critical", rightMe, 60, 400);
		}

		if (myXPos > width - 15) {
			mainRoom = false;
			roomObject = new Room("antiRacism", leftMe, width - 60, 400);
		}
	}

	// other room stuff
	if (mainRoom == false && referencesRoomBoolean == false) {
		if (roomObject.room == "critical") {
			criticalPedagogyRoom();
		}

		else if (roomObject.room == "antiRacism") {
			antiRacismRoom();
		}

		else if (roomObject.room == "aboutMe") {
			aboutMeRoom();
		}
	}

	if (referencesRoomBoolean == true) {
		referencesRoom();
	}
}

function mouseClicked() {
	if (mainRoom == true) {
		if (mouseX > referencesRectX - referencesRectWidth / 2 && mouseX < referencesRectX + referencesRectWidth / 2 && mouseY > referencesRectY - referencesRectHeight / 2 && mouseY < referencesRectY + referencesRectHeight / 2) {
			mainRoom = false;
			referencesRoomBoolean = true;
		}
	}

	else if (mainRoom == false) {
		if (referencesRoomBoolean == true) {
			if (mouseX > goBackRectX - goBackRectWidth / 2 && mouseX < goBackRectX + goBackRectWidth / 2 && mouseY > goBackRectY - goBackRectHeight / 2 && mouseY < goBackRectY + goBackRectHeight / 2) {
				mainRoom = true;
				referencesRoomBoolean = false;
			}
		}

		else if (referencesRoomBoolean == false) {
			if (mouseX > goBackRectX - goBackRectWidth / 2 && mouseX < goBackRectX + goBackRectWidth / 2 && mouseY > goBackRectY - goBackRectHeight / 2 && mouseY < goBackRectY + goBackRectHeight / 2) {
				mainRoom = true;
				myCurrentArray = roomObject.afterSpriteArray;
				myXPos = roomObject.afterXPos;
				myYPos = roomObject.afterYPos;
			}
		}
	}
}

class Room {
	constructor(room, afterSpriteArray, afterXPos, afterYPos) {
		this.room = room;
		this.afterSpriteArray = afterSpriteArray;
		this.afterXPos = afterXPos;
		this.afterYPos = afterYPos;
	}
}

function criticalPedagogyRoom() {
	starfield();
	image(criticalPedagogyImage, width / 2, height / 2, 800, 448);
	goBack();
}

function antiRacismRoom() {
	starfield();
	image(antiRacismImage, width / 2, height / 2, 800, 448);
	goBack();
}

function aboutMeRoom() {
	starfield();
	image(aboutMeImage, width / 2, height / 2, 800, 448);
	goBack();
}

function referencesRoom() {
	starfield();
	image(referencesImage, width / 2, height / 2, 800, 448);
	goBack();
}

function goBack() {
	if (mouseX > goBackRectX - goBackRectWidth / 2 && mouseX < goBackRectX + goBackRectWidth / 2 && mouseY > goBackRectY - goBackRectHeight / 2 && mouseY < goBackRectY + goBackRectHeight / 2) {
		goBackAlpha = 100;
	} 

	else {
		goBackAlpha = 255;
	}

	fill(11, 72, 107, goBackAlpha);
	rect(goBackRectX, goBackRectY, goBackRectWidth, goBackRectHeight, 10);
	textSize(25);
	fill(255, goBackAlpha);
	text("BACK", 770, 80);

	if (mouseX > goBackRectX - goBackRectWidth / 2 && mouseX < goBackRectX + goBackRectWidth / 2 && mouseY > goBackRectY - goBackRectHeight / 2 && mouseY < goBackRectY + goBackRectHeight / 2) {
		tint(11, 72, 107, goBackAlpha - 80);
		image(backImage, 738, 70, 50, 50);
		noTint();
	} 

	else {
		image(backImage, 738, 70, 50, 50);
	}
}

function references() {
	if (mouseX > referencesRectX - referencesRectWidth / 2 && mouseX < referencesRectX + referencesRectWidth / 2 && mouseY > referencesRectY - referencesRectHeight / 2 && mouseY < referencesRectY + referencesRectHeight / 2) {
		referencesAlpha = 100;
	} 

	else {
		referencesAlpha = 255;
		image(booksImage, 50, 45, 65, 65);
	}

	fill(43, 99, 99, referencesAlpha);
	rect(referencesRectX, referencesRectY, referencesRectWidth, referencesRectHeight, 10);
	textSize(25);
	fill(255, referencesAlpha);
	text("REFERENCES", 82, 55);

	if (mouseX > referencesRectX - referencesRectWidth / 2 && mouseX < referencesRectX + referencesRectWidth / 2 && mouseY > referencesRectY - referencesRectHeight / 2 && mouseY < referencesRectY + referencesRectHeight / 2) {
		tint(43, 99, 99, referencesAlpha - 20);
		image(booksImage, 50, 45, 65, 65);
		noTint();
	} 

	else {
		image(booksImage, 50, 45, 65, 65);
	}
}

function starfield() {
	image(starfieldImage, starfieldX, starfieldY1);
	image(starfieldImage, starfieldX, starfieldY2);

	starfieldY1 += starfieldMoveRate;
	starfieldY2 += starfieldMoveRate;

	if (starfieldY1 >= 750) {
		starfieldY1 = -250;
	}

	if (starfieldY2 >= 750) {
		starfieldY2 = -250;
	}
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
		if (myXPos >= 458 && myXPos <= 510) {
			movement();

			if (myXPos < 458) {
				myXPos = 458;
			}

			if (myXPos > 510) {
				myXPos = 510;
			}

			if (myYPos < 310) {
				myYPos = 310;

				if (mySize < 43) {
					mySize = 43;
				}

				// reached aboutMeRoom
				mainRoom = false;
				roomObject = new Room("aboutMe", downMe, width / 2, myYPos);
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

