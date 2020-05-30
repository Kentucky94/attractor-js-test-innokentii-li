import React, {createRef, useState} from 'react';

import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  input: {
    display: 'none',
  }
});

const FileInput = ({onChange, name, label}) => {
  const classes = useStyles();

  const inputRef = createRef();

  const [filename, setFilename] = useState('');

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center" style={{width: '300px'}}>
        <Grid item xs>
          <TextField
            variant="outlined"
            disabled
            fullWidth
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={activateInput}>
            <SearchIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;