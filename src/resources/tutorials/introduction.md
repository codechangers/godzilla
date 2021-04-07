# Introduction

Navigate through these docs to learn how the implement the CodeChangers IO Game Library.

```javascript
// File: test.js
preload() {
  g.loadImage('players', /*{*/'logo.png'/*}[*/'hero.png'/*]*/);
  g.loadImage('enemies', /*{*/'badGuy.png'/*}[*/'zombie.png'/*]*/);
  g.loadImage('background', /*{*/'background.png'/*}[*/'skyline.png'/*]*/);
}
```

```javascript
preload() {
  g.loadImage('text', 'test.png');/*{*/
  g.loadImage('old', 'old.png');/*}*/
}
```

```javascript
preload() {
  g.loadImage('text', 'test.png');/*[*/
  g.loadImage('new', 'new.png');/*]*/
}
```
