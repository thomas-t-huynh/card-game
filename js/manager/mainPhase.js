class MainPhase {
  constructor({ player, board, canvas }) {
    this.player = player;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.name = 'Main Phase 1';
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

  //* main phase 1 & main phase 2 event handlers - tack on tributes later.
  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    let somethingHovered = false;
    if (this.selectedCard) {
      this.player[this.selectedCard.category].cards.forEach((card, i) => {
        if (
          card.rectangle.getIsHover({ x: this.x, y: this.y }) &&
          card.type === 'empty'
        ) {
          this.currentHover = card;
          card.rectangle.highlight = true;
          this.selectedSlot = i;
          somethingHovered = true;
        } else {
          card.rectangle.highlight = false;
        }
      });
    }
    this.player.hand.cards.forEach((card) => {
      if (card.rectangle.getIsHover({ x: this.x, y: this.y })) {
        card.rectangle.highlight = true;
        this.currentHover = card;
        somethingHovered = true;
      } else {
        card.rectangle.highlight = false;
      }
    });
    if (!somethingHovered) {
      this.currentHover = null;
    }
  }

  handleMouseDown(event) {
    // play selected card on empty slot
    if (
      this.selectedCard &&
      this?.currentHover?.type === 'empty' &&
      event.button === 0
    ) {
      this.playCardOnField(this.selectedCard.category);
      return;
    }
    // left mouse button click
    if (this.currentHover && event.button === 0) {
      if (this.selectedCard === this.currentHover) {
        this.selectedCard = null;
      } else {
        this.selectedCard = this.currentHover;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.hand.setSelectedCard(this.selectedCard);
    }
  }

  setNextPhase(nextPhase) {
    this.nextPhase = nextPhase;
  }

  playCardOnField(category) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.hand.setSelectedCard(null);
    this.player[category].cards[this.selectedSlot] = this.selectedCard;
    this.player.hand.cards = this.player.hand.cards.filter(
      (card) => card !== this.selectedCard
    );
    this.clearSelected();
    this.board.setUpPlayersCardsPositions();
  }

  clearSelected() {
    this.currentHover.rectangle.highlight = false;
    this.selectedCard = null;
    this.currentHover = null;
  }
}
