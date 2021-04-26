import { gameTypes, gameNames, serverReqs, gameNameBlackList } from './globals';
import { db, ref, auth } from './firebase';

export const codeInfo = codeString => {
  const parts = codeString.split('/');
  const file = parts[parts.length - 1];
  const [date, time, name, extension] = file.split('.');
  return {
    date,
    time,
    name,
    extension
  };
};

export const checkInput = game => {
  let valid = true;
  let error = '';
  if (gameNameBlackList.includes(game.name)) {
    valid = false;
    error = '1|Invalid Name! You cannot use reserved names.';
  } else if (game.name.length < 2) {
    valid = false;
    error = '1|Invalid Name! Must be at least two characters.';
  } else if (game.name.length > 30) {
    valid = false;
    error = '1|Invalid Name! Must be no more than 30 characters.';
  } else if (!game.name.match(gameNames)) {
    valid = false;
    error = '1|Invalid Name! Only lowercase letters allowed.';
  } else if (game.type === '' || !Object.keys(gameTypes).includes(game.type)) {
    valid = false;
    error = '2|You must select a valid Type!';
  } else if (!game.code && (game.file === null || !(game.file instanceof File))) {
    valid = false;
    error = '3|Code Upload is required!';
  }
  return [valid, error];
};

export const uploadCode = (game, onSuccess, onFail = () => {}) => {
  const now = new Date();
  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
  const userRef = ref.child(auth.currentUser.uid);
  const subRef = userRef.child(game.name);
  const fileRef = subRef.child(`${date}.${time}.${game.file.name}`);
  fileRef
    .put(game.file)
    .then(snap => {
      if (snap.state === 'success') {
        onSuccess(fileRef);
      } else {
        console.log(snap);
        onFail(snap);
      }
    })
    .catch(err => {
      console.error(err);
      onFail(err);
    });
};

export const downloadCode = code => {
  // TODO: Download without opening new window
  const path = code.replace(`${process.env.REACT_APP_ENV}/`, '');
  ref
    .child(path)
    .getDownloadURL()
    .then(url => {
      window.open(url, '_blank');
    });
};

export const makeRequest = (req, game) => {
  if (serverReqs.includes(req)) {
    const requests = game.requests || [];
    if (!requests.includes(req)) {
      requests.push(req);
      db.collection('games')
        .doc(game.id)
        .update({
          requests
        })
        .catch(err => console.error(err));
    }
  }
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];
export const dateStr = date => {
  const m = months[date.getMonth()];
  const d = date.getDate();
  const y = date.getFullYear();
  return `${m} ${d}, ${y}`;
};

export const timeStr = date => {
  let hr = date.getHours() % 12;
  hr = hr === 0 ? 12 : hr;
  const mn = date.getMinutes();
  const buff = mn < 10 ? '0' : '';
  const a = date.getHours() < 12 || date.getHours() === 24 ? 'am' : 'pm';
  return `${hr}:${buff}${mn}${a}`;
};

export const codeDate = code => {
  const { date, time } = codeInfo(code);
  return Date(`${date} ${time}`);
};

export const codeTime = code => {
  /*            sec  min   hr   msec */
  const oneDay = 60 * 60 * 24 * 1000;
  const date = new Date(codeDate(code));
  return Date.now() - date > oneDay ? dateStr(date) : timeStr(date);
};

export const getGameStatus = game => {
  let isReady = true;
  let didFail = false;
  const stats = { ...game.game_status, ...game.server_status };
  Object.values(stats).forEach(stat => {
    if (stat !== 2) isReady = false;
    if (stat === 3) didFail = true;
  });
  return [isReady, didFail];
};

export const statusLine = (isReady, didFail) => {
  if (didFail) return 'Your build failed';
  if (isReady) return 'Your game is ready';
  return 'Building your game';
};
