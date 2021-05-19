# 4. Setup Bullets
 (Step 6/10)

##### 6. In `room.js`, in the `click` action that you just created, add code to make the bullets animate and go in the right direction.

``` javascript
// File: code/server/rooms/room.js
// Copy
const index = g.nextCharacterId('bullets');
		g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
		let newCharacter = g.getACharacter('bullets', index);
		g.playAnimation(newCharacter, 'x',
			g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
		g.playAnimation(newCharacter, 'y',
			g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
		setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);
// End Copy
click: () => {/*[*/
	const index = g.nextCharacterId('bullets');
	g.createACharacter('bullets', index, { x: player.x, y: player.y, playerId: player.id });
	let newCharacter = g.getACharacter('bullets', index);
	g.playAnimation(newCharacter, 'x',
	g.getXTowards(newCharacter, data.x, data.y) * 500, 2000);  
	g.playAnimation(newCharacter, 'y',
	g.getYTowards(newCharacter, data.x, data.y) * 500, 2000);
	setTimeout(() => g.deleteACharacter('bullets', newCharacter.id), 2000);/*]*/
},
		
```
