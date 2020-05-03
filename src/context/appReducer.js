import { FETCH_DATASUM, FETCH_ERROR } from './constant';

const handleInitialFetch = (state, action) => ({
  ...state,
  Global: action.payload.Global,
  Countries: action.payload.Countries,
});

const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATASUM:
      return handleInitialFetch(state, action);
    default:
  }
};

export default appReducer;
