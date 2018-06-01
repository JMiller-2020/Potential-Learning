class Game2048 {

  // board, score

  constructor(x, y, width=200, height=200, size=4) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.board = zeros([size, size]) // creates [size][size]
    this.init();
    this.score = 0;
  }

  /**
   * @returns whether or not the board is full
   */
  full() {
    for(let r = 0; r < this.board.length; r++) {
      for(let c = 0; r < this.board[r].length; c++) {
        if(this.board[r][c] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * attempts to add tile (2 or 4) to random (, empty) position on board
   *
   * @returns false if board is full
   */
  addTile() {
    if(this.full()) {
      return false;
    }
    while(true) {
      let r = randIdx(this.board.length);
      let c = randIdx(this.board[r].length);
      if(this.board[r][c] == 0) {
        this.board[r][c] = randInt(1,2) * 2;
        return true;
      }
    }
  }

  init() {
    this.addTile();
    this.addTile();
  }

  draw(ctx) {
    ctx.save();
    for(let i = 0; i <= this.board.length; i++) {
      let colX = lerp(this.x, this.x+this.width, i/this.board.length);
      ctx.beginPath();
      ctx.moveTo(colX, this.y);
      ctx.lineTo(colX, this.y+this.height);
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      let rowY = lerp(this.y, this.y+this.height, i/this.board.length);
      ctx.beginPath();
      ctx.moveTo(this.x, rowY);
      ctx.lineTo(this.x+this.width, rowY);
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }

    for(let r = 0; r < this.board.length; r++) {
      let rowY = lerp(this.y, this.y+this.height, r/this.board.length) + this.height/this.board.length/2;
      for(let c = 0; c < this.board[r].length; c++) {
        let colX = lerp(this.x, this.x+this.width, c/this.board[r].length) + this.width/this.board[r].length/2;
        if(this.board[r][c] != 0) {
          ctx.fillStyle = "#8ff";
          ctx.font = "24px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(this.board[r][c], colX, rowY);
        }
      }
    }

    ctx.restore();
  }
}