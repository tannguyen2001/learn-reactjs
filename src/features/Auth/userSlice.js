import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userAPI from 'api/userApi'
import StorageKeys from 'constains/storageKeys'

export const register = createAsyncThunk('user/register', async (payload) => {
  //call api to register
  const data = await userAPI.register(payload)

  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
  return data.user
})

export const login = createAsyncThunk('user/login', async (payload) => {
  //call api to register
  const data = await userAPI.login(payload)

  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
  return data.user
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)
      state.current = {}
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload
    },
  },
})

const { reducer, actions } = userSlice
export const { logout } = actions
export default reducer
