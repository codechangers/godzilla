# getAllCharacters()

This method will get all the characters of a certain character type and allow you to use a callback function to complete an action for each of them.

## Parameters

**type**: `string` - The type of characters that you want to get.

**cb** : `function` - What you want to happen to each of these characters.

## Returns

**Nothing**

## Usage

You can use this function once you have created a character set in your game. You should use it when you need something to happen to all the characters in a character set.

## Examples

### 1.

```
// File: code/server/rooms/room.js
onLeave(client){
g.getAllCharacters('enemy', enemy  => {
	g.deleteACharacter('enemy', enemy.id)
})
}
```
