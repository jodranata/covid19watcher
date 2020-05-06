import { FETCH_DATASUM, FETCH_ERROR, FETCH_YESTERDAYSUM } from './constant';

const handleInitialFetch = (state, action) => {
  const {
    payload: { Global, Countries, Date },
  } = action;
  return {
    ...state,
    Global,
    Countries,
    UpdateDate: Date,
  };
};

const handleYesterdayFetch = (state, action) => ({
  ...state,
  YesterdayGlobal: action.payload[0],
});

const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATASUM:
      return handleInitialFetch(state, action);
    case FETCH_YESTERDAYSUM:
      return handleYesterdayFetch(state, action);
    default:
  }
};

export default appReducer;
