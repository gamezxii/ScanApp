import {
  ACTIVITYX_FETCHING,
  ACTIVITYX_SUCCESS,
  ACTIVITYX_FAILED,
  ACTIVITYX_REFRESH,
  ACTIVITYX_SEARCH,
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
    case ACTIVITYX_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYX_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYX_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: false,
        result: payload,
        fulldata: payload,
      };
    case ACTIVITYX_REFRESH: {
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: true,
        result: payload,
        fulldata: payload,
      };
    }
    case ACTIVITYX_SEARCH: {
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
