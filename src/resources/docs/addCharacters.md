# addCharacters()

This method can be used to create a new set of characters for your game to use.

## Parameters

**type**: `string` - The type of character that you want to create.

**scale**: `number` - The scale of the sprite, ie. 0.5 for half size, or 2 for twice the size.

## Returns

**Nothing**

## Usage

This method can be used at any point in time. It should be used to create players, enemies, pets, or any other type of character you would like to create in the game.

## Examples

### Example 1

```
// File: code/client/src/game.js

init(){
    g.setup(this);
    g.addCharacters('players', .5);
}
```
