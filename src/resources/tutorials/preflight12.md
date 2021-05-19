# Add Keyboard Controls

##### 8. In the `create()` _function_ in `game.js` add the `setupKeys()` function below the `drawBackground()` function.
```javascript
// File: game.js
// Copy
g.setupKeys(keys);
// End Copy
  create() {
    g.drawBackground('background');/*[*/
    g.setupKeys(keys);/*]*/
  }
```

