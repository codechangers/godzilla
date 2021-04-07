###### 2. In `room.js`, Add `setupCharacters()` in the `onInit()` function to add zombies.

{% capture code %}
	g.setupCharacters('zombies', 0.5);
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/room.js" %}
