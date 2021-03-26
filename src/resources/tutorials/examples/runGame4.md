---
title: Add Enemy Movement
subtitle: (Step 4/9) Learn how to make enemies move and recognize collision.
tags: [customize]
---
#### 1. Go into our `onUpdate` _function_ in our `room.js` file and add a `handleCollision` _function_ that sends our characters back to the start.

<iframe width="560" height="315" src="https://www.youtube.com/embed/nGpu4sZiAQA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}g.handleCollision('players',  'enemy',  (player)  =>  {
	if (player.safe === false) {
		player.x =  270;
		player.y =  1980;
	}
});{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

#### 2. In the `onUpdate` function in our `room.js` file we put a `getAllCharacters`  _function_. (for our callback function we will set up some if else statements for the movement.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5mYBdR03rE4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}
g.getAllCharacters('enemy', (enemy, i) => {
	if (enemy.x <= 575 && enemy.right == true) {
		g.move(enemy, 'x', .01 * i + .1);
	}
	else if (enemy.x >= 25) {
		enemy.right = false;
		g.move(enemy, 'x', -.01 * i - .1);
	}
	else {
		enemy.right = true;
	}
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  interact with enemies!**
