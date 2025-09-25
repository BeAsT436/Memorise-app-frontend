import { selectAuthState } from '@/redux/authSlice'
import { AppDispatch } from '@/redux/store'
import { getProfile } from '@/redux/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
interface Props{
    children:React.ReactNode
}
export const Private:React.FC<Props> = ({children}) => {
    const {isAuthenticated, user}  =  useSelector(selectAuthState)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{dispatch(getProfile(user?.userId))},[])
  return (
    isAuthenticated?children:<Navigate to={"/"}/>
  )
}
