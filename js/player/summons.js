class Summons {
  constructor() {
    this.cards = new Array(5).fill().map(() => new Empty());
  }

  addCard(card) {
    this.cards.push(card);
  }

  draw(ctx) {
    this.cards.forEach((card) => card.rectangle.draw(ctx));
  }
}
