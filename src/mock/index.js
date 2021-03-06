import Mock from "mockjs"
import {
  handleLogin,
  setCheckCode,
  handleRegister,
  resetUser,
  handleSex,
  handleChangeUser,
  handleNews,
  handleRepresentNews,
  handleDateMes,
  handleDate,
  handleDateRecords
} from "../config/utils.js"

Mock.mock(/\/signedin/, "post", handleLogin)
Mock.mock(/\/checkcode/, 'get', setCheckCode)
Mock.mock(/\/register/, 'post', handleRegister)
Mock.mock(/\/reset/, 'post', resetUser)
Mock.mock(/\/sex/, 'get', handleSex)
Mock.mock(/\/changeuser/, 'post', handleChangeUser)
Mock.mock(/\/news/, 'post', handleNews)
Mock.mock(/\/representNews/, 'post', handleRepresentNews)
Mock.mock(/\/date/, 'post', handleDateMes)
Mock.mock(/\/showDateMes/, 'post', handleDate)
Mock.mock(/\/getDateRecords/, 'post', handleDateRecords)
