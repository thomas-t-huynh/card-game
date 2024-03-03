class BattlePhase extends Phase {
	constructor({ state, board, canvas }) {
		super({ state, board, canvas })
		this.name = 'Battle'
	}
	addEventListeners() {
		this.boundMouseMove = this.handleMouseMove.bind(this)
		// this.boundMouseDown = this.handleMouseDown.bind(this)
		this.boundEndButtonClick = this.handleEndPhase.bind(this)
		this.canvas.addEventListener('mousemove', this.boundMouseMove)
		// this.canvas.addEventListener('mousedown', this.boundMouseDown)
		endButton.addEventListener('click', this.boundEndButtonClick)
	}

	removeEventListeners() {
		this.canvas.removeEventListener('mousemove', this.boundMouseMove)
		// this.canvas.removeEventListener('mousedown', this.boundMouseDown)
		endButton.removeEventListener('click', this.boundEndButtonClick)
	}

	handleMouseMove(event) {
		this.x = event.offsetX
		this.y = event.offsetY
		let somethingHovered = false
		this.state.activePlayer.summons.cards.forEach((card) => {
			if (
				card.rectangle.getIsHover({ x: this.x, y: this.y }) &&
				card.type === 'summon'
			) {
				card.rectangle.highlight = true
				this.currentHover = card
				somethingHovered = true
			} else {
				card.rectangle.highlight = false
			}
		})
		if (!somethingHovered) {
			this.currentHover = null
		}
	}

	handleEndPhase() {
		this.nextPhase()
	}
}
