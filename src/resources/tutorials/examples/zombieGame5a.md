# Zombie Game - 5.A

## Customize the login screen.

**(Step 1/3)** Customize the login screen interface.

### Custom login screen.

In `game.js`, we can customize the login screen by adding a couple of different options to our `useLoginScreen` _function_ in the `create` _method_.

The first option controls the `title` of the login screen. This is set to **IO Game** by default.

The second option controls the `input` placeholder. This is set to **Display Name** by default.

The third options controls the `submit` button. This is set to **START** by default.

``` javascript
// File: game.js
// Copy
g.useLoginScreen(name => g.connect ({name}), 'Zombies', 'Survivor Name', 'Start!');
// End Copy
create() {
	g.setupKeys(keys);
	g.useLoginScreen((name) => g.connect({ name })/*[*/, 'Zombies', 'Survivor Name', 'Start!'/*]*/);
	g.useStore('The Store', []);
	g.drawBackground('background');
	g.getCharacters('players', (player) => {
		if (player.id === g.myId()) {
			g.cameraFollow(player.sprite);
		}
	});
	g.getCharacters('zombies');
	g.getCharacters('bullets');
}
```
