class Phase {
  constructor({ state, board, canvas }) {
    this.state = state;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  setNextPhase(nextPhase) {
    this.nextPhase = nextPhase;
  }
}
