class DrawPhase {
  constructor({ player, board, canvas }) {
    this.player = player;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.name = 'Draw';
    this.currentHover = null;
  }
  addEventListeners() {
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseDown = this.handleMouseDown.bind(this);
    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('mousedown', this.boundMouseDown);
  }

  removeEventListeners() {
    this.canvas.removeEventListeners('mousemove', this.boundMouseMove);
    this.canvas.removeEventListeners('mousedown', this.boundMouseDown);
  }

  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    if (this.player.deck.rectangle.getIsHover({ x: this.x, y: this.y })) {
      this.player.deck.rectangle.highlight = true;
      this.currentHover = this.player.deck;
    } else {
      this.player.deck.rectangle.highlight = false;
    }
  }

  handleMouseDown(event) {
    if (this.currentHover && event.button === 0) {
      this.player.drawCard();
      this.board.setUpPlayersCardsPositions();
      this.currentHover = null;
    }
  }
}
