## 1. Add locations in game.js
To set up a location we will need to do almost the same thing as setting up characters but we’re going to use Location functions instead. So we first go into our **game.js** file and use an `addLocations` _function_ in the 
```javascript  
init() {
	g.addLocations(‘safeZone’);  
}
```  
Then, still in the **game.js** file in the create _function_ we will use a `getLocations` _function_ functions.  
```javascript  
create() {
	g.getLocations(‘safeZone’);  
}
```  
## 2. Add locations in the room.js
Then we will move into our **room.js** file in our `onInit` _method_ and use a `setupLocations` _function_.
```javascript  
onInit() {
	g.setupLocations(‘safeZone’);  
}
```  
Now we can use a `createLocations` _function_ anywhere in our **room.js** in this example we are just going to create a location at the beginning of our game in the `onInit` _method_ as well under the `getLocations` _function_.  
```javascript  
onInit() {
	...
	g.createALocation('safeZone', g.nextLocationId('safeZone'), { x: -47, y: 1940, width: 670, height: 100 }, '6cdc00', player => {  
		player.safe = true;  
	})
} 
```
For this example it could make all players that are standing in this location be safe from getting killed.

Now we will go into our `onUpdate` _method_ in the **room.js** file and add a `handleLocations` _function_. This will make our Location start working for a certain type of characters.
```javascript  
onUpdate() {  
	g.handleLocations('safeZone', 'players');  
}
```

