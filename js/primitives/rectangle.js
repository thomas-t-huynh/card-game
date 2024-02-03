class Rectangle {
  constructor(
    props = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      strokeStyle: 'black',
      fillStyle: 'white',
    }
  ) {
    const { height, width, x, y } = props;
    this.width = width;
    this.height = height;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y + height;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
  }

  getMiddle() {
    return {
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
    };
  }

  setRect({ x, y, width, height }) {
    this.width = width;
    this.height = height;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y + height;
  }

  draw(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x1, this.y1, this.width, this.height);

    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x1, this.y1, this.width, this.height);
  }
}
