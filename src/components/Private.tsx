import { selectAuthState } from '@/redux/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
interface Props{
    children:React.ReactNode
}
export const Private:React.FC<Props> = ({children}) => {
    const {isAuthenticated}  =  useSelector(selectAuthState)
  return (
    isAuthenticated?children:<Navigate to={"/"}/>
  )
}
