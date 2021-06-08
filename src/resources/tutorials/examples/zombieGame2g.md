# Zombie Game - 2.G

## Add zombies into your game.

**(Step 7/7)** Make the zombies chase players around.

### Zombies follow players.

In `room.js` we need to add a `follow` _function_ to the `onUpdate` _method_. This will make it so zombies chase players around!

```javascript
// File: room.js
// Copy
g.follow('players', 'zombies', 1, 0.1);
// End Copy
onUpdate(dt) {
	/*[*/g.follow('players', 'zombies', 1, 0.1);/*]*/
}
```

> **You can change the numbers to change the distance the zombies will come to your character, and the speed of the zombies.**
