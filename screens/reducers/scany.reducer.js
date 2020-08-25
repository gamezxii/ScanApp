import {
  ACTIVITYY_FETCHING,
  ACTIVITYY_SUCCESS,
  ACTIVITYY_FAILED,
  ACTIVITYY_REFRESH,
  ACTIVITYY_SEARCH,
} from '../components/constans';

const initialState = {
  isFetching: false,
  isError: false,
  isRefreshching: false,
  result: [],
  fulldata: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTIVITYY_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYY_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: false,
        result: payload,
        fulldata: payload,
      };
    case ACTIVITYY_REFRESH: {
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: true,
        result: payload,
        fulldata: payload,
      };
    }
    case ACTIVITYY_SEARCH: {
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: false,
        result: payload,
        fulldata: state.fulldata,
      };
    }
    default:
      return state;
  }
};
