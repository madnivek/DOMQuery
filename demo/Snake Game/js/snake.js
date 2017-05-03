class Snake {
  constructor(board){
    this.board = board;
    this.length = 1;
    this.direction = "N";
    this.headPos = [Math.floor(this.board.size/2), Math.floor(this.board.size/2)];
    this.segments = [this.headPos];
    this.board.grid[this.headPos[0]][this.headPos[1]] = "snake";
    this.ords = { "N": [-1, 0], "E": [0,1], "W": [0,-1], "S": [1,0]};
  }

  move(){
    const tailPos = this.segments.pop();
    this.board.grid[tailPos[0]][tailPos[1]] = null;
    this.headPos = this.addCoords(this.headPos, this.ords[this.direction]);
    this.board.grid[this.headPos[0]][this.headPos[1]] = "snake";
    this.segments.unshift(this.headPos);
  }

  turn(newDirection){
    if(newDirection !== this.direction){
      this.direction = newDirection;
    }
  }

  addCoords(pos1, pos2){
    const newCoord = [pos1[0] + pos2[0],  pos1[1] + pos2[1]];
    return newCoord;
  }

}

export default Snake;
