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

##### 2. 
Now, we can create a `mousemove` action in **room.js**, we'll put it in the `onMessage` _method_ right under our `click` action. So just like when we added our `click` action we need to add a comma after the last action that was written, which is probably the `click` action. So we write a comma and then hit the return key to start a new line where we write our `mousemove` action.
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		// Don't forget to add a comma at the end.
		// Add this new code here:
		mousemove: () => {
			// **Empty Space**

		},
		// End of the new code.
	};
}
```
{% capture code %}
		mousemove: () => {

		},
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
Inside of the brackets in our `mousemove` action we need to change the rotation of our player, and to get the rotation we need in order to follow the mouse, we will use a _function_ called [getRotationTowards](/docs/getRotationTowards/). Then our `mousemove` action will look like this:
```javascript
// Click on: code > server > rooms > room.js

onMessage() {
	// There is some code up here.
	const actions = {
		// There is a little bit more code here.
		mousemove: () => {
			// Add this new code here:
			player.rotation = g.getRotationTowards(player, data.x, data.y);  
			// End of the new code.
		},
	};
}
```
Now our player will always be facing towards the direction of our mouse.

> **Download your zip, and [upload it](/tutorials/uploadtoserver/) to [blobbert.io](https://blobbert.io/), and you should have a background!**
