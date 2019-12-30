import { getJobsList } from '../services/jobs';

export default {
  namespace: 'jobs',
  state: {
    JobsList: [],
  },

  effects: {
    //查询招聘列表
    *getSetJobsList({}, { call, put }) {
      const response = yield call(getJobsList);
      yield put({
        type: 'SaveJobsList',
        payload: response,
      });
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
