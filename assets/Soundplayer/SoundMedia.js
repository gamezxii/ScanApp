const Sound = require('react-native-sound');
import notplay from './notplay.mp3';
import passplay from './passplay.mp3';
Sound.setCategory('Playback');

export const musicReady = new Sound(passplay, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

  musicReady.play((success) => {
    if (success) {
      console.log(`successfully finished playing`);
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
export const musicNoReady = new Sound(notplay, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

  musicNoReady.play((success) => {
    if (success) {
      console.log(`successfully finished playing`);
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
