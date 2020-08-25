import {
  ACTIVITYY_FETCHING,
  ACTIVITYY_SUCCESS,
  ACTIVITYY_FAILED,
  ACTIVITYY_REFRESH,
  ACTIVITYY_SEARCH,
} from '../components/constans';
import axios from 'axios';
import {getApiY} from '../../assets/until';

export const setStateToFetching = () => ({
  type: ACTIVITYY_FETCHING,
});

export const setStateToReFreshching = () => ({
  type: ACTIVITYY_REFRESH,
});

export const setStateToFailed = (payload) => ({
  type: ACTIVITYY_FAILED,
  payload,
});

export const setStateToSuccess = (payload) => ({
  type: ACTIVITYY_SUCCESS,
  payload,
});

export const setStateToSearch = (payload) => ({
  type: ACTIVITYY_SEARCH,
  payload,
});

export const feed = () => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doFeed(dispatch);
  };
};

export const refreshing = () => {
  return (dispatch) => {
    dispatch(setStateToReFreshching());
    doFeed(dispatch);
  };
};

export const handleSearch = (data) => {
  return (dispatch) => {
    dispatch(setStateToSearch(data));
  };
};

const doFeed = async (dispatch) => {
  await axios
    .get(getApiY)
    .then((response) => {
      const {activity} = response.data;
      dispatch(setStateToSuccess(activity));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};
