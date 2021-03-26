---
title: Set up Scoring
subtitle: (Step 7/9) Set up a scoring system.
tags: [customize]
---
#### 1. Go to the `room.js` file and put a `setupCharacters` _function_ in the `onInit` _function_.

{% capture code %}
g.setupCharacters("team");
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

#### 2. In the `game.js` file we need to put an `addCharacters` _function_ in the `init` _function_.

{% capture code %}
g.addCharacters("team")
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

#### 3. In `game.js`, Add a `getCharacters` function in the create _function_.

{% capture code %}
g.getCharacters("team")
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/client/src/game.js" %}

<hr class="uk-margin-medium">

#### 4. Go into our `room.js` file in the onInit function and use a `createACharacter` _function_ to create our team character.

{% capture code %}
g.createACharacter('team',  'team',  { x:  10000, y:  10000, name:  'Level', score:  1  });
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

#### 5. In the `room.js` file in the `onInit` function in the third `createALocation` function that we wrote, we'll tell the score to up, and the difficulty to increase.

{% capture code %}
let team = g.getACharacter('team',  'team')
team.score +=  1
g.getAllCharacters('enemy', enemy =>  { g.deleteACharacter('enemy', enemy.id)  })
for  (i =  0; i < team.score +  15; i++)  { g.createACharacter('enemy', g.nextCharacterId('enemy'),  { x: Math.floor((Math.random()  *  500)  +  1), y: Math.floor((Math.random()  *  1900)  +  1), right:  true  })  }
{% endcapture %}
{% include code.html copyable=true code=code lang="javascript" file="code/server/rooms/room.js" %}

<hr class="uk-margin-medium">

>  **Download  your  zip,  and  [upload  it](/tutorials/uploadtoserver/)  to  [blobbert.io](https://blobbert.io/),  and  you  should  be  able to complete levels for score!**
