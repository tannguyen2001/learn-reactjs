import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
}

function InputField(props) {
  const { form, name, label, disabled } = props

  const { errors } = form
  const hasErrors = errors[name]
  return (
    <Controller
      control={form.control}
      name={name}
      as={TextField}
      label={label}
      disabled={disabled}
      error={!!hasErrors}
      helperText={errors[name]?.message}
      variant="outlined"
      fullWidth
      margin="normal"
    />
  )
}

export default InputField
