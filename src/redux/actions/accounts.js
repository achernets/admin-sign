import { notificationError } from 'utils/helpers';
import { TABLE_SIZE } from 'constants/table';

const PREFIX = 'Accounts';

export const GET_DATA_REQUEST = `${PREFIX}/GET_DATA_REQUEST`;
export const GET_DATA_SUCCESS = `${PREFIX}/GET_DATA_SUCCESS`;
export const GET_DATA_FAILURE = `${PREFIX}/GET_DATA_FAILURE`;

export const getData = (page = 1) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_DATA_REQUEST });
    try {
      const {
        auth: { token }
      } = getState();
      const filter = new KazFilter({
        position: page * TABLE_SIZE - TABLE_SIZE,
        countFilter: TABLE_SIZE,
        orders: [],
        items: []
      });
      const result = await api.MrkAdminServiceClient.getMrkAggregateAccountInfoPage(token, filter);
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: {
          ...result,
          page: page
        }
      });
    } catch (error) {
      notificationError(error, 'getMrkAggregateAccountInfoPage');
      dispatch({ type: GET_DATA_FAILURE });
    }
  };
};