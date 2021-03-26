---
title: usePlayerSelectScreen()
tags: [customize]
---
This method will allow you to set up a player select screen so that players will be able to choose between different character images when they login to your game. 

## Parameters
**data**: `object` - The names and pictures that the players can choose from. 
## Returns 
**Nothing**
## Usage
You are able to use this function after you have implemented the useLoginScreen function in your game. 
## Examples
### 1.
```
// File: code/client/src/game.js
create(){
	g.usePlayerSelectScreen({ players:  'Cowboy.png', zombie:  'zombie.png', knight:  'knight.png' })
}
```


