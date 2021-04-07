##### 7. In `game.js`, Make sure your Click Function looks like this.
Now there is only two more things we need to do to make our bullets shoot, first check and make sure your **game.js** file has a `click` _method_ that looks like this:

{% capture code %}
click(x, y) {  
	g.sendAction('click', {x, y});
}
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}
