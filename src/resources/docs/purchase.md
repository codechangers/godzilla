---
title: purchase()
tags: [customize]
---
This method will allow you to purchase items in your game using in-game currency.
## parameters
**customer**: `object` - The character/resource that is making the purchase.<br><br>
​
**currency**: `string` - The customer attribute that is used as currency.<br><br>
​
**cost**: `number` - How much currency the purchase costs.<br><br>
​
**item**: `string` - The customer attribute that holds the purchased item.<br><br>
​
**amount**: `number` - How many items are given per purchase.
## Returns
**Nothing**
## Usage
This method can be used if you have a score/currency system set up for your game. This should be used to set up purchasing capability.
# Examples
### Example 1
```
//File code/server/rooms/room.js
onMessage(client, data) {
	const actions = {
		const  player = g.getACharacter('players', client.sessionId);
		buyItem: () => {
	         g.purchase(player, 'points', 50, 'ninjaStar', 2);
	    },
	}
 }
```
