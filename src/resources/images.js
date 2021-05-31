import fork from './images/fork.png';
import signup from './images/signup.png';
import signupbutton from './images/signupbutton.png';
import imagedrop from './images/imagedrop.png';
import imagecheck from './images/imagecheck.png';
import imgsfolder from './images/imgsfolder.png';
import rename from './images/repl-rename.gif';
import invite from './images/repl-invite.gif';
import replImages from './images/repl-images.gif';
import download from './images/repl-download.gif';
import upload from './images/create-game.gif';
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
  signupbutton,
  imagedrop,
  imagecheck,
  imgsfolder,
  rename,
  invite,
  download,
  upload,
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
  replAsset,
  replImages
};

export const resolveImg = imgPath => images[imgPath.replace('/images/', '')] || '#';

export default images;
