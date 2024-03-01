class Manager {
  constructor({ players, board, canvas }) {
    this.players = players;
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
    this.state = {
      hasSummoned: false,
      activePlayer: players[0],
      inactivePlayer: players[1],
      setHasSummoned(value) {
        this.hasSummoned = value;
      },
      resetState() {
        this.hasSummoned = false;
        const temp = this.activePlayer;
        this.activePlayer = this.inactivePlayer;
        this.inactivePlayer = temp;
      },
    };

    const drawPhase = new DrawPhase({
      state: this.state,
      board,
      canvas,
    });
    const standyByPhase = new StandByPhase({
      state: this.state,
      board,
      canvas,
    });
    const mainPhase1 = new MainPhase({
      state: this.state,
      board,
      canvas,
    });
    // const battlePhase = new BattlePhase({
    //   state: this.state,
    //   board,
    //   canvas,
    // });
    // this.phases = ['draw', 'standBy', 'main1', 'battle', 'main2', 'end'];
    this.phases = [drawPhase, standyByPhase, mainPhase1];
    this.currentPhase = 0;

    this.assignNextPhases();
  }

  getCurrentPhaseName() {
    return this.phases[this.currentPhase].name;
  }

  activateCurrentPhase() {
    this.phases[this.currentPhase].addEventListeners();
  }

  deactivateCurrentPhase() {
    this.phases[this.currentPhase].removeEventListeners();
  }

  nextPhase() {
    this.deactivateCurrentPhase();
    this.currentPhase = (this.currentPhase + 1) % this.phases.length;
    if (this.currentPhase === 0) {
      this.state.resetState();
    }
    this.activateCurrentPhase();
  }

  assignNextPhases() {
    this.boundNextPhase = this.nextPhase.bind(this);
    this.phases.forEach((phase) => phase.setNextPhase(this.boundNextPhase));
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
