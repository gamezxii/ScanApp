import {
  REPORT_FETCHING,
  REPORT_FAILED,
  REPORT_SUCCESS,
} from '../components/constans';
import axios from 'axios';

export const setStateToFetching = () => ({
  type: REPORT_FETCHING,
});

export const setStateToFailed = (payload) => ({
  type: REPORT_FAILED,
  payload,
});

export const setStateToSuccess = (payload) => ({
  type: REPORT_SUCCESS,
  payload,
});

export const search = (startDate, endDate, change) => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    handleSearch(dispatch, startDate, endDate, change);
  };
};

const handleSearch = async (dispatch, startDate, endDate, changeid) => {
  const url = 'https://fountaintreeresort.com/game/cashcard/Model/index.php';
  let params = new URLSearchParams();
  params.append('type', 'getSumActivityX');
  params.append('start_date', startDate);
  params.append('end_date', endDate);
  params.append('change', changeid);
  await axios
    .post(url, params)
    .then((res) => {
      const {data} = res.data;
      if (data.length > 0) {
        dispatch(setStateToSuccess(data));
      } else {
        dispatch(setStateToFailed('ไม่พบข้อมูล'))
      }
    })
    .catch((err) => {
      dispatch(setStateToFailed(err));
    });
};
