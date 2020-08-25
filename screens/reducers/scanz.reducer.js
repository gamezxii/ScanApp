import {
  ACTIVITYZ_FETCHING,
  ACTIVITYZ_SUCCESS,
  ACTIVITYZ_FAILED,
  ACTIVITYZ_REFRESH,
  ACTIVITYZ_SEARCH,
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
    case ACTIVITYZ_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYZ_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        isRefreshching: false,
        result: null,
        fulldata: null,
      };
    case ACTIVITYZ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: false,
        result: payload,
        fulldata: payload,
      };

    case ACTIVITYZ_REFRESH:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: true,
        result: payload,
        fulldata: payload,
      };
    case ACTIVITYZ_SEARCH:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRefreshching: false,
        result: payload,
        fulldata: state.fulldata,
      };

    default:
      return state;
  }
};
