# Zombie Game - 4.H

## Add shooting to the game.

**(Step 8/10)** Send the click action when the mouse is clicked.

### Send click actions from player.

In `game.js`, we need to add a `sendAction` _function_ to the `click` _method_. This will send our click action when we click with our mouse.

``` javascript
// File: game.js
// Copy
if (g.canSend()) {
      g.sendAction('click', { x, y });
    }
// End Copy
click(x, y) {
    /*[*/if (g.canSend()) {
        g.sendAction('click', { x, y });
    }/*]*/
}
```
