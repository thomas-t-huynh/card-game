# card-game

Not a true read me. I'm gonna use this for notes and for planning.

# Stuff to do:

1. So the drag and drop might not be a great idea.

- because you still need to code additional stuff like having it snap on the tile. It's a cool idea, but slow if you want to get the game up and running.

Alternatives?

- select card and then highlight where it can be played.

that's probably it.

2. Start working on turn phases.

- log turn on screen
- First is draw phase:
  - Probably the easiest one to do. Draw card.
    - The main question is to whether have it go to the next phase automatically or let the player do that?
      - There may not be a lot of early yugioh cards that have draw phase action.
    - Implementation could involve user only allowed to click their deck to draw a card. We could track the amount of actions users can do in the manager and update it base on the phases.
- Something I notice is that each phase will allow players to select different cards. Or this may even happen during a card effect. Having a map that shows what is allowed to intereact with might prove to be helpful down the road.
