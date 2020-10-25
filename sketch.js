// Alex Yang
// Katherine Bennett - Creative Coding Section E
// October 23, 2020
// Project #1 - The Unexpected Machine: Performance Adjective

let COLOR_0, COLOR_1, COLOR_2, COLOR_3, COLOR_4; // Color Pallette Constants
let SKIN_0, SKIN_1, SKIN_2; // Skin Color Constants


let currentScene, // current scene object
  deathIndex, // current death (out of ~1500)
  prisoners; // array of prisoner data


function preload() {
  
  // Convert prisoner data in JSON to array
  let url = './deaths.json'; // “Execution Database.” Death Penalty Information Center, deathpenaltyinfo.org/executions/execution-database. 
  prisoners = loadJSON(url);
}

function setup() {
  createCanvas(800, 800);
  
  deathIndex = 0;
  signatureScore = 0;
  
  COLOR_0 = color('#F6F5E4');
  COLOR_1 = color('#EED7C9');
  COLOR_2 = color('#D17E85');
  COLOR_3 = color('#722C4B');
  COLOR_4 = color('#000000');
  
  SKIN_0 = color('#8D5524');
  SKIN_1 = color('#C68642');
  SKIN_2 = color('#FFDBAC');
   
  background(COLOR_0);
  nextScene();
}

function draw() { 
  if (!mouseIsPressed && currentScene.isFinished()) {
    nextScene();
  }
}

function nextScene() { // Rotate between the three scenes
  
  if (currentScene == null) {
    currentScene = new PaperScene(prisoners[deathIndex].name);
    currentScene.display();
  }
  else if (currentScene.sceneNumber == 2) {
    deathIndex ++;
    currentScene = new PaperScene(prisoners[deathIndex].name);
  }
  else if (currentScene.sceneNumber == 0) {
    background(COLOR_0);
  }
  
}



function mouseDragged() {
  
  if (currentScene.sceneNumber == 0) {
    currentScene.sign(pmouseX, pmouseY, mouseX, mouseY);
  }
  
}


class PaperScene { // Scene 1: Sign the paper
  
  constructor(name) {
    this.prisonerName = name;
    this.signatureScore = 0;
    this.sceneNumber = 0;
  }
  
  display() { 

    fill(255);
    noStroke();
    rect(200, 100, 400, 600);

    stroke(0);
    line(275, 190, 575, 190);
    for (let y = 210; y < 550; y += 20) {
      line(225, y, 575, y);
    }
    line(225, 550, 500, 550);

    noStroke();
    textSize(12);
    textFont('Georgia');

    let nameWidth = textWidth(this.prisonerName);

    fill(255);
    rect(277, 220, nameWidth + 8, 16);

    fill(0);
    text(this.prisonerName, 280, 230);

    textSize(24);
    text('Order of Execution', 224, 150);

    stroke(0);
    line(400, 650, 575, 650);

    noStroke();
    textSize(10);
    textFont('Arial');
    text('Signature of Warden', 400, 662);

  }

  sign(pX, pY, x, y) {
    if (x >= 370 && x <= 580 && y >= 600 && y <= 6600 && pX >= 370 && 
        pX <= 580 && pY >= 600 && pY <= 660) {
      
      stroke(0);
      line(pX, pY, x, y);
      this.signatureScore ++;
      
      if (this.signatureScore >= 50) {
        this.signatureTime =  millis();
      }
    }
  }
  
  isFinished() {
    return millis() - 1000 >= this.signatureTime;
  }
  
}


