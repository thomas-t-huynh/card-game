class Hand {
  constructor(cards = []) {
    this.cards = cards;
    this.length = cards.length;
    this.selectedCard = null;
  }

  push(card) {
    this.cards.push(card);
    this.length = this.cards.length;
  }

  draw(ctx) {
    this.cards.forEach((card) => card.rectangle.draw(ctx));
  }

  setSelectedCard(card) {
    if (!card) {
      this.selectedCard.rectangle.setRect({
        y: this.selectedCard.rectangle.y1 + 10,
      });
      this.selectedCard = null;
      return;
    }
    if (!this.cards.includes(card)) {
      return;
    }
    if (this.selectedCard && card !== this.selectedCard) {
      this.selectedCard.rectangle.setRect({
        y: this.selectedCard.rectangle.y1 + 10,
      });
    }
    this.selectedCard = card;
    card.rectangle.setRect({ y: card.rectangle.y1 - 10 });
  }
}
