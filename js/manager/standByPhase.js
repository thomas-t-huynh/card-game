class StandByPhase extends Phase {
  constructor({ state, board, canvas }) {
    super({ state, board, canvas });
    this.name = 'Stand By';
    this.currentHover = null;
  }
  addEventListeners() {
    setTimeout(() => {
      this.nextPhase();
    }, 100);
    // this.boundMouseMove = this.handleMouseMove.bind(this);
    // this.boundMouseDown = this.handleMouseDown.bind(this);
    // this.canvas.addEventListener('mousemove', this.boundMouseMove);
    // this.canvas.addEventListener('mousedown', this.boundMouseDown);
  }

  removeEventListeners() {
    // this.canvas.removeEventListener('mousemove', this.boundMouseMove);
    // this.canvas.removeEventListener('mousedown', this.boundMouseDown);
  }
}
