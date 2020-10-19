// Alex Yang
// Katherine Bennett - Creative Coding Section E
// October 23, 2020
// Project #1 - The Unexpected Machine: Performance Adjective

let COLOR_0, COLOR_1, COLOR_2, COLOR_3, COLOR_4; // Color Pallette Constants
let SKIN_0, SKIN_1, SKIN_2; // Skin Color Constants


let sceneNumber, // current scene (out of 3)
  deathIndex, // current death (out of ~1500)
  prisoners; // array of prisoner data

function preload() {
  
  // Convert prisoner data in JSON to array
  let url = './deaths.json'; // “Execution Database.” Death Penalty Information Center, deathpenaltyinfo.org/executions/execution-database. 
  prisoners = loadJSON(url);
}

function setup() {
  createCanvas(800, 800);
  
  scene = 0;
  deathIndex = 0;
  
  COLOR_0 = color('#F6F5E4');
  COLOR_1 = color('#EED7C9');
  COLOR_2 = color('#D17E85');
  COLOR_3 = color('#722C4B');
  COLOR_4 = color('#000000');
  
  SKIN_0 = color('#8D5524');
  SKIN_1 = color('#C68642');
  SKIN_2 = color('#FFDBAC');
   
  background(COLOR_0);
  drawPaper();
}

function draw() { }

function changeScene() { // Rotate between the three scenes
  
}


function drawPaper() { // Scene 1: Sign the paper
  
  fill(color(255));
  noStroke();
  rect(200, 100, 400, 600);
  
  console.log(prisoners[deathIndex].name);
}


