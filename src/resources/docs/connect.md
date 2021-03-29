# connect()

This method will connect the player to the server, and send the server any data needed, as the player is connecting.
​

## Parameters

​
**data** `object` - any data that the server needs when a player connects.
​

## returns

**Nothing**
​

## Usage

Every game should use this method in order to connect to the server.

# Examples

### Example 1

```
//File code/client/src/game.js
​
create() {
	g.connect();
	...
}
```

### Example 2

```
//File code/client/src/game.js
​
create() {
	g.connect({worldData:2, grains:50});
	...
}
```
