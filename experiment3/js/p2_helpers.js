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
        let x = floor(random(80));
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
    generateRoom(grid, rooms, count);
    return grid;
  }
  
  function generateRoom(grid, rooms, count) {
    console.log(rooms);
    // generates one big room first
    for (let x = 0; x < count-1; x++) {
        var [x1, y1] = rooms[x];
        var [x2, y2] = rooms[x+1];
        if (x1 == x2) {
            for (let j = y1; j < y2; j++) {
                grid[x1][j] = ".";
                let chest = floor(random(30));
                if (chest == 0) {
                    grid[x1][j] = "1";
                }
            }
        } else if (y1 == y2) {
            for (let i = x1; i < x2; i++) {
                grid[i][y1] = ".";
                let chest = floor(random(30));
                if (chest == 0) {
                    grid[i][y1] = "1";
                }
            } 
        } else {
            for (let i = x1; i < x2; i++) {
                for (let j = y1; j < y2; j++) {
                    grid[i][j] = ".";
                    let chest = floor(random(70));
                    if (chest == 0) {
                        grid[i][j] = "1";
                    }
                }  
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
    return code;
  }
  
  
  function drawContext(grid, i, j, target, dti, dtj) {
    var code = gridCode(grid, i, j, target);  
    var [tiOffset, tjOffset] = lookup[code]; 
    if (code == 15) {
        tiOffset += floor(random(3));
    }
    placeTile(i, j, dti + tiOffset, dtj + tjOffset);
  }
  
  
  function drawGrid(grid) {
    // background("fff1e8");
    background(128);
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (gridCheck(grid, i, j, "_")) {
            placeTile(i, j, floor(random(4)), 3);
        } else if (gridCheck(grid, i, j, "1")) {
            placeTile(i, j, floor(random(6)), 28);
        } else {
            drawContext(grid, i, j, ".", 0, 0);
        }
      }
    }
  }
  
  const lookup = [
    [2, 23],    // 0:  0000
    [2, 23],    // 1:  0001 (N)
    [2, 23],    // 2:  0010 (S)
    [2, 23],    // 3:  0011 (SN)
    [2, 23],    // 4:  0100 (E)
    [2, 23],    // 5:  0101 (EN)
    [2, 23],    // 6:  0110 (ES)
    [2, 23],    // 7:  0111 (ESN)
    [2, 23],    // 8:  1000 (W)
    [2, 23],    // 9:  1001 (WN)
    [2, 23],    // 10: 1010 (WS)
    [2, 23],    // 11: 1011 (WSN)
    [2, 23],    // 12: 1100 (WE)
    [2, 23],    // 13: 1101 (WEN)
    [2, 23],    // 14: 1110 (WES)
    [1, 15],    // 15: 1111 (WESN)
  ];
  
  
  