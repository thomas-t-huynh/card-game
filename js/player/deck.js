class Deck {
  constructor(cards) {
    this.cards = cards;
    this.maxCards = cards.length;
    this.rectangle = new Rectangle({ strokeStyle: 'black', fillStyle: 'tan' });
  }

  drawCard() {
    return this.cards.pop();
  }

  shuffle() {
    // fisher yates
    let currentIndex = this.maxCards;
    let randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }

  draw(ctx) {
    this.rectangle.draw(ctx);
  }
}
