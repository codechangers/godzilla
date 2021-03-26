---
title: Add a Background
subtitle: (Step 1/9) Learn how to add a background to your game!
tags: [customize]
---
#### Find an Image for the Background of your game

##### 1. Upload an Image to the Assets Folder
 First, make sure that you have the image that you want for your background added to your asset folder ([Need Help?](/tutorials/images/)).

##### 2. In `game.js`, Add `loadImage` into the preload() function

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qoq2ZgZPfbw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}g.loadImage('background',  'background.png');{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 3. In `game.js`, Add `drawBackground` function in the `create ` function

<iframe width="560" height="315" src="https://www.youtube.com/embed/sGJIb31VSkw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}g.drawBackground( 'background',  3,  500,  2000 );{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 4. In `game.js`, Delete `cameraBounds` method
In `game.js`, **delete** the `cameraBounds()` method.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MZolDaJH0wg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}g.cameraBounds(){% endcapture %}
{% include code.html copyable=false code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 5. In `room.js`, Change the game width in the top of the file from 2000 to 600.

<iframe width="560" height="315" src="https://www.youtube.com/embed/FkYavSuOwCk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}const GAME_WIDTH = 600;{% endcapture %}
{% include code.html copyable=false code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

##### 6. In `room.js`, Change the numbers in our `createACharacter `function in our `onJoin` function in the `room.js` file and add a couple new variables.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RudU-cO2vvU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

{% capture code %}g.createACharacter('players', client.sessionId,  { x:  270, y:  1990, safe:  false, speed:  5, spriteName:  "players"  });{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  your game board should be set up!**
