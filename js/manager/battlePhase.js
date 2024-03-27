class BattlePhase extends Phase {
  constructor({ state, board, canvas }) {
    super({ state, board, canvas });
    this.name = 'Battle';
    this.currentHover = null;
    this.selectedIndex = -1;
    this.currentHoverIndex = -1;
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

  handleMouseMove(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    let somethingHovered = false;
    const player = this.selectedCard
      ? this.state.inactivePlayer
      : this.state.activePlayer;
    // hover over currently selected card
    if (this.selectedCard?.rectangle?.getIsHover({ x: this.x, y: this.y })) {
      this.currentHover = this.selectedCard;
      return;
    }
    player.summons.cards.forEach((card, i) => {
      if (
        card.rectangle.getIsHover({ x: this.x, y: this.y }) &&
        card.type === 'summon'
      ) {
        card.rectangle.highlight = true;
        this.currentHover = card;
        somethingHovered = true;
        this.currentHoverIndex = i;
      } else {
        card.rectangle.highlight = false;
      }
    });
    if (!somethingHovered) {
      this.currentHover = null;
      this.currentHoverIndex = -1;
    }
  }

  handleMouseDown(event) {
    if (
      this.selectedCard &&
      this?.currentHover?.type === 'summon' &&
      event.button === 0
    ) {
      this.handleSummonBattle(this.currentHover);
      return;
    }
    // left mouse button click
    if (this.currentHover && event.button === 0) {
      if (this.selectedCard === this.currentHover) {
        this.selectedCard.rectangle.highlight = false;
        this.selectedCard = null;
        this.selectedIndex = -1;
        console.log('deselect');
      } else {
        this.selectedCard = this.currentHover;
        this.selectedIndex = this.currentHoverIndex;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.state.activePlayer.hand.setSelectedCard(this.selectedCard);
    }
  }

  handleSummonBattle(enemySummon) {
    console.log('BATTLE!');
    if (enemySummon.attack > this.selectedCard.attack) {
      // this.state.activePlayer.summons[]
    } else if (enemySummon.attack < this.selectedCard.attack) {
    } else {
    }
  }

  handleEndPhase() {
    this.currentHover = null;
    this.selectedIndex = -1;
    this.currentHoverIndex = -1;
    this.nextPhase();
  }
}
