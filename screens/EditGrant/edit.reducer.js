import {
  RETURN_RIGHT_FAILED,
  RETURN_RIGHT_FETCHING,
  RETURN_RIGHT_SUCCESS,
  RETURN_RIGHT_UPLOADED_SUCCESS,
} from '../components/constans';
const initialState = {
  isFetching: false,
  isError: false,
  result: null,
  message: null,
  isToast: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case RETURN_RIGHT_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: null,
        message: null,
        isToast: false,

      };
    case RETURN_RIGHT_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        result: null,
        message: payload,
        isToast: true,
      };
    case RETURN_RIGHT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        message: null,
        isToast: false,
      };
    case RETURN_RIGHT_UPLOADED_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: null,
        message: payload,
        isToast: true,
      };
    default:
      return state;
  }
};
