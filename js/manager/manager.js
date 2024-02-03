class Manager {
  constructor({ players, board, canvas }) {
    this.players = players;
    this.activePlayer = players[0];
    this.inactivePlayer = players[1];
    // TODO - replease w/ an array of phase classes?
    this.phases = ['draw', 'standBy', 'main1', 'battle', 'main2', 'end'];
    this.currentPhase = 0;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.currentHover = null;
    this.selectedCard = null;
    this.selectedCards = [];
    this.selectedSlot = -1;
  }

  getCurrentPhaseName() {
    return (this.currentPhaseName = this.phases[this.currentPhase]);
  }

  addEventListeners() {
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseDown = this.handleMouseDown.bind(this);
    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('mousedown', this.boundMouseDown);
  }

  //* main phase 1 & main phase 2 event handlers - tack on tributes later.

  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    let somethingHovered = false;
    if (this.selectedCard) {
      const cardType = this.selectedCard.type;
      if (cardType === 'summon') {
        this.activePlayer.summons.cards.forEach((card, i) => {
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
    if (
      this.selectedCard &&
      this?.currentHover?.type === 'empty' &&
      event.button === 0
    ) {
      console.log('place monster here at slot', this.selectedSlot);
      this.activePlayer.summons.cards[this.selectedSlot] = this.selectedCard;
      this.activePlayer.hand.cards = this.activePlayer.hand.cards.filter(
        (card) => card !== this.selectedCard
      );
      this.currentHover.rectangle.highlight = false;
      this.selectedCard = null;
      this.currentHover = null;
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
