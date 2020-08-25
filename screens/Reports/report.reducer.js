import {
  REPORT_FETCHING,
  REPORT_FAILED,
  REPORT_SUCCESS,
} from '../components/constans';

const initialState = {
  isFetching: false,
  isError: false,
  isToast: false,
  result: [],
  message: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REPORT_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: null,
        isToast: false,
        message: null,
      };
    case REPORT_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        result: null,
        isToast: true,
        message: payload,
      };
    case REPORT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        isToast: false,
        message: null,
      };

    default:
      return state;
  }
};
