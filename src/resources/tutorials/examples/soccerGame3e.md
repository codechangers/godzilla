##### 5. In `game.js` change the Login Screen code and replace it with the following code.

{% capture code %}
	g.useLoginScreen((name, spriteName) => g.connect({ name, spriteName }));
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
