class Spell extends Card {
  constructor({ name, effect }) {
    const rectangle = new Rectangle({
      fillStyle: 'teal',
      strokeStyle: 'black',
    });
    super({ name, type: 'spell', category: 'tactics', rectangle });
    this.effect = effect;
  }
}
