import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const countryURL = ``;

const DataOption = ({ optList }) => {
  return (
    <div>
      {optList && (
        <Autocomplete
          id="combo-box-demo"
          options={optList}
          getOptionLabel={option => option.Country}
          style={{ width: 300 }}
          autoHighlight
          autoSelect
          debug
          renderTags={option => option.Slug}
          renderInput={params => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      )}
    </div>
  );
};

export default DataOption;
