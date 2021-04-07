##### 2. in `game.js`, Add `StoreItem`'s inside the `useStore` function.

{% capture code %}
		new g.StoreItem('block3.png', '3 Block', 'Points', 3, 'buy3'),
		new g.StoreItem('block5.png', '5 Block', 'Points', 4, 'buy5'),
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
