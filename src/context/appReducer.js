import {
  FETCH_DATASUM,
  FETCH_ERROR,
  FETCH_YESTERDAYSUM,
  FETCH_GLOBALHISTORY,
  FETCH_COUNTRIESLIST,
  FETCH_INITIALDATA,
  FETCH_TEST,
} from './constant';

// const handleInitialFetch = (state, action) => {
//   // sumRes
//   const {
//     payload: { Global, Countries, Date },
//   } = action;
//   return {
//     ...state,
//     Global,
//     Countries,
//     UpdateDate: Date,
//   };
// };

// const handleYesterdayFetch = (state, action) => ({
//   // yesSumRes
//   ...state,
//   YesterdayGlobal: action.payload[0],
// });

// const handleGlobalHistoryFetch = (state, action) => ({
//   // globalDetailRes
//   ...state,
//   GlobalHistory: action.payload,
// });

// const handleFetchCountriesList = (state, action) => ({
//   // countriesList
//   ...state,
//   CountriesList: action.payload,
// });

const handleErrorFetch = (state, action) => ({
  ...state,
  Errors: action.payload,
});

const handleFetchInitialData = (state, action) => {
  const {
    payload: { todayRes, yesRes, countriesRes, globalHisRes },
  } = action;

  return {
    ...state,
    todaySum: todayRes,
    yesterdaySum: yesRes,
    countriesCases: countriesRes,
    globalHis: globalHisRes,
  };
};

const handleFetchTest = (state, action) => ({
  ...state,
  test: action.payload,
});
const appReducer = (state, action) => {
  switch (action.type) {
    // case FETCH_DATASUM:
    //   return handleInitialFetch(state, action);
    // case FETCH_YESTERDAYSUM:
    //   return handleYesterdayFetch(state, action);
    // case FETCH_GLOBALHISTORY:
    //   return handleGlobalHistoryFetch(state, action);
    // case FETCH_COUNTRIESLIST:
    //   return handleFetchCountriesList(state, action);
    case FETCH_TEST:
      return handleFetchTest(state, action);
    case FETCH_INITIALDATA:
      return handleFetchInitialData(state, action);
    case FETCH_ERROR:
      return handleErrorFetch(state, action);

    default:
  }
};

export default appReducer;
