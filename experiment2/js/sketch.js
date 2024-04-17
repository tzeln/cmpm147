function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}


function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  createButton("reimagine").mousePressed(() => seed++);
}

let seed = 239;

const skyAmbience1 = "#E8F4FF";
const skyAmbience2 = "#BEDBF9";
const hills1 = "#89B0D9";
const hills2 = "#7DA3CF";
const hills3 = "#57606F";
const hills4 = "#3E526B";
const canyon1 = "#AA676D";
const canyon2 = "#4C3841";
const treeColor = "#5F6E77"

function draw() {
  randomSeed(seed);
  background(100);
  noStroke();
  
  fill(skyAmbience1);
  rect(0, 0, width, height);

  fill(skyAmbience2);
  const scrub = mouseX/width;
  let z = random();
  let x = width * ((random() + (scrub + millis() / 500000.0) / z) % 1);
  let y = height + z;
  beginShape();
  curveVertex(-1000, y);
  curveVertex(0, y * 0.2);
  curveVertex(x , y * 0.4);
  curveVertex(x+2000, y * 0.3);
  endShape(CLOSE);

  // from background to foreground; colors meant to match ambient perspective
  fill(hills1);
  beginShape();
  curveVertex(-700, height);
  curveVertex(-700, height);
  curveVertex(width * 0.1, height * 0.3);
  curveVertex(width * 0.4, height * 0.4);
  curveVertex(width * 0.7, height * 0.8);
  curveVertex(width, height);
  endShape(CLOSE);
  
  fill(hills2);
  beginShape();
  curveVertex(width/3, height);
  curveVertex(width/3, height);
  curveVertex(width * 0.5, height * 0.6);
  curveVertex(width * 0.7, height * 0.4);
  curveVertex(width * 0.9, height * 0.3);
  curveVertex(width+700, height);
  endShape(CLOSE);

  fill(hills3);
  beginShape();
  curveVertex(-700, height);
  curveVertex(-700, height);
  curveVertex(width * 0.2, height * 0.8);
  curveVertex(width * 0.4, height * 0.9);
  curveVertex(width/2, height+100);
  endShape(CLOSE);
 
  fill(hills4);
  beginShape();
  curveVertex(width * 0.6, height);
  curveVertex(width * 0.6, height);
  curveVertex(width * 0.8, height * 0.8);
  curveVertex(width+700, height);
  endShape(CLOSE);

  fill(canyon1);
  beginShape();
  vertex(0, height);
  vertex(0, height * 0.45);
  vertex(0, height * 0.5);
  vertex(width * 0.1, height * 0.45);
  curveVertex(width * 0.4, height * 0.45);
  curveVertex(width * 0.45, height * 0.7);
  curveVertex(width * 0.7, height+100);
  endShape(CLOSE);

  // fill(canyon2);

  beginShape();
  vertex(0, height * 0.7);
  const steps = 100;
  for (let i = 0; i < steps + 1; i++) {
    let x = ((width * i) / steps) % (width * 0.4);
    let y =
      height * 0.6 - (random() * random() * random() * height) / 3 - height / 40;
    vertex(x, y);
  }
  vertex(width * 0.4, height * 0.5);
  endShape(CLOSE);

  fill(treeColor);
  // const trees = 20*random();
  // const scrub = mouseX/width;
  // for (let i = 0; i < trees; i++) {
  //   let z = random();
  //   let x = width * ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
  //   let s = width / 50 / z;
  //   let y = height / 2 + height / 20 / z;
  //   triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  // }
}

