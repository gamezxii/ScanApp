import {
  ACTIVITYZ_FETCHING,
  ACTIVITYZ_SUCCESS,
  ACTIVITYZ_FAILED,
  ACTIVITYZ_REFRESH,
  ACTIVITYZ_SEARCH,
} from '../components/constans';
import axios from 'axios';
import {getAPIZ} from '../../assets/until';
import _ from 'lodash';

export const setStateToFetching = () => ({
  type: ACTIVITYZ_FETCHING,
});

export const setStateToReFreshching = () => ({
  type: ACTIVITYZ_REFRESH,
});

export const setStateToFailed = (payload) => ({
  type: ACTIVITYZ_FAILED,
  payload,
});

export const setStateToSuccess = (payload) => ({
  type: ACTIVITYZ_SUCCESS,
  payload,
});

export const setStateToSearch = (payload) => ({
  type: ACTIVITYZ_SEARCH,
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
    .get(getAPIZ)
    .then((res) => {
      const {activity} = res.data;
      dispatch(setStateToSuccess(activity));
    })
    .catch((err) => {
      dispatch(setStateToFailed(err));
    });
};
