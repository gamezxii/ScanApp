import {
  UPLOAD_FETCHING,
  UPLOAD_FAILED,
  UPLOAD_SUCCESS,
  SHOW_TOAST,
} from '../components/constans';
import axios from 'axios';
import {ApiScan} from '../../assets/until';
import {dateValue} from '../components/getTime';
import {musicNoReady, musicReady} from '../../assets/Soundplayer/SoundMedia';

export const setStateToUploadShowToast = (payload) => ({
  type: SHOW_TOAST,
  payload,
});

export const setStateToUploadFetching = () => ({
  type: UPLOAD_FETCHING,
});

export const setStateToUploadFailed = (payload) => ({
  type: UPLOAD_FAILED,
  payload,
});

export const setStateToUploadSuccess = (payload) => ({
  type: UPLOAD_SUCCESS,
  payload,
});

export const feed = (type, customerid, activityid, nameactivity) => {
  return (dispatch) => {
    dispatch(setStateToUploadFetching());
    upLoaded(type, customerid, activityid, nameactivity, dispatch);
  };
};

const currentTime = () => {
  let getHours = new Date().getHours();
  let getMin = new Date().getMinutes();
  let getSecon = new Date().getSeconds();

  getMin < 10 ? (getMin = '0' + getMin) : getMin;
  const HoursOrtime = `${getHours}:${getMin}:${getSecon}`;
  return HoursOrtime;
};

const upLoaded = async (
  type,
  customerid,
  activityid,
  nameactivity,
  dispatch,
) => {
  const tiems = currentTime();
  let params = new URLSearchParams();
  params.append('cus_id', customerid);
  params.append('idactivity', activityid);
  params.append('date', dateValue);
  params.append('timestamp', tiems);
  const url = ApiScan + type;

  await axios
    .post(url, params)
    .then((res) => {
      const data = res.data;
      const opator = 'สามารถเล่นได้';

      if (data.error === false) {
        let messages = data.activity;
        const message = messages.find((el) => el);

        if (message.message === opator) {
          dispatch(setStateToUploadShowToast(message.message));
          musicReady.stop(() => {
            musicReady.play();
          });
        } else {
          dispatch(setStateToUploadShowToast(message.message));
          musicNoReady.stop(() => {
            musicNoReady.play();
          });
        }
        dispatch(setStateToUploadSuccess(message.message));
      } else {
        dispatch(setStateToUploadShowToast(data.message));
        musicNoReady.stop(() => {
          musicNoReady.play();
        });
        dispatch(setStateToUploadSuccess(data.message));
      }
    })
    .catch((err) => {
      dispatch(setStateToUploadFailed(err));
    });
};
