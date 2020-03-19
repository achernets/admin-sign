import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} from 'redux/actions/systemUsers';

const initialState = {
  data: [],
  count: 0,
  page: 1,
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.almexUsersData,
        count: action.payload.count,
        page: action.payload.page,
        isFetching: false
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
