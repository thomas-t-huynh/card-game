class Empty extends Card {
  constructor(props = { name: 'empty', type: 'empty' }) {
    const { name, type } = props;
    const rectangle = new Rectangle({
      fillStyle: 'white',
      strokeStyle: 'black',
    });
    super({ name, type, rectangle });
  }
}
