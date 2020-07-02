import axios from 'axios'

export function signedIn (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/signedin`,
    data
  })
}

export function getCheckCode () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/checkcode`
  })
}

export function addUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/register`,
    data
  })
}

export function changeUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/reset`,
    data
  })
}

export function getSex () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/sex`
  })
}

export function changeUserMes (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/changeuser`,
    data
  })
}

export function getNews () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/news`
  })
}


export function getRepresentNews () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/representNews`
  })
}