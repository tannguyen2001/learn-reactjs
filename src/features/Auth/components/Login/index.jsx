import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import propTypes from 'prop-types'
import LoginForm from '../LoginForm'

Login.propTypes = {
  closeDialog: propTypes.func,
}

function Login(props) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = async (value) => {
    try {
      const action = login(value)
      const resultAction = await dispatch(action)
      const user = unwrapResult(resultAction)
      console.log('new user', user)
      const { closeDialog } = props
      if (closeDialog) {
        closeDialog()
      }
    } catch (error) {
      enqueueSnackbar('lỗi đăng nhập', { variant: 'warning' })
    }
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login
