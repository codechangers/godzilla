# Zombie Game - 1.E

## Add a new background and character to your game.

**(Step 5/5)** Change the dimensions of your game.

### Set the client game width.

In `game.js`, Change the game width in the top of the file from **2000** to **4000**.

```javascript
// File: game.js
// Copy
const GAME_WIDTH = 4000;
// End Copy
const Phaser = require('phaser');
const ClientLib = require('./client-lib');
const g = new ClientLib();

const GAME_WIDTH = /*{*/2000/*}[*/4000/*]*/;
const GAME_HEIGHT = 2000;

const keyCodes = Phaser.Input.Keyboard.KeyCodes;
```

### Set the server game width.

In `room.js`, Change the game width in the top of the file from **2000** to **4000**.

```javascript
// File: room.js
// Copy
const GAME_WIDTH = 4000;
// End Copy
const Room = require('colyseus').Room;
const ServerLib = require('./server-lib');
const g = new ServerLib();

const GAME_WIDTH = /*{*/2000/*}*//*[*/4000/*]*/;
const GAME_HEIGHT = 2000;

module.exports = class MyRoom extends Room {
  onInit() {
```
