import React from 'react';
import {Input} from "reactstrap";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

const FormElement = props => {
  let inputComponent = (
    <TextField
      fullWidth
      variant='outlined'
      label={props.title}
      type={props.type}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
      helperText={props.error}
      error={!!props.error}
    />
  );

  // if(props.type === 'file'){
  //   inputComponent = (
  //     <Input
  //       type={props.type}
  //       name={props.propertyName} id={props.propertyName}
  //       onChange={props.onChange}
  //     />
  //   );
  // }

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