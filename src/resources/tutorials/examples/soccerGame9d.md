##### 4. In `game.js`, Add an `if` statement so that when you click the moouse it will place a block.

{% capture code %}
if (g.canSend()) {
		g.sendAction('placeBlock', {x, y});
	}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
