# Introduction

Navigate through these docs to learn how the implement the CodeChangers IO Game Library.

```javascript
// File: test.js
preload() {
  g.loadImage('players', /**{*/'logo.png'/*}[*/'hero.png'/*]*/);
  g.loadImage('enemies', /**{*/'badGuy.png'/*}[*/'zombie.png'/*]*/);
  g.loadImage('background', /**{*/'background.png'/*}[*/'skyline.png'/*]*/);
}
```

```javascript
preload() {
  g.loadImage('test', 'test.png');/*[*/
  g.loadImage('new', 'new.png');/*]*//*{*/
  g.loadImage('old', 'old.png');/*}*//*{*/
  g.loadImage('old2', 'old2.png');/*}*//*[*/
  g.loadImage('new1', 'new1.png');/*]*//*{*/
  g.loadImage('old3', 'old3.png');/*}*/
  g.loadImage('test2', 'test2.png');/*[*/
  g.loadImage('new2', 'new2.png');/*]*/
}
```
