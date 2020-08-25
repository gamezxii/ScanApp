import {
  ACTIVITYX_FETCHING,
  ACTIVITYX_SUCCESS,
  ACTIVITYX_FAILED,
  ACTIVITYX_REFRESH,
  ACTIVITYX_SEARCH,
} from '../components/constans';
import axios from 'axios';
import {getAPIX} from '../../assets/until';
import _ from 'lodash';

export const setStateToFetching = () => ({
  type: ACTIVITYX_FETCHING,
});

export const setStateToReFreshching = () => ({
  type: ACTIVITYX_REFRESH,
});

export const setStateToFailed = (payload) => ({
  type: ACTIVITYX_FAILED,
  payload,
});

export const setStateToSuccess = (payload) => ({
  type: ACTIVITYX_SUCCESS,
  payload,
});

export const setStateToSearch = (payload) => ({
  type: ACTIVITYX_SEARCH,
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

export const handlesearch = (data) => {
  return (dispatch) => {
    dispatch(setStateToSearch(data));
  };
};

const doFeed = async (dispatch) => {
  await axios
    .get(getAPIX)
    .then((res) => {
      const {activity} = res.data;
      dispatch(setStateToSuccess(activity));
    })
    .catch((err) => {
      dispatch(setStateToFailed(err));
    });
};
