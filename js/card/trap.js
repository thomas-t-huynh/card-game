class Trap extends Card {
  constructor({ name, effect }) {
    const rectangle = new Rectangle({
      fillStyle: 'purple',
      strokeStyle: 'black',
    });
    super({ name, type: 'trap', category: 'tactics', rectangle });
    this.effect = effect;
  }
}
