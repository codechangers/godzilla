import soccerTest from './codeImgs/test_soccer.png';

/**
 * Double Check Code Image Exports.
 * ----
 * Format:
 *  { PageName0: [gameCode, roomCode] }
 *
 * Info:
 *  The key is simple the page it should be used on without
 *  any spaces or symbols. So if you are adding images to
 *  the "Run Game 1 ✓" page, your key would be "RunGame1".
 *  This allows the images to be automatically imported
 *  when you use the {% doublecheck %} tag on that page.
 */
const codeImgs = {
  RunGame1: [soccerTest, soccerTest]
};

export default codeImgs;
