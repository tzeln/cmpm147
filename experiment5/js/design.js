/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Summer Evening", 
        assetUrl: "https://pbs.twimg.com/media/E5cVFrcVEAYYno2?format=jpg&name=large",
        credit: "tomosaki @twitter"
      },
      {
        name: "Summer Evening (2)",
        assetUrl: "https://pbs.twimg.com/media/E5cVFrcVUAQooUu?format=jpg&name=large",
        credit: "tomosaki @twitter"
      },
      {
        name: "Uni Punch", 
        assetUrl: "https://pbs.twimg.com/media/GM5ek27awAAsXbm?format=jpg&name=large",
        credit: "unicouni3 @twitter"
      },
      {
        name: "Jellyfish", 
        assetUrl: "https://images.unsplash.com/photo-1529178983631-23b852df9092?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        credit: "George Kedenburg III, 2018"
      },
      {
        name: "Sutro Baths", 
        assetUrl: "https://images.unsplash.com/photo-1539645447673-28e85a1c3532?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        credit: "George Kedenburg III, 2018"
      },
    ];
  }
  
function initDesign(inspiration) {
    // canvas image sourced from Wes
    let canvasContainer = $('.image-container'); 
    let canvasWidth = canvasContainer.width() / 2; 
    let aspectRatio = inspiration.image.height / inspiration.image.width;
    let canvasHeight = canvasWidth * aspectRatio; 
    resizeCanvas(canvasWidth/4, canvasHeight/4);
    $(".caption").text(inspiration.credit); 

    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);

    let design = {
        bg: 128,
        fg: []
    }
    
    let width_increment = width/50;
    let height_increment = height/50;
    for (let i = 3; i < 50; i++) {
        for (let j = 3; j < 50; j++) {
            let x = random((i-3) * width_increment, i * width_increment);
            let y = random((j-3) * height_increment, i * height_increment);
            let w = random(width/4);            
            let h = random(height/4);   

            let xBound = (x+w)/2;
            let yBound = (y+h)/2;
            if (xBound > width) {
              xBound = x;
            }  
            if (yBound > height) {
              yBound = y;
            }
            let fill = inspiration.image.get(xBound, yBound);
            let r = fill[0];
            let g = fill[1];
            let b = fill[2];

            design.fg.push({x, y, w, h, r, g, b});
        }
    }
    return design;
}

  
function renderDesign(design, inspiration) {
    background(design.bg);
    noStroke();
    for(let box of design.fg) {
        colorMode(RGB);
        fill(box.r, box.g, box.b, 150);
        rect(box.x, box.y, box.w, box.h);
    }
}

function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
        // let reference = findColor(inspiration, box.x, box.y, box.w, box.h);
        box.r = colorMut(box.r, 0, 200, rate);
        box.g = colorMut(box.g, 0, 200, rate);
        box.b = colorMut(box.b, 0, 200, rate);
        box.x = mut(box.x, 0, width, rate);
        box.y = mut(box.y, 0, height, rate);
        box.w = mut(box.w, 0, width/3, rate);
        box.h = mut(box.h, 0, height/3, rate);
    }
}

// function findColor(inspiration, x, y, w, h) {
//   let runningAverage = [0, 0, 0]; 
//   for (let i = x; i < w; i+=10) {
//     for (let j = y; j < h; j+=10) {
//       let reference = inspiration.image.get(box.i, box.j);
//       runningAverage[0] += reference[0];
//       runningAverage[1] += reference[1];
//       runningAverage[2] += reference[2];
//     } 
//   }
//   let loops = (w-x)/10;
//   runningAverage[0] /= loops;
//   runningAverage[1] /= loops;
//   runningAverage[2] /= loops;
// }

function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}   

function colorMut(num, min, max, rate) {
    // smaller std dev
    return constrain(randomGaussian(num, (rate * (max - min)) / 20), min, max);
}
