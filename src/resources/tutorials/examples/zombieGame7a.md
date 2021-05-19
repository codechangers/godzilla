# 5. Setup Login Screen
 (Step 1/4)

##### 1. In `game.js`, delete `g.connect();` and replace it with login screen code.

``` javascript
// File: code/client/src/game.js
// Copy
g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
// End Copy
create() {
	g.setupKeys(keys);
	/*{*/g.useLoginScreen((name) => g.connect({ name }));/*}[*/g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');/*]*/
```