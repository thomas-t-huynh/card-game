class Summon extends Card {
  constructor({ name, attack, defense, health, effect, level }) {
    const rectangle = new Rectangle({
      strokeStyle: 'black',
      fillStyle: 'brown',
    });
    super({ name, type: 'summon' });
    this.attack = attack;
    this.defense = defense;
    this.health = health;
    this.effect = effect;
    this.level = level;
  }
}
