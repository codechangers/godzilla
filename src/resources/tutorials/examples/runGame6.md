---
title: Set up Name Tags
subtitle: (Step 6/9) Set up name tags.
tags: [customize]
---
#### 1. Go into our `room.js` file and add an `attachTo` _function_  in our onJoin _function_ right after our `createACharacter` _function_.

{% capture code %}
g.attachTo('players', client.sessionId,  {
	name:  'nameTag',
	x:  -50,
	y:  -60,
	type:  'text',
	text: data.name
});
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

You can change where the name tag is created by changing the x and y values.

<hr class="uk-margin-medium">

>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able  to  use the name tags!**
