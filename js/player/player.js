class Player {
  constructor({ deck, graveyard, name, lifePoints = 8000, summons, tactics }) {
    this.lifePoints = lifePoints;
    this.deck = deck;
    this.graveyard = graveyard;
    this.name = name;
    this.summons = summons;
    this.tactics = tactics;
  }
}
