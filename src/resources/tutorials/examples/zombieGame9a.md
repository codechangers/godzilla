---
title: Add HowTo Screen
subtitle: Learn how to make a super cool zombie game
tags: [customize]
author: jason
---

##### 1. In `game.js`, create a howTo screen in the `create()` function.
{% capture code %}
	g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',  // Put your team members names
		'Grunch': 'Coding/Testing/Fixing',     // and what jobs you did, down
		'Nimbo': 'Planning/Designing/Testing', // here in the credits!
		// You can find a list of jobs on your handout!
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

When you write yours, you will need to keep adding to your list of controls, and your contributors until you have added everything needed for your game.
