import fork from './images/fork.png';
import signup from './images/signup.png';
import rename from './images/rename.png';
import invite from './images/invite.png';
import building from './images/building.png';
import cannotGet from './images/cannotGet.png';
import error1 from './images/502.png';
import error2 from './images/504.png';
import replAsset from './images/replAsset.png';
import runninggame from './images/Running-Game.gif';

const images = {
  fork,
  signup,
  rename,
  invite,
  building,
  cannotGet,
  error1,
  error2,
  replAsset,
  runninggame
};

export const resolveImg = imgPath => images[imgPath.replace('/images/', '')] || '#';

export default images;
