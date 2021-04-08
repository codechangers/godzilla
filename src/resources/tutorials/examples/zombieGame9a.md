# 1 Add HowTo Screen
 (Step 1/2)

##### 1. In `game.js`, customize the howTo screen in the `create()` function.
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
g.useHowToScreen('How to play', {
	// Don't forget to update this information!
	'Objective': /*{*/'Do something that makes you win!',/*}[*/'Shoot and eliminate evil zombies and to save the World!',/*]*/
	'Key: [TAB]': 'Open/Close Game Store',
	'<h2>Movement (</h2> ': ' <h2>WASD or Arrow Keys)</h2>',
	'Key: [W/UP]': 'Move Up',
	'Key: [A/LEFT]': 'Move Left',
	'Key: [S/DOWN]': 'Move Down',
	'Key: [D/RIGHT]': 'Move Right',
}, {
	/*{*/'Blobbert'/*}[*/'Macuyler'/*]*/: 'Planning/Coding/Fixing',  // Put your team members names
	/*{*/'Grunch'/*}[*/'Alex'/*]*/: 'Coding/Testing/Fixing',     // and what jobs you did, down
	/*{*/'Nimbo'/*}[*/'Jason'/*]*/: 'Planning/Designing/Testing', // here in the credits!
	// You can find a list of jobs on your handout!
});

```

Change the names and the roles in the code you just copied to your team member's names and also what job you did in the project.

When you write yours, you will need to keep adding to your list of controls, and your contributors until you have added everything needed for your game.
