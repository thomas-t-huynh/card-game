myCanvas.width = 700;
myCanvas.height = 600;

const rows = 4;
const columns = 7;
const boardToCanvasRatio = 0.6;
const boardHeight = myCanvas.height * boardToCanvasRatio;
const boardWidth = myCanvas.width * boardToCanvasRatio;
const cardWidth = boardWidth / columns;
const cardHeight = boardHeight / rows;

const ctx = myCanvas.getContext('2d');

player1Deck.shuffle();
player2Deck.shuffle();

const p1 = new Player({
  name: 'Player 1',
  deck: player1Deck,
  graveyard: new Graveyard(),
  lifePoints: 8000,
  summons: new Summons(),
  tactics: new Tactics(),
});

const p2 = new Player({
  name: 'Player 2',
  deck: player2Deck,
  graveyard: new Graveyard(),
  lifePoints: 8000,
  summons: new Summons(),
  tactics: new Tactics(),
});

const board = new Board({
  canvas: myCanvas,
  rows,
  columns,
  boardHeight,
  boardWidth,
  cardHeight,
  cardWidth,
  p1,
  p2,
});

const manager = new Manager({ players: [p1, p2], board, canvas: myCanvas });

p1.drawFiveCards();
p2.drawFiveCards();

board.setUpPlayersCardsPositions();

function animate() {
  board.draw();
  requestAnimationFrame(animate);
}

animate();
