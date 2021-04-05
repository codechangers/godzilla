import fork from './images/fork.png';

const images = {
  fork
};

export const resolveImg = imgPath => images[imgPath.replace('/images/', '')] || '#';

export default images;
