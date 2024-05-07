/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Uni", 
        assetUrl: "https://pbs.twimg.com/media/GM5ek26asAAqr_O?format=jpg&name=large",
        credit: "unicouni3 @twitter"
      },
      {
        name: "Uni Punch", 
        assetUrl: "https://pbs.twimg.com/media/GM5ek27awAAsXbm?format=jpg&name=large",
        credit: "unicouni3 @twitter"
      },
      {
        name: "Not Like Us", 
        assetUrl: "https://upload.wikimedia.org/wikipedia/en/6/61/Kendrick_Lamar_-_Not_Like_Us.png",
        credit: "Kendrick Lamar, Not Like Us"
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
        
        for(let i = 0; i < 200; i++) {
            design.fg.push({x: random(width),
                            y: random(height),
                            w: random(width/2),
                            h: random(height/2),
                            fill: random(255)})
        }
    return design;
}
  
function renderDesign(design, inspiration) {
    background(design.bg);
    noStroke();
    for(let box of design.fg) {
        fill(box.fill, 128);
        rect(box.x, box.y, box.w, box.h);
    }
}

function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
        box.fill = mut(box.fill, 0, 255, rate);
        box.x = mut(box.x, 0, width, rate);
        box.y = mut(box.y, 0, height, rate);
        box.w = mut(box.w, 0, width/2, rate);
        box.h = mut(box.h, 0, height/2, rate);
    }
}

function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}   
