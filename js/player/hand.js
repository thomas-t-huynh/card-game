class Hand {
  constructor(cards = []) {
    this.cards = cards;
    this.length = cards.length;
  }

  push(card) {
    this.cards.push(card);
    this.length = this.cards.length;
  }

  draw(ctx) {
    this.cards.forEach((card) => card.rectangle.draw(ctx));
  }
}
