# 1 Add a Background
 (Step 4/5)

##### 4. In `room.js`, Add `setBounds()` inside the `onInit()` function to set the boundaries of the game.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.setBounds(2000, 2000);
// End Copy
/*[*/g.setBounds(2000, 2000);/*]*/
```

> **Make sure that you write it after your `setup` _function_ or else it will break your game. You can change the numbers to make the bounds whatever size you want.**