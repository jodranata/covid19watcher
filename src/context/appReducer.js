import { FETCH_DATASUM, FETCH_ERROR } from './constant';

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

const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATASUM:
      return handleInitialFetch(state, action);
    default:
  }
};

export default appReducer;
