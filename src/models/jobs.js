import { getJobsList, delJobsList } from '../services/jobs';

export default {
  namespace: 'jobs',
  state: {
    JobsList: [],
  },

  effects: {
    //查询招聘列表
    *getSetJobsList({ payload }, { call, put }) {
      const response = yield call(getJobsList, payload);
      yield put({
        type: 'SaveJobsList',
        payload: response,
      });
    },

    //删除招聘
    *getDelJobsList({ payload, callBack }, { call, put }) {
      const response = yield call(delJobsList, payload);
      if (response) {
        callBack(response);
      }
    },
  },

  reducers: {
    SaveJobsList(state, action) {
      return {
        ...state,
        JobsList: action.payload,
      };
    },
  },
};
