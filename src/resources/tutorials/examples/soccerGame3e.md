# 3. Add More Characters

Step (5/5) To add more characters to your game

##### 5. In `game.js` change the Login Screen code and replace it with the following code.

```
// File: code/client/src/game.js
// Copy
g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
// End Copy
/*[*/g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));/*]*/
```