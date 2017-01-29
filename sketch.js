var grid = [];
var w = 20;
var rows, cols;

var current;

var stack = [];

function setup(){
  createCanvas(400, 400);
  rows = floor(height/w);
  cols = floor(width/w);
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  //frameRate(5);
}



function draw(){
  background(51);

  for(var i = 0; i < grid.length; i++){
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  //step 1
  var next = current.checkNeighbours();
  if(next){
    stack.push(current);
    next.visited = true;

    //step 3
    removeWalls(current, next);

    //step 4
    current = next;
  }else if(stack.length > 0){
    var n = stack.pop();
    current = n;
  }

}

function removeWalls(a, b){
  var x = a.i - b.i;
  if(x === 1){
    a.walls[3] = false;
    b.walls[1] = false;
  }else if(x === -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  y = a.j - b.j;
  if(y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }else if(y === -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}
