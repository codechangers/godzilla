# 1 Setup Login Screen
 (Step 1/4)

##### 1. In `game.js`, delete `g.connect();` and replace it with login screen code.

``` javascript
// File: code/client/src/game.js
g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Username', 'Start!');
```