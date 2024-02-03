class Manager {
  constructor({ players, board, canvas }) {
    this.players = players;
    this.activePlayer = players[0];
    this.phases = ['draw', 'standBy', 'main1', 'battle', 'main2', 'end'];
    this.currentPhase = 0;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentHover = null;
    this.x = 0;
    this.y = 0;
    this.onDrag = false;
    this.canvas.addEventListener('mousemove', (event) => {
      this.x = event.offsetX;
      this.y = event.offsetY;
      if (this.onDrag) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentHover.rectangle.setRect({
          x: this.x - this.currentHover.rectangle.width / 2,
          y: this.y - this.currentHover.rectangle.height / 2,
        });
        return;
      }
      let somethingSelected = false;
      this.activePlayer.hand.cards.forEach((card) => {
        if (card.rectangle.getIsHover({ x: this.x, y: this.y })) {
          card.rectangle.highlight = true;
          this.currentHover = card;
          somethingSelected = true;
        } else {
          card.rectangle.highlight = false;
        }
      });
      if (!somethingSelected) {
        this.currentHover = null;
      }
    });

    this.canvas.addEventListener('mousedown', () => {
      if (this.onDrag) {
        this.onDrag = false;
        return;
      }
      if (this.currentHover) {
        this.onDrag = true;
      }
    });
  }
}
