export const FETCH_DATASUM = 'FETCH_DATASUM';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_YESTERDAYSUM = 'FETCH_YESTERDAYSUM';

const today = new Date();
const yesterday = new Date(today);
const twoDaysAgo = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const formatISOMidnight = date => {
  return `${date.toISOString().replace(/(?<=T).*[0-9]/g, '00:00:00.000')}`;
};

export const todayISO = formatISOMidnight(today);
export const yesterdayISO = formatISOMidnight(yesterday);
export const twoDaysAgoISO = formatISOMidnight(twoDaysAgo);
