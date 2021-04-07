---
title: Set Players Rotation
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. in `game.js`, in the `mousemove()` function.
  Our next step is to get our character to rotate so that it will always face towards our mouse. To start we will add a [sendAction](/docs/sendAction/) _function_ into the `mousemove` _method_ in our **game.js** file under our `click` _method_.
```javascript
// Click on: code > client > src > game.js

mousemove(x, y) {
	// You might have some other code here.
	// Add this new code below your other code:
	g.sendAction('mousemove', {x, y});
	// End of the new code.
}
```
{% capture code %}
	g.sendAction('mousemove', {x, y});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
