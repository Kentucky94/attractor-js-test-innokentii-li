import React from 'react';
import PropTypes from 'prop-types';

import FileInput from "./FileInput";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";

const FormElement = props => {
  let inputChildren = undefined;

  if (props.type === 'select') {
    inputChildren = props.options.map(option => {
      return (
        <MenuItem key={option.id} value={option.id}>
          {option.title}
        </MenuItem>
      )
    })
  }

  let inputComponent = (
    <TextField
      fullWidth
      variant='outlined'
      label={props.title}
      type={props.type}
      select={props.type === 'select'}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
      helperText={props.error}
      error={!!props.error}
      multiline={props.multiline}
      rows={props.rows}
      rowsMax={props.rowsMax}
    >
      {inputChildren}
    </TextField>
  );

  if (props.type === 'file') {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
      />
    )
  }

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormElement;