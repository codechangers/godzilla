# 7. Set up Co-op play
 (Step 3/4) To Set up multiplayer gameplay

##### 3. Change our `handleCollision` _function_ for players and enemies in the `onUpdate` _function_ in the `room.js` file.

```
// File: code/client/src/game.js
// Copy 
g.handleCollision('players',  'enemy',  (player)  =>  {
	if  (player.safe ==  false)  {
		player.spriteName =  "grave";
		player.speed =  0;
		let result =  true;
		g.getAllCharacters('players', player =>  {
		if  (player.speed ==  5)  {
			result =  false;
		}
	})
	if  (result ==  true)  {
		g.getACharacter('team',  'team').score =  1;
		g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players', player.speed =  5  });
	}
	}
});
// End Copy
/*[*/g.handleCollision('players',  'enemy',  (player)  =>  {
	if  (player.safe ==  false)  {
		player.spriteName =  "grave";
		player.speed =  0;
		let result =  true;
		g.getAllCharacters('players', player =>  {
		if  (player.speed ==  5)  {
			result =  false;
		}
	})
	if  (result ==  true)  {
		g.getACharacter('team',  'team').score =  1;
		g.getAllCharacters('players', player =>  { player.x =  270, player.y =  1990, player.spriteName =  'players', player.speed =  5  });
	}
	}
});/*]*/
```

<hr class="uk-margin-medium">