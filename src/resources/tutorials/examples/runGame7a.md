# 7. Set up Co-op play

(Step 1/4) To Set up multiplayer gameplay

##### 1. In the `room.js` file, we'll change the speed in our `onMessage` _function_

```javascript
// File: code/client/src/game.js
// Copy
const speed = player.speed;
// End Copy
  const player = g.getACharacter('players', client.sessionId);
  const speed = /*{*/10/*}[*/player.speed/*]*/;
  const actions = {
    moveUp: () => g.move(player, 'y', -speed),
    moveDown: () => g.move(player, 'y', speed),
```

Make sure that you don't add a new speed variable! just change the one that is already there.
