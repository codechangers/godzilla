import fork from './images/fork.png';
import signup from './images/signup.png';
import rename from './images/rename.png';
import invite from './images/invite.png';
import building from './images/building.png';
import cannotGet from './images/cannotGet.png';
import error1 from './images/502.png';
import error2 from './images/504.png';
import saveImageAs from './images/saveimageas.png';
import paDownload from './images/pa-download.png';
import paPngGif from './images/pa-pnggif.png';
import paSize from './images/pa-size.png';
import vctrUse from './images/vctr-use.png';
import vctrExport from './images/vctr-export.png';
import vctrPNG from './images/vctr-png.png';
import vctrSize from './images/vctr-size.png';
import vctrDownload from './images/vctr-download.png';
import replAsset from './images/replAsset.png';
import runningGame from './images/Running-Game.gif';
import soccerGame from './images/Blobbert-Game.gif';
import zombieGame from './images/Zombie-Game.gif';

const images = {
  fork,
  signup,
  rename,
  invite,
  building,
  cannotGet,
  error1,
  error2,
  runningGame,
  soccerGame,
  zombieGame,
  saveImageAs,
  paDownload,
  paPngGif,
  paSize,
  vctrUse,
  vctrExport,
  vctrPNG,
  vctrSize,
  vctrDownload,
  replAsset
};

export const resolveImg = imgPath => images[imgPath.replace('/images/', '')] || '#';

export default images;
