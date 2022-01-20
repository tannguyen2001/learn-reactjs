import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import LinearProgress from '@material-ui/core/LinearProgress'

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 48,
    position: 'relative',
  },
  avatar: {
    margin: '0 auto',
    background: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 3,
  },
  submit: {
    width: '100%',
    marginTop: 20,
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(4),
    left: 0,
    right: 0,
  },
}))

function LoginForm(props) {
  const schema = yup
    .object()
    .shape({
      identifier: yup
        .string()
        .required('Please enter your email!')
        .email('Nhập đúng định dạng email!'),
      password: yup.string().required('Please enter password!'),
    })
    .required()
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = async (values) => {
    const { onSubmit } = props
    if (onSubmit) {
      await onSubmit(values)
    }
  }
  const { isSubmitting } = form.formState

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon></LockOutlinedIcon>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} margin="normal">
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" form={form} label="Password" />
        <Button
          disabled={isSubmitting}
          type="sumbit"
          variant="contained"
          className={classes.submit}
          color="primary"
        >
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
