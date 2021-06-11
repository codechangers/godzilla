# Zombie Game - 6.A

## Add character rotation.

**(Step 1/2)** Send _mousemove_ action when the mouse is moved.

### Detect mouse movement.

In `game.js`, we need to add a `sendAction` _function_ to the `mousemove` _method_.

```javascript
// File: game.js
// Copy
if (g.canSend()) {
      g.sendAction('mousemove', { x, y });
    }
// End Copy
mousemove(x, y) {
    /*[*/if (g.canSend()) {
        g.sendAction('mousemove', { x, y });
    }/*]*/
}
```
