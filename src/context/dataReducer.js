import {
  FETCH_COUNTRYCASES,
  CLEAR_COUNTRYCASES,
  FETCH_DATAERROR,
  CLEAR_DATAERROR,
} from './constant';

const handleFetchCountryCases = (state, action) => {
  return {
    ...state,
    dataErrors: false,
    countryCases: action.payload,
  };
};
const handleClearCountryCase = state => ({
  ...state,
  countryCases: [],
});
const handleFetchDataError = (state, action) => ({
  ...state,
  dataErrors: action.payload,
});

const handleClearDataError = state => ({
  ...state,
  dataErrors: false,
});
const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_COUNTRYCASES:
      return handleFetchCountryCases(state, action);
    case CLEAR_DATAERROR:
      return handleClearDataError(state);
    case CLEAR_COUNTRYCASES:
      return handleClearCountryCase(state);
    case FETCH_DATAERROR:
      return handleFetchDataError(state, action);
    default:
  }
};

export default dataReducer;
