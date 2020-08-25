import {
  UPLOAD_FAILED,
  UPLOAD_FETCHING,
  UPLOAD_SUCCESS,
  SHOW_TOAST,
} from '../components/constans';

const initialState = {
  isFetching: false,
  isError: false,
  isToast: false,
  result: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPLOAD_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isToast: false,
        result: null,
      };
    case UPLOAD_FAILED:
      return {
        ...state,
        isFetching: false,
        isToast: false,
        isError: true,
        result: payload,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        isToast: false,
      };

    case SHOW_TOAST:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        isToast: true,
      };

    default:
      return state;
  }
};
