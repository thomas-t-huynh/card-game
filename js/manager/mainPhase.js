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
    this.boundPositionCardToAttack = this.positionCardToAttack.bind(this);
    this.boundPositionCardToDefense = this.positionCardToDefense.bind(this);
    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('mousedown', this.boundMouseDown);
    endButton.addEventListener('click', this.boundEndButtonClick);
    attackPositionBtn.addEventListener('click', this.boundPositionCardToAttack);
    defensePositionBtn.addEventListener(
      'click',
      this.boundPositionCardToDefense
    );
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

    // find a card to select
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
      this.hideToolTip();
      if (this.selectedCard === this.currentHover) {
        this.selectedCard = null;
      } else {
        this.selectedCard = this.currentHover;
        this.currentHover.type === 'summon' && this.showToolTip();
      }
      this.state.activePlayer.hand.setSelectedCard(this.selectedCard);
    }
  }

  playCardOnField(category) {
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

  showToolTip() {
    summonToolTip.style.display = 'flex';
    summonToolTip.style.top = `${this.y}px`;
    summonToolTip.style.left = `${this.board.widthOffset + this.x}px`;
  }

  hideToolTip() {
    summonToolTip.style.display = 'none';
  }

  positionCardToAttack() {
    this.selectedCard.position = 'attack';
    this.selectedCard.faceUp = true;
  }
  positionCardToDefense() {
    this.selectedCard.position = 'defense';
    this.selectedCard.faceUp = false;
  }
}
