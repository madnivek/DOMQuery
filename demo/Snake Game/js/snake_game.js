import Board from './board.js';
import Snake from './snake.js';

class SnakeGame {
  constructor(el){
    this.el = el;
    this.board = new Board();
    this.board.generateBoard();
    this.snake = new Snake(this.board);
    this.board.addRandomApples(3);
    this.moveSnakeAndRender = this.moveSnakeAndRender.bind(this);
    setInterval( this.moveSnakeAndRender, 100);
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e){
    switch(e.keyCode){
      case 38: {
        this.snake.turn("N");
        break;
      }
      case 37: {
        this.snake.turn("W");
        break;
      }
      case 40: {
        this.snake.turn("S");
        break;
      }
      case 39: {
        this.snake.turn("E");
        break;
      }
    }
  }

  moveSnakeAndRender(){
    this.snake.move();
    this.renderBoard();
  }

  renderBoard(){
    this.el.empty();
    const $grid_ul = $l(document.createElement('ul'));
    $grid_ul.addClass("snake-grid");
    this.board.grid.forEach( row => {
      const $row_ul = $l(document.createElement('ul'));
      $row_ul.addClass("grid-row");
      row.forEach( cell => {
        const $li = $l(document.createElement('li'));
        $li.addClass("grid-cell");

        if(cell === "snake") {
          $li.addClass("snake");
        } else if(cell === "apple") {
          $li.addClass("apple");
        }

        $row_ul.append($li);
      });
      $grid_ul.append($row_ul);
    });
    this.el.append($grid_ul);
  }
}

export default SnakeGame;
