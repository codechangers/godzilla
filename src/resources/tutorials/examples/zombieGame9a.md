# 1 Add HowTo Screen
 (Step 1/2)

##### 1. In `game.js`, create a howTo screen in the `create()` function.
``` javascript
// File: code/client/src/game.js
// Copy
g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',
		'Grunch': 'Coding/Testing/Fixing',  
		'Nimbo': 'Planning/Designing/Testing',
	});
// End Copy
	/*[*/g.useHowToScreen('How to play', {
		'Move Mouse': 'To aim at the zombies',
		'Click Mouse': 'To shoot at the zombies'
	}, {
		'Blobbert': 'Planning/Coding/Fixing',
		'Grunch': 'Coding/Testing/Fixing',  
		'Nimbo': 'Planning/Designing/Testing',
	});/*]*/
```

Change the names and the roles in the code you just copied to your team member's names and also what job you did in the project.

When you write yours, you will need to keep adding to your list of controls, and your contributors until you have added everything needed for your game.
