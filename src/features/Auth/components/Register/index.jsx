import React from 'react'
import { useDispatch } from 'react-redux'
import { register } from 'features/Auth/userSlice'
import RegisterForm from '../RegisterForm'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import propTypes from 'prop-types'

Register.propTypes = {
  closeDialog: propTypes.func,
}

function Register(props) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = async (value) => {
    try {
      //auto set username = email
      value.username = value.email
      const action = register(value)
      const resultAction = await dispatch(action)
      const user = unwrapResult(resultAction)
      console.log('new user', user)
      const { closeDialog } = props
      if (closeDialog) {
        closeDialog()
      }
      enqueueSnackbar('Tạo tài khoản thành công!', { variant: 'success' })
    } catch (error) {
      console.log('lỗi đăng kí', error)
    }
  }

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Register
