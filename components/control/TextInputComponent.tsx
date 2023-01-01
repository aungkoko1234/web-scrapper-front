import React, { ChangeEvent } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  TextFieldProps,
  TextField,
} from "@mui/material";
interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  customError?: string;
  className?: string;
  allowDecimal?: boolean;
  postfix?: string;
  prefix?: string;
  rows?: number | undefined;
  onFocus?: () => void;
  onChange?: (value: any) => any;
  onEnterKeyPress?: () => void;
  mapper?: (arg?: any) => any;
}

const TextInputComponent: React.FC<Props & TextFieldProps> = ({
  name,
  label,
  placeholder = "",
  rows = undefined,
  customError,
  onFocus,
  onEnterKeyPress,
  className,
  value,
  allowDecimal,
  prefix = "",
  postfix = "",
  mapper = (value: string | number) => value,
  onChange = (value: unknown) => null,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event);
    helpers.setValue(event.target.value);
  }

  return (
    <FormControl>
      <TextField
        {...props}
        {...field}
        fullWidth
        label={label}
        placeholder={placeholder}
        value={mapper(value as string) || mapper(field.value) || ""}
        onFocus={onFocus}
        multiline={Boolean(rows)}
        rows={rows}
        error={!!((meta.touched && meta.error) || customError)}
        onKeyDown={onEnterKeyPress}
        onChange={handleChange}
      />

      <FormHelperText error>{meta.error || customError}</FormHelperText>
    </FormControl>
  );
};

export default TextInputComponent;
