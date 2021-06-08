# 5. Setup Login Screen
 (Step 3/4)

##### 3. In `room.js`, we need to add a starting score to our `createACharacter` _function_ inside the `onJoin` method.

``` javascript
// File: code/server/rooms/room.js
// Copy
g.createACharacter('players', client.sessionId, { x, y, score: 0, ...data });
// End Copy
onJoin(client, data) {
    const x = Math.floor(Math.random() * GAME_WIDTH);
    const y = Math.floor(Math.random() * GAME_HEIGHT);
    g.createACharacter('players', client.sessionId, { x, y,/*[*/ score: 0,/*]*/ ...data });
    g.attachTo('players', client.sessionId, {
        name: 'healthBar',
        x: -50,
        y: 40,
        width: 100,
        height: 10,
        type: 'bar',
        filled: 100
    });
    g.attachTo('players', client.sessionId, {
        name: 'nameTag',
        x: -50,
        y: -60,
        type: 'text',
        text: data.name
    });
}
```

