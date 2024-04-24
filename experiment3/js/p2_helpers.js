// snow:  y = 13-15
// dungeons: y = 21-25
// chests: y = 29-31

function generateGrid(numCols, numRows) {
    let grid = []; // final grid
    let rooms = []; // room coordinates
    let count = 0; // represents "."
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        let x = floor(random(100));
        if (x == 0 && count < 7) {
          row.push(".");
          rooms.push([i, j]);
          count++;
        } else {
          row.push("_");
        }
      }
      grid.push(row);
    }
    generateRoom(grid, rooms, numCols, numRows, count);
    return grid;
  }
  
  function generateRoom(grid, rooms, cols, rows, count) {
    for (let x = 0; x < count-1; x+=2) {
      var [x1, y1] = rooms[x];
      var [x2, y2] = rooms[x+1];
      console.log(x1, x2);
      console.log(y1, y2);
      for (let i = x1; i < x2; i++) {
        for (let j = y1; j < y2; j++) {
          grid[i][j] = ".";
          // console.log(grid[i][j]);
          console.log("got here");
        }  
      }
    }
  }
  
  function gridCheck(grid, i, j, target) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
      return 0;
    }
  
    return grid[i][j] === target ? 1 : 0;
  }
  
  function gridCode(grid, i, j, target) {
    var northBit = gridCheck(grid, i - 1, j, target);
    var southBit = gridCheck(grid, i + 1, j, target);
    var eastBit = gridCheck(grid, i, j + 1, target);
    var westBit = gridCheck(grid, i, j - 1, target);
  
    var code = (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
    console.log(code);
    return code;
  }
  
  
  function drawContext(grid, i, j, target, dti, dtj) {
    var code = gridCode(grid, i, j, target);  
    const [tiOffset, tjOffset] = lookup[code];  
    placeTile(i, j, dti + tiOffset, dtj + tjOffset);
  }
  
  
  function drawGrid(grid) {
    background(128);
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (gridCheck(grid, i, j, "_")) {
          placeTile(i, j, floor(random(4)), 13);
        } else {
          drawContext(grid, i, j, ".", 5, 13);
        }
      }
    }
  }
  
  const lookup = [
    [0, 0],   
    [0, 1],   
    [0, -1],  
    [-1, 0],  
    [1, 0],   
    [1, 1],   
    [1, -1],  
    [-1, 1],  
    [-1, -1], 
    [0, 2],   
    [0, -2],  
    [-2, 0],  
    [2, 0],   
    [2, 1],   
    [2, -1],  
    [-2, 1],  
    [-2, -1], 
    [1, 2],   
    [1, -2],  
    [-1, 2],  
    [-1, -2], 
    [2, 2],   
    [2, -2],  
    [-2, 2],  
    [-2, -2]  
  ];
  
  
  