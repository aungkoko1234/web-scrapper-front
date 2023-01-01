import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface SearchInputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
  customError?: string;
  onFocus?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: any) => any;
  // eslint-disable-next-line no-unused-vars
  mapper?: (arg?: any) => any;
  onEnterKeyPress?: () => void;
}
const SearchInputComponent: React.FC<TextFieldProps & SearchInputProps> = ({
  name,
  label,
  value = undefined,
  placeholder,
  onFocus,
  customError = undefined,
  // eslint-disable-next-line no-unused-vars
  onChange = (value) => null,
  mapper = (value) => value,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  function handleChange(evt: any) {
    onChange(evt);
    helpers.setValue(evt.target.value);
  }
  return (
    <TextField
      {...props}
      {...field}
      name={name}
      onFocus={onFocus}
      value={mapper(value) || mapper(field.value) || ""}
      error={!!((meta.touched && meta.error) || customError)}
      helperText={customError}
      label={label || ""}
      variant="outlined"
      fullWidth
      placeholder={placeholder || ""}
      onChange={(e) => handleChange(e)}
    />
  );
};
export default SearchInputComponent;
