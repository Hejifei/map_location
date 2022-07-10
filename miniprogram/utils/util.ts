import {REQUEST_URL} from '../common/index'

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const getUserToken = () => {
    return wx.getStorageSync('token')
}

export const setUserToken = (info: string) => {
    return wx.setStorageSync('token', info)
}

export const getLocationInfo = () => {
  return wx.getStorageSync('locationInfo')
}

export const setLocationInfo = (info: {
  lng: number,
  lat: number,
  address: string,
}) => {
  return wx.setStorageSync('locationInfo', info)
}

export const clearLocationInfo = () => {
  return wx.removeStorageSync('locationInfo')
}

export const parseApiUrl = (url: string): string => {
  const api = REQUEST_URL
  return `${api}${url}`
}