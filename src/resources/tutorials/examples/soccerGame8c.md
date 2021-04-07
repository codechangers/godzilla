##### 3. in `room.js`, Create the Buy Actions in the `actions`.
{% capture code %}
	buy3: () => g.purchase(player, 'score', 3, 'block3s', 1),
	buy5: () => g.purchase(player, 'score', 4, 'block5s', 1),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
