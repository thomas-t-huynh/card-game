class Manager {
  constructor({ players, board, canvas }) {
    this.players = players;
    this.activePlayer = players[0];
    this.inactivePlayer = players[1];
    // TODO - replease w/ an array of phase classes?
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.currentHover = null;
    this.selectedCard = null;
    this.selectedCards = [];
    this.selectedSlot = -1;
    const drawPhase = new DrawPhase({
      player: this.activePlayer,
      board,
      canvas,
    });
    // this.phases = ['draw', 'standBy', 'main1', 'battle', 'main2', 'end'];
    this.phases = [drawPhase];
    this.currentPhase = 0;
  }

  getCurrentPhaseName() {
    return this.phases[this.currentPhase].name;
  }

  addEventListeners() {
    // this.boundMouseMove = this.handleMouseMove.bind(this);
    // this.boundMouseDown = this.handleMouseDown.bind(this);
    // this.canvas.addEventListener('mousemove', this.boundMouseMove);
    // this.canvas.addEventListener('mousedown', this.boundMouseDown);
  }

  removeEventListeners() {
    // this.canvas.removeEventListeners('mousemove', this.boundMouseMove);
    // this.canvas.removeEventListeners('mousedown', this.boundMouseDown);
  }

  //* main phase 1 & main phase 2 event handlers - tack on tributes later.

  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    let somethingHovered = false;
    if (this.selectedCard) {
      this.activePlayer[this.selectedCard.category].cards.forEach((card, i) => {
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
    this.activePlayer.hand.cards.forEach((card) => {
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
      this.activePlayer.hand.setSelectedCard(this.selectedCard);
    }
  }

  playCardOnField(category) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.activePlayer.hand.setSelectedCard(null);
    this.activePlayer[category].cards[this.selectedSlot] = this.selectedCard;
    this.activePlayer.hand.cards = this.activePlayer.hand.cards.filter(
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

  activateCurrentPhase() {
    this.phases[this.currentPhase].addEventListeners();
  }

  deactivateCurrentPhase() {
    this.phases[this.currentPhase].removeEventListeners();
  }

  nextPhase() {
    this.currentPhase = (this.currentPhase + 1) % this.phases.length;
    this.deactivateCurrentPhase();
    this.activateCurrentPhase();
  }

  //* old drag and drop - maybe there will be a use for it someday.
  // handleMouseMove(event) {
  //   this.x = event.offsetX;
  //   this.y = event.offsetY;
  //   if (this.onDrag) {
  //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //     this.currentHover.rectangle.setRect({
  //       x: this.x - this.currentHover.rectangle.width / 2,
  //       y: this.y - this.currentHover.rectangle.height / 2,
  //     });
  //     return;
  //   }
  //   let somethingSelected = false;
  //   this.activePlayer.hand.cards.forEach((card) => {
  //     if (card.rectangle.getIsHover({ x: this.x, y: this.y })) {
  //       card.rectangle.highlight = true;
  //       this.currentHover = card;
  //       somethingSelected = true;
  //     } else {
  //       card.rectangle.highlight = false;
  //     }
  //   });
  //   if (!somethingSelected) {
  //     this.currentHover = null;
  //   }
  // }

  // handleMouseDown() {
  //   if (this.onDrag) {
  //     this.onDrag = false;
  //     return;
  //   }
  //   if (this.currentHover) {
  //     this.onDrag = true;
  //   }
  // }
}
