class DrawPhase extends Phase {
  constructor({ state, board, canvas }) {
    super({ state, board, canvas });
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
    this.canvas.removeEventListener('mousemove', this.boundMouseMove);
    this.canvas.removeEventListener('mousedown', this.boundMouseDown);
  }

  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    if (
      this.state.activePlayer.deck.rectangle.getIsHover({
        x: this.x,
        y: this.y,
      })
    ) {
      this.state.activePlayer.deck.rectangle.highlight = true;
      this.currentHover = this.state.activePlayer.deck;
    } else {
      this.state.activePlayer.deck.rectangle.highlight = false;
      this.currentHover = null;
    }
  }

  handleMouseDown(event) {
    if (this.currentHover && event.button === 0) {
      this.state.activePlayer.drawCard();
      this.board.setUpPlayersCardsPositions();
      this.currentHover.rectangle.highlight = false;
      this.currentHover = null;
      this.nextPhase();
    }
  }
}
