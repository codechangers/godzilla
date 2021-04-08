# 9. Place Blocks

Step (4/7) To be able to place blocks in your game.

##### 4. In `game.js`, Add an `if` statement so that when you click the moouse it will place a block.

```javascript
// File: code/client/src/game.js
// Copy
if (g.canSend()) {
  g.sendAction('placeBlock', { x, y });
}
// End Copy
  click(x, y) {
		/*[*/if (g.canSend()) {
			g.sendAction('placeBlock', { x, y });
		}/*]*/
  }
```
