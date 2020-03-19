import { confirmationAction, notificationError } from 'utils/helpers';
import { TABLE_SIZE } from 'constants/table';
const PREFIX = 'SystemUsers';

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
      const result = await api.MrkAdminServiceClient.getMrkAlmexSysUserPage(token, filter);
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: {
          ...result,
          page: page
        }
      });
    } catch (error) {
      notificationError(error, 'getMrkAlmexSysUserPage');
      dispatch({ type: GET_DATA_FAILURE });
    }
  };
};

export const CREATE_OR_UPDATE_REQUEST = `${PREFIX}/CREATE_OR_UPDATE_REQUEST`;
export const CREATE_OR_UPDATE_SUCCESS = `${PREFIX}/CREATE_OR_UPDATE_SUCCESS`;
export const CREATE_OR_UPDATE_FAILURE = `${PREFIX}/CREATE_OR_UPDATE_FAILURE`;

export const createOrUpdate = values => {
  return async (dispatch, getState, api) => {
    dispatch({ type: CREATE_OR_UPDATE_REQUEST });
    try {
      const {
        auth: { token },
        systemUsers: { page }
      } = getState();
      await api.MrkAdminServiceClient.changeMrkSysUser(token, new MrkAlmexSysUser(values), values.password, null);
      dispatch({
        type: CREATE_OR_UPDATE_SUCCESS
      });
      dispatch(getData(page));
      return true;
    } catch (error) {
      notificationError(error, 'changeMrkSysUser');
      dispatch({ type: CREATE_OR_UPDATE_FAILURE });
      return false;
    }
  };
};

export const REMOVE_REQUEST = `${PREFIX}/REMOVE_REQUEST`;
export const REMOVE_SUCCESS = `${PREFIX}/REMOVE_SUCCESS`;
export const REMOVE_FAILURE = `${PREFIX}/REMOVE_FAILURE`;

export const remove = id => {
  return async (dispatch, getState, api) => {
    const fn = async () => {
      dispatch({ type: REMOVE_REQUEST });
      try {
        const {
          auth: { token },
          systemUsers: { page }
        } = getState();
        await api.MrkAdminServiceClient.changeMrkSysUser(token, null, null, id);
        dispatch({
          type: REMOVE_SUCCESS
        });
        dispatch(getData(page));
      } catch (error) {
        notificationError(error, 'changeMrkSysUser');
        dispatch({ type: REMOVE_FAILURE });
      }
    };
    confirmationAction(fn, null, null);
  };
};