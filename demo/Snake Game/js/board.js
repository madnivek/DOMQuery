import Snake from './snake.js';

class Board {
  constructor(size = 25){
    this.size = size;
    this.grid = [];
  }

  generateBoard(){
    for(let i = 0; i < this.size; i++){
      this.grid[i] = [];
      for(let j = 0; j < this.size; j++){
        this.grid[i][j] = null;
      }
    }
  }

  addRandomApples(num){
    for(let i = 0; i < num; i ++){
      const posX = Math.floor(Math.random() * this.size);
      const posY = Math.floor(Math.random() * this.size);
      this.addToCell(posX, posY, "apple");
    }
  }

  addToCell(x, y, el){
    this.grid[x][y] = el;
  }
}

export default Board;
