class Summon extends Card {
  constructor({ name, attack, defense, effect, level }) {
    const rectangle = new Rectangle({
      strokeStyle: 'black',
      fillStyle: 'brown',
    });
    super({ name, type: 'summon', rectangle });
    this.attack = attack;
    this.defense = defense;
    this.effect = effect;
    this.level = level;
  }
}
