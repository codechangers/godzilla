# 6. Set Players Rotation
 (Step 1/3) Our next step is to get our character to rotate so that it will always face towards our mouse. 

##### In `game.js`, add the `sendAction()` function into the `mousemove` method.

```javascript
// File: code/client/src/game.js
// Copy
g.sendAction('mousemove', {x, y});
// End Copy
mousemove(x, y) {
	/*[*/g.sendAction('mousemove', {x, y});/*]*/
}
```
