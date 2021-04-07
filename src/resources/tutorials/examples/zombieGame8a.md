# 1 Set Players Rotation
 (Step 1/3)

##### 1. in `game.js`, in the `mousemove()` function.

Our next step is to get our character to rotate so that it will always face towards our mouse. 

In `game.js`, add the `sendAction()` function into the `mousemove` method.

```javascript
// File: code/client/src/game.js
	g.sendAction('mousemove', {x, y});
}
```
