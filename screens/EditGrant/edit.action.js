import {
  RETURN_RIGHT_FAILED,
  RETURN_RIGHT_FETCHING,
  RETURN_RIGHT_SUCCESS,
  RETURN_RIGHT_UPLOADED_SUCCESS,
} from '../components/constans';
import axios from 'axios';
import {Model} from '../../assets/until';

export const setStateToFetching = () => ({
  type: RETURN_RIGHT_FETCHING,
});

export const setStateToFailed = (payload) => ({
  type: RETURN_RIGHT_FAILED,
  payload,
});

export const setStateToSuccess = (payload) => ({
  type: RETURN_RIGHT_SUCCESS,
  payload,
});

export const setStateToUploadedSuccess = (payload) => ({
  type: RETURN_RIGHT_UPLOADED_SUCCESS,
  payload,
});

export const uploaded = (customerid, idactivity, timestamp) => {
  return (dispatch) => {
    douploaded(dispatch, customerid, idactivity, timestamp);
  };
};

export const feedData = (customerid) => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doFeed(dispatch, customerid);
  };
};

const douploaded = async (dispatch, customerid, idactivity, timestamp) => {
  dispatch(setStateToFetching());
  const params = new URLSearchParams();
  params.append('type', 'updateReinstate');
  params.append('groupid_no', customerid);
  params.append('idactivity', idactivity);
  params.append('time', timestamp);
  await axios
    .post(Model, params)
    .then((res) => {
      const {message} = res.data;
      dispatch(setStateToUploadedSuccess(message));
      dispatch(feedData(customerid));
    })
    .catch((err) => {
      dispatch(setStateToFailed(err));
    });
};

const doFeed = async (dispatch, customerid) => {
  const params = new URLSearchParams();
  params.append('type', 'list_historyCustomer');
  params.append('customerid', customerid);
  await axios
    .post(Model, params)
    .then((res) => {
      let result = res.data;
      if (result.error !== false) {
        dispatch(setStateToSuccess(result.message));
      } else {
        dispatch(setStateToFailed(result.message));
      }
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};
