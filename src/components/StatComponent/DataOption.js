import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataContext } from '../../context/store';
import { FETCH_COUNTRYCASES, CLEAR_COUNTRYCASES } from '../../context/constant';

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#13973f',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#13973f',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2d8bc2',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: '#35d369',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#13973f',
      },
    },
  },
})(TextField);

const generateURL = query =>
  `https://disease.sh/v2/historical/${query}?lastdays=all`;

const DataOption = ({ optList, setUseData, setPieData, setHisPlace }) => {
  const { dataDispatch, handleDataFetch } = useContext(DataContext);
  return (
    <>
      {optList && (
        <Autocomplete
          id="countries-list"
          options={optList}
          getOptionLabel={option => option.countryName}
          style={{ width: '80%', margin: '17px auto' }}
          autoHighlight
          autoSelect
          onChange={(e, v, r) => {
            if (r === 'select-option' && v.countryName !== 'Global') {
              const url = generateURL(v.countryIso);
              handleDataFetch(url, FETCH_COUNTRYCASES);
              setUseData(true);
              setHisPlace(v.countryName);
              setPieData(v);
            } else if (v && v.countryName === 'Global') {
              setUseData(false);
              dataDispatch({ type: CLEAR_COUNTRYCASES });
            }
          }}
          renderInput={params => (
            <CustomTextField
              {...params}
              fullWidth
              label="Search country"
              variant="outlined"
            />
          )}
        />
      )}
    </>
  );
};

export default DataOption;
