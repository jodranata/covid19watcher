import { FETCH_INITERROR, FETCH_INITIALDATA, INIT_LOADING } from './constant';

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
  initLoading: false,
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
    initLoading: false,
  };
};

const handleStartLoading = state => ({
  ...state,
  initLoading: true,
});

const initReducer = (state, action) => {
  switch (action.type) {
    // case FETCH_DATASUM:
    //   return handleInitialFetch(state, action);
    // case FETCH_YESTERDAYSUM:
    //   return handleYesterdayFetch(state, action);
    // case FETCH_GLOBALHISTORY:
    //   return handleGlobalHistoryFetch(state, action);
    // case FETCH_COUNTRIESLIST:
    //   return handleFetchCountriesList(state, action);

    case FETCH_INITIALDATA:
      return handleFetchInitialData(state, action);
    case INIT_LOADING:
      return handleStartLoading(state);
    case FETCH_INITERROR:
      return handleErrorFetch(state, action);

    default:
  }
};

export default initReducer;

// const handleFetchTest = (state, action) => ({
//   ...state,
//   test: action.payload,
// });
