import {
  FETCH_DATASUM,
  FETCH_ERROR,
  FETCH_YESTERDAYSUM,
  FETCH_GLOBALHISTORY,
} from './constant';

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

// const handlePlaceDetailFetch = (state, action) => ({
//   ...state,
//   Places: {
//     ...state.Places,
//     detail: action.payload,
//   },
// });

const handleGlobalHistoryFetch = (state, action) => ({
  ...state,
  GlobalHistory: action.payload,
});

const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATASUM:
      return handleInitialFetch(state, action);
    case FETCH_YESTERDAYSUM:
      return handleYesterdayFetch(state, action);
    case FETCH_GLOBALHISTORY:
      return handleGlobalHistoryFetch(state, action);

    default:
  }
};

export default appReducer;
