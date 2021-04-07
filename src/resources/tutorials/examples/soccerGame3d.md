##### 4. Add a player select Screen in `game.js` after the `useLoginScreen()` function.

{% capture code %}
	g.usePlayerSelectScreen({
		blobbert: 'circle1.png',
		grunch: 'circle2.png',
		neon: 'circle3.png',
		nimbo: 'circle4.png',
		tangles: 'circle5.png',
	});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
