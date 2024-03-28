//* the board contains 5 monster slot each side, 5 magic/trap each side
//* 1 graveyard each side, 1 deck each side, 6 card max each side(but must discard to have 6 at end)
//*
class Board {
  constructor({
    canvas,
    p1,
    p2,
    boardHeight,
    boardWidth,
    rows,
    columns,
    cardHeight,
    cardWidth,
  }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.frontPlayer = p1;
    this.backPlayer = p2;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.widthOffset = (canvas.width - this.boardWidth) / 2;
    this.heightOffset = (canvas.height - this.boardHeight) / 2;
    this.rows = rows;
    this.columns = columns;
    this.cardHeight = cardHeight;
    this.cardWidth = cardWidth;
  }

  setUpPlayersCardsPositions() {
    this.setUpBoardCards({ player: this.backPlayer });
    this.setUpBoardCards({
      player: this.frontPlayer,
      invert: true,
    });
    this.setUpHand();
  }

  setUpBoardCards({ player, invert = false }) {
    if (invert) {
      const graveyardPos = {
        x: 0,
        y: this.canvas.height - this.heightOffset - this.cardHeight,
      };
      const deckPos = {
        x: (this.columns - 1) * this.cardWidth + this.widthOffset,
        y: this.canvas.height - this.heightOffset - this.cardHeight,
      };
      player.graveyard.rectangle.setRect({
        x: graveyardPos.x + this.widthOffset,
        y: graveyardPos.y,
        width: this.cardWidth,
        height: this.cardHeight,
      });
      player.tactics.cards.forEach((tactic, i) => {
        tactic.rectangle.setRect({
          x: (i + 1) * this.cardWidth + this.widthOffset,
          y: graveyardPos.y,
          width: this.cardWidth,
          height: this.cardHeight,
        });
      });
      player.summons.cards.forEach((summon, i) => {
        summon.rectangle.setRect({
          x: (i + 1) * this.cardWidth + this.widthOffset,
          y: graveyardPos.y - this.cardHeight,
          width: this.cardWidth,
          height: this.cardHeight,
        });
      });
      player.deck.rectangle.setRect({
        x: deckPos.x,
        y: deckPos.y,
        width: this.cardWidth,
        height: this.cardHeight,
      });
      return;
    }
    const deckPos = { x: 0, y: 0 };
    const graveyardPos = { x: this.columns - 1, y: 0 };
    player.deck.rectangle.setRect({
      x: deckPos.x + this.widthOffset,
      y: deckPos.y + this.heightOffset,
      width: this.cardWidth,
      height: this.cardHeight,
    });
    player.tactics.cards.forEach((tactic, i) => {
      tactic.rectangle.setRect({
        x: (i + 1) * this.cardWidth + this.widthOffset,
        y: deckPos.y + this.heightOffset,
        width: this.cardWidth,
        height: this.cardHeight,
      });
    });
    player.summons.cards.forEach((summon, i) => {
      summon.rectangle.setRect({
        x: (i + 1) * this.cardWidth + this.widthOffset,
        y: (deckPos.y + 1) * this.cardHeight + this.heightOffset,
        width: this.cardWidth,
        height: this.cardHeight,
      });
    });
    player.graveyard.rectangle.setRect({
      x: graveyardPos.x * this.cardWidth + this.widthOffset,
      y: graveyardPos.y + this.heightOffset,
      width: this.cardWidth,
      height: this.cardHeight,
    });
  }

  drawBoard() {
    this.backPlayer.deck.draw(this.ctx);
    this.backPlayer.tactics.draw(this.ctx);
    this.backPlayer.summons.draw(this.ctx);
    this.backPlayer.graveyard.draw(this.ctx);
    this.backPlayer.hand.draw(this.ctx);

    this.frontPlayer.deck.draw(this.ctx);
    this.frontPlayer.tactics.draw(this.ctx);
    this.frontPlayer.summons.draw(this.ctx);
    this.frontPlayer.graveyard.draw(this.ctx);
    this.frontPlayer.hand.draw(this.ctx);
  }

  setUpHand() {
    for (let col = 1; col < 1 + this.backPlayer.hand.length(); col++) {
      const x = col * this.cardWidth + this.widthOffset;
      const y = 0;

      this.backPlayer.hand.cards[col - 1].rectangle.setRect({
        x,
        y,
        width: this.cardWidth,
        height: this.cardHeight,
      });
    }

    for (let col = 1; col < 1 + this.frontPlayer.hand.length(); col++) {
      const x = col * this.cardWidth + this.widthOffset;
      const y = this.canvas.height - this.cardHeight;

      this.frontPlayer.hand.cards[col - 1].rectangle.setRect({
        x,
        y,
        width: this.cardWidth,
        height: this.cardHeight,
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBoard();
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(
      this.widthOffset,
      this.heightOffset,
      this.boardWidth,
      this.boardHeight
    );
  }
}
