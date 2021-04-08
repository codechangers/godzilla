# Introduction

Navigate through these docs to learn how the implement the CodeChangers IO Game Library.

# Typing

Typing is super easy with this new custom plugin!

**Options:**

- Start adding new code: /*[*/
- Stop adding new code: /*]*/
- Start removing old code: `/*{*/`
- Stop removing old code: `/*}*/`
- Replace conjunction: `/*}[*/`

> **note:** replace is used to combine removing and adding into one middle statement! But it has some quirks:

## Replace issues

### Working

You can add and remove all you want after using replace!

```javascript
// File: test.js
preload() {
  g.loadImage('players', /*{*/'logo.png'/*}[*/'hero.png'/*]*/);
  g.loadImage('enemies', /*{*/'badGuy.png'/*}[*/'zombie.png'/*]*/);
  g.loadImage('background', /*{*/'background.png'/*}[*/'skyline.png'/*]*/);/*[*/
  g.loadImage('new', 'new.png');/*]*//*{*/
  g.loadImage('old', 'old.png');/*}*/
}
```

### Broken

Don't add a replace after you have done a separate add and remove.

```javascript
preload() {
  g.loadImage('players', 'logo.png');/*{*/
  g.loadImage('new', 'new.png');/*}*//*[*/
  g.loadImage('old', 'old.png');/*]*/
  g.loadImage('soCool', /*{*/'noItsNot.png'/*}[*/'yesItIs.png'/*]*/);
}
```
