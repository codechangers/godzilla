##### 5. In `game.js` Add a check so we know if the game is over.

{% capture code %}
},
	() => {},
	(id, attr, value) => {
		if (id === g.myId() && attr === 'lives' && value <= 0) {
			location.reload();
		}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
