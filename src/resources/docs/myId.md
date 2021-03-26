---
title: myId()
tags: [customize]
---
This method will allow you to get your character's unique Id.

## Parameters
**none**
## Returns
**this.game.room.sessionId** - your player's Id
## Usage
You can use this once you have created players in your game. I should be used if you want anything specific to happen for each player individually, ie. have the camera follow your player (not the other players).

## Examples

### Example 1
```
g.getCharacters('players', player => {
      if (player.id === g.myId()) {
        g.cameraFollow(player.sprite);
      }
    });
    
```
