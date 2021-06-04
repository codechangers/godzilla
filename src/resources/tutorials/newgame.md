# Upload Your Code

##### In order to see your project in action and to test it out, you need to upload it to a server.

The Code Contest platform allows you to run your games on a server so you can play online with your friends.

1. Click on the `Games` tab in the side bar.

2. Click the `New Game` button in the top bar.

You should now see the _Create a New Game_ form.

3. In the `Name` field, enter a name for your game.
    > Game names need to be all lowercase letters, no numbers, symbols, or spaces.

4. In the `Type` field, select **Default Template**.

5. In the `CodeFile` field, upload the zip file that you downloaded from _Repl_.

6. Finally, you can click the `SUBMIT` button to create your game!

![Upload code demo](/images/upload)

You should now see your game on the games screen. Before you can play your game, the server has to be built. This process can take a few minutes.

First, the server downloads the code, then it builds the code so it can run the game, then it sets up the project onto a url so it can connect to the game that is running. After that, you (and your friends) are able to connect to your game and play it by typing in the url on any computer!

> _If you see an error on your url, refresh the screen every once in a while until the full build process is complete._

> _You can see the build status by clicking the ? button on the status line._


### Errors

Here are the `error` codes that you will commonly find and how you should handle them:

#### Game Not Found
![Game Not Found](/images/building)

This will show up immediately after you create your game. It should take somewhere from 10 - 15 minutes for this to go away. After 15 minutes have passed, if this error is still present you should ask for help.

#### Cannot GET /

![Cannot Get /](/images/cannotGet)

This is the first error you will usually see, this just means your game is still being built on the server. If a few minutes has gone by, then you can assume that there is an error in your code that does not cause the server to crash.

#### 502
![Error 502](/images/error1)

You will usually see this after the game is being built, but before it's active on your url, you should only see this error for a couple of seconds. Refresh a couple times and it should be fixed. If you see this error for an extended period of time, it usually means there is an error in your code. You can restart your game on blobbert.io to double check if it is a code error. You will be able to tell, because if your game crashes again, then it is most likely a code error.

#### 504
![Error 504](/images/error2)

If you see this, contact us immediately, this means that there is an error with the io platform and it is an easy fix!

If you need help don't be afraid to contact us!
