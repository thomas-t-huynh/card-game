class StandByPhase {
  constructor({ player, board, canvas }) {
    this.player = player;
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.name = 'Stand By';
    this.currentHover = null;
  }
  addEventListeners() {
    setTimeout(() => {
      this.nextPhase();
    }, 2000);
    // this.boundMouseMove = this.handleMouseMove.bind(this);
    // this.boundMouseDown = this.handleMouseDown.bind(this);
    // this.canvas.addEventListener('mousemove', this.boundMouseMove);
    // this.canvas.addEventListener('mousedown', this.boundMouseDown);
  }

  removeEventListeners() {
    // this.canvas.removeEventListener('mousemove', this.boundMouseMove);
    // this.canvas.removeEventListener('mousedown', this.boundMouseDown);
  }

  setNextPhase(nextPhase) {
    this.nextPhase = nextPhase;
  }
}
