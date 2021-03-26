---
title: useHowToScreen()
tags: [customize]
---
This method will have your game show a how to page that allows you to explain your game and how to play. 
## Parameters
**title**: `string` - What the header should say.

**theDescriptions**: `object` - Everything that you'd like to explain about your game. 

**theContributors**: `object` - All of the people that have contributed.
## Returns
**Nothing**
## Usage
You can use this method after you have implemented the the useLoginScreen method in your game. It should be used to  explain your game and how to play, and give credit to the people who helped build it. 

## Examples
### 1.
```
// File: code/client/src/game.js
create(){
g.useHowToScreen("How to play", { w:  'Move Up', a:  'move left', s:  'move down', d:  'move right', click:  "shoot", downArrow:  "move down", upArrow:  "move up", leftArrow:  'move left', rightArrow:  'move right' }, { Artwork:  "Alex Klein", Functionality:  "Alex Klein" })
}
```
