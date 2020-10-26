// Alex Yang
// Katherine Bennett - Creative Coding Section E
// October 23, 2020
// Project #1 - The Unexpected Machine: Performance Adjective

let COLOR_0, COLOR_1, COLOR_2, COLOR_3, COLOR_4; // Color Pallette Constants
let SKIN_0, SKIN_1, SKIN_2; // Skin Color Constants


let currentScene, // current scene object
  deathIndex, // current death (out of ~1500)
  prisoners, // set of prisoner data
  ended; // if the experience is over

function preload() {
  
  // Convert prisoner data in JSON to array
  let url = 'https://api.jsonbin.io/b/5f96ed99076e516c36fba594'; // “Execution Database.” Death Penalty Information Center, deathpenaltyinfo.org/executions/execution-database. 
  prisoners = loadJSON(url);
}

function setup() {
  createCanvas(800, 800);
  
  deathIndex = 0;
  signatureScore = 0;
  ended = false;
  
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
  if (!mouseIsPressed && currentScene.isFinished() && !ended) { // Advances if interaction is completed
    nextScene();
  }
}

function nextScene() { // Rotate between the three scenes
  
  if (ended) { } // Do nothing if ended
  else if (currentScene == null) { // Show signature scene in beginning
    currentScene = new PaperScene(prisoners[deathIndex].name);
    currentScene.display();
  }
  else if (currentScene.sceneNumber == 2) { // Advance the cycle if at last scene
    deathIndex ++;
    if (deathIndex == 1526) { // End if cycle is complete
      background(0);
      ended = true;
    }
    else {
      currentScene = new PaperScene(prisoners[deathIndex].name);
      currentScene.display();
    }
  }
  else if (currentScene.sceneNumber == 0) { // Show strapping-in scene
    currentScene = new StrapScene();
    currentScene.display();
  }
  else if (currentScene.sceneNumber == 1) { // Show injection scene
    currentScene = new DeathScene(prisoners[deathIndex].race);
    currentScene.display();
  }
    
}

function drawMessage() { // Draw introductory messages at certain points
  
  noStroke();
  textSize(16);
  textFont('Georgia');
  
  let message = '';
  
  switch (deathIndex) {
    
    case 1:
    message = 'The United States has executed 1524 defendants since 1976.';
    break;
    case 2:
    message = 'You are the wardens.';
    break;
    
  }
  
  text(message, (width - textWidth(message)) / 2, 50);
}



function mouseDragged() { // Pass mouse drags to the current scene
  if (!ended) {
    currentScene.drag(pmouseX, pmouseY, createVector(mouseX-pmouseX, mouseY-pmouseY));
  }
}


class PaperScene { // Scene 1: Sign the paper
  
  constructor(name) {
    this.prisonerName = name; // Name of defendant
    this.signatureScore = 0; // progress with signature
    this.sceneNumber = 0; // identity of scene in sequence
  }
  
  display() { 
    background(COLOR_0);
    
    fill(255); // Paper
    noStroke();
    rect(200, 100, 400, 600);

    stroke(0); // Text lines
    line(275, 190, 575, 190);
    for (let y = 210; y < 550; y += 20) {
      line(225, y, 575, y);
    }
    line(225, 550, 500, 550);

    noStroke(); // Prisoner name and backing
    textSize(12);
    textFont('Georgia');
    fill(255);
    rect(277, 220, textWidth(this.prisonerName) + 8, 16);

    fill(0);
    text(this.prisonerName, 280, 230);

    textSize(24); // Title
    text('Order of Execution', 224, 150);

    stroke(0); // Signature line
    line(400, 650, 575, 650);

    noStroke(); // Instruction
    textSize(10);
    textFont('Arial');
    text('Signature of Warden', 400, 662);
    
    drawMessage(); // Draw any introductory messages
  }

  drag(pX, pY, v) {
    if (pX+v.x >= 370 && pX+v.x <= 580 && pY+v.y >= 600 && pY+v.y <= 660 && pX >= 370 && 
        pX <= 580 && pY >= 600 && pY <= 660) { // If around signature box
      
      stroke(0); // draw line based on mouse vector
      line(pX, pY, pX+v.x, pY+v.y);
      this.signatureScore ++;
      
      if (this.signatureScore >= 50) { // If complete, record time
        this.signatureTime =  millis();
      }
    }
  }
  
  isFinished() {  // If 1 second since interaction complete, signal that scene is done
    return millis() - 1000 >= this.signatureTime;
  }
  
}



class StrapScene {
  
  constructor() {
    this.sceneNumber = 1; // identity of scene in sequence
    this.tightness = 0;
  }
  
  display() {
    
    background(COLOR_0);
    
    noStroke(); // Table and Subject
    fill(COLOR_1);
    rect(130, 0, width - 260, 800);
    fill(COLOR_2);
    rect(150, 0, width - 300, 800);
    
    this.drawBelt( int(this.tightness / 150) );
  }
  
  drawBelt(stage) {
    
    switch (stage) {
      
      case 0: // Most loose strap
      
      stroke(0); // Right strap
      noFill();
      push();
      for(let y = 0; y < 150; y++){
        bezier( 420+50, 400-50, 500+50, 400-50,  670, 400, 670, 500);
        translate(0, .5);
      }
      pop();
      
      fill('#585563'); // Buckle
      noStroke();
      push();
        translate(50, -50);
        quad(410, 395, 430, 395, 430, 480, 410, 480);
        quad(430, 395, 430, 415, 430-80, 395-40, 430-80, 415-40);
        quad(410, 480-40, 410, 470-40, 410-80, 470-40-40, 410-80, 480-40-40);  
      pop();
      
      stroke(0); // Left strap
      noFill();
      push();
      for(let y = 0; y < 150; y++) {
        bezier( 400, 340, 340, 400,  130, 400, 130, 500);
        bezier( 400, 340, 460, 280,  500-50, 280-50, 600-50, 280-50);
        translate(0, .5);
      }
      pop();
      
      fill('#585563'); // Buckle
      noStroke();
      push();
        translate(50, -50);
        quad(410-80, 395-40, 430-80, 395-40, 430-80, 480-40, 410-80, 480-40);   
        quad(410, 480, 410, 460, 410-80, 460-40, 410-80, 480-40);   
      pop();
      
      break;
      
      
      case 1: // Less loose strap
      
      stroke(0);
      noFill();
      push();
      for(let y = 0; y < 150; y++){
        bezier( 420+25, 400-25, 500+25, 400-25,  670, 400, 670, 500);
        translate(0, .5);
      }
      pop();
      
      fill('#585563');
      noStroke();
      push();
        translate(25, -25);
        quad(410, 395, 430, 395, 430, 480, 410, 480);
        quad(430, 395, 430, 415, 430-80, 395-40, 430-80, 415-40);
        quad(410, 480-40, 410, 470-40, 410-80, 470-40-40, 410-80, 480-40-40);  
      pop();
      
      stroke(0);
      noFill();
      push();
      for(let y = 0; y < 150; y++) {
        bezier( 400, 340, 340, 400,  130, 400, 130, 500);
        bezier( 400, 340, 460, 280,  500-25, 280-25, 600-25, 280-25);
        translate(0, .5);
      }
      pop();
      
      fill('#585563');
      noStroke();
      push();
        translate(25, -25);
        quad(410-80, 395-40, 430-80, 395-40, 430-80, 480-40, 410-80, 480-40);   
        quad(410, 480, 410, 460, 410-80, 460-40, 410-80, 480-40);   
      pop();
      
      break;
      
      
      case 2: // Least loose strap
      
      stroke(0);
      noFill();
      push();
        for(let y = 0; y < 150; y++){
          bezier( 420, 400, 500, 400,  670, 400, 670, 500);
          translate(0, .5);
        }
      pop();
      
      fill('#585563');
      noStroke();
      quad(410, 395, 430, 395, 430, 480, 410, 480);
      quad(430, 395, 430, 415, 430-80, 395-40, 430-80, 415-40);
      quad(410, 480-40, 410, 470-40, 410-80, 470-40-40, 410-80, 480-40-40);  
      
      stroke(0);
      noFill();
      push();
        for(let y = 0; y < 150; y++) {
          bezier( 400, 340, 340, 400,  130, 400, 130, 500);
          bezier( 400, 340, 460, 280,  500, 280, 600, 280);
          translate(0, .5);
        }
      pop();
      
      fill('#585563');
      noStroke();
      quad(410-80, 395-40, 430-80, 395-40, 430-80, 480-40, 410-80, 480-40);   
      quad(410, 480, 410, 460, 410-80, 460-40, 410-80, 480-40);   
      
      
      break;
    }
  }
  
  drag(pX, pY, v) { // Tighten strap if mouse vector is rightward
    if (v.x > 0 && int(this.tightness / 150) < 2) {
      if (int(this.tightness / 150) < int((v.x + this.tightness) / 150) ) {
        this.tightness += v.x;
        this.display(); // Only draw if stage is changing
      }
      else {
        this.tightness += v.x;
      }
      
      
    }
    if (int(this.tightness / 150) == 2) { // Start timer if completely tightened
      this.tightenedTime = millis();
    }
  }
  
  isFinished() { // If 1 second since interaction complete, signal that scene is done
    return millis() - 1000 >= this.tightenedTime;
  }
}



class DeathScene {
  
  constructor(skin) {
    
    if (skin === "White") { // Color skin loosely based on data
      this.skinColor = SKIN_2;
    }
    else if (skin === "Black") {
      this.skinColor = SKIN_0;
    }
    else {
      this.skinColor = SKIN_1;
    }
    
    this.pushedAmount = 0; // injection progress in pixels
    this.sceneNumber = 2; // identity of scene in sequence
    
  }
  
  display() {
    
    background(COLOR_0);
    
    noStroke();
    fill(this.skinColor); // Body
    rect(0, height * 2.0/3.0, width, height);
    
    push();
    rotate(radians(40)); // Tilt Syringe
    
    fill(167, 165, 164, 130);
    rect(550, -60, 60, 200); // Syringe bottle
    rect(560, 140, 40, 10); 
    rect(560, 140, 40, 10);
    
    rect(555, -50 + this.pushedAmount, 50, 10); // Syringe handle
    rect(550, -255 + this.pushedAmount, 60, 10);
    rect(550, -255 + this.pushedAmount, 60, 10);
    rect(575, -245 + this.pushedAmount, 10, 195);
    
    fill(167, 165, 164, 255); // Needle
    rect(579, 145, 2, 100);
    triangle(579, 245, 581, 245, 580, 300);
    fill(this.skinColor);
    rect(579, 270, 2, 100);
    
    fill(COLOR_3); // Liquid to inject
    rect(555, -40 + this.pushedAmount, 50, 175 - this.pushedAmount);
    
    pop();
  }
  
  drag(pX, pY, v) { // Move handle and liquid down if mouse vector is down-leftward
    if (this.pushedAmount < 175 &&  abs(pX-(height-pY)) < 100 && v.x < 0 && v.y > 0) {
      this.pushedAmount += 1;
      this.display();
      
      if (this.pushedAmount > 170) { // Start timer if fully injected
        this.deathTime = millis();
      }
    }
  }
  
  isFinished() { // If 1 second since interaction complete, signal that scene is done
    return millis() - 1000 >= this.deathTime;
  }
  
}

