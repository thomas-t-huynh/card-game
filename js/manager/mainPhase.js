class MainPhase extends Phase {
  constructor({ player, board, canvas, state }) {
    super({ player, board, canvas });
    this.name = 'Main 1';
    this.currentHover = null;
    this.state = state;
  }
  addEventListeners() {
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseDown = this.handleMouseDown.bind(this);
    this.boundEndButtonClick = this.handleEndPhase.bind(this);
    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('mousedown', this.boundMouseDown);
    endButton.addEventListener('click', this.boundEndButtonClick);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.boundMouseMove);
    this.canvas.removeEventListener('mousedown', this.boundMouseDown);
    endButton.removeEventListener('click', this.boundEndButtonClick);
  }

  //* main phase 1 & main phase 2 event handlers - tack on tributes later.
  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    let somethingHovered = false;
    if (this.selectedCard) {
      this.state.activePlayer[this.selectedCard.category].cards.forEach(
        (card, i) => {
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
        }
      );
    }
    this.state.activePlayer.hand.cards.forEach((card) => {
      if (card.rectangle.getIsHover({ x: this.x, y: this.y })) {
        if (this.state.hasSummoned && card.type === 'summon') {
          return;
        }
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
      this.state.activePlayer.hand.setSelectedCard(this.selectedCard);
    }
  }

  playCardOnField(category) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.activePlayer.hand.setSelectedCard(null);
    this.state.activePlayer[category].cards[this.selectedSlot] =
      this.selectedCard;
    this.state.activePlayer.hand.cards =
      this.state.activePlayer.hand.cards.filter(
        (card) => card !== this.selectedCard
      );
    if (this.selectedCard.type === 'summon') {
      this.state.setHasSummoned(true);
    }
    this.clearSelected();
    this.board.setUpPlayersCardsPositions();
  }

  handleEndPhase() {
    this.nextPhase();
  }

  clearSelected() {
    this.currentHover.rectangle.highlight = false;
    this.selectedCard = null;
    this.currentHover = null;
  }
}
