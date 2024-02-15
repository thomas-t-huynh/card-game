class Player {
  constructor({ deck, graveyard, name, lifePoints = 8000, summons, tactics }) {
    this.lifePoints = lifePoints;
    this.deck = deck;
    this.graveyard = graveyard;
    this.name = name;
    this.summons = summons;
    this.tactics = tactics;
    this.hand = new Hand();
  }

  drawCard() {
    this.hand.push(this.deck.drawCard());
  }

  drawFiveCards() {
    for (let i = 0; i < 5; i++) {
      const card = this.deck.drawCard();
      this.hand.push(card);
    }
  }
}
