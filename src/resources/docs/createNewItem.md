# createNewItem()

This method is used to create an item that will be available in your game.

## Parameters

**type**: `string` - the type of item to create

**image**: `string` - the relative path to the image of this item

**cb**: `function` - the code that runs when an item is used. This function returns some important things.

- **character**: `object` - the character that used the item
- **data**: `object` - any information being passed to the function
- **actions**: `functions` - 3 functions that you can use to give the item an in game ability they are
  - **swingItem()**
    -Swings the item
  - **placeItem(x, y)**
    -Places the item either where you are holding it or at a certain place.
    - **x**: `int` - x position of where you want to place it.
    - **y:** `int` - y position of where you want to place it.
  - **throwItem**(x, y, range, speed)
    -Throws the item towards a point.
    - **x**: `int` - the x position you want to throw the item towards.
    - **y**: `int` - the y position you want to throw the item towards.
    - **range**: `int` - how far you want the item to move.
    - **speed**: `int` - how fast you want the item to move.

## Returns

**Nothing**

## Usage

You can use this method at any point in time. You should use it when you are ready to create an item for your game.

## Examples

### 1.

```
/Link code/server/rooms/room.js
onInit() {
	g.createNewItem("heart", "heart.png", (player) => {
		player.healthBar.filled += 10;
	});
}
```

### 2.

```
/Link code/server/rooms/room.js
onInit() {
	g.createNewItem("heart", "heart.png", (player, data, actions) => {
		actions.swingItem();
	});
}
```

### 3.

```
/Link code/server/rooms/room.js
onInit() {
	g.createNewItem("heart", "heart.png", (player, data, actions) => {
		actions.placeItem();
	});
}
```

### 4.

```
/Link code/server/rooms/room.js
onInit() {
	g.createNewItem("heart", "heart.png", (player, data, actions) => {
		actions.throwItem(data.x, data.y);
	});
}
```
