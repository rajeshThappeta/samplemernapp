import {configureStore} from '@reduxjs/toolkit'
import userLoginSlice from './userLoginSlice'


export const store=configureStore({
  reducer:{
    userLogin:userLoginSlice
  }
})