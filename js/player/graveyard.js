class Graveyard {
  constructor() {
    this.cards = [];
    this.rectangle = new Rectangle({ strokeStyle: 'black', fillStyle: 'grey' });
  }

  draw(ctx) {
    this.rectangle.draw(ctx);
  }
}
