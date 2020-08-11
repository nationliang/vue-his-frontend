import axios from 'axios'

export function signedIn (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/signedin`,
    data
  })
}

export function getCheckCode () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/checkcode`
  })
}

export function addUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/register`,
    data
  })
}

export function changeUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/reset`,
    data
  })
}

export function getSex (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/sex`,
    data
  })
}

export function changeUserMes (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/profile/changeuser`,
    data
  })
}

export function getNews () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/news`
  })
}

export function getRepresentNews () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/representNews`
  })
}

export function sendDateMes (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/saveDateMes`,
    data
  })
}

export function getDateMes (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/showDateMes`
  })
}

export function getDatingRecords (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/getDatingRecords`,
    data
  })
}

export function getPayingRecords (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/getPayingRecords`,
    data
  })
}

export function getHistoryRecords (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/getHistoryRecords`,
    data
  })
}

export function getUserList () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/user/list`
  })
}

export function deleteUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/user/delete`,
    data
  })
}

export function addSystemUser (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/user/add`,
    data
  })
}

export function getDep () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/dep/list`
  })
}

export function deleteDep(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/dep/delete`,
    data
  })
}

export function addDep (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/dep/add`,
    data
  })
}

export function getDocList () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/doc/list`
  })
}

export function deleteDoc(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/doc/delete`,
    data
  })
}

export function addDoc (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/doc/add`,
    data
  })
}

export function getCheckList () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/check/list`
  })
}

export function deleteCheck(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/check/delete`,
    data
  })
}

export function addCheck (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/check/add`,
    data
  })
}

export function getNewsList () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/newsManage/list`
  })
}

export function deleteNews(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/newsManage/delete`,
    data
  })
}

export function addNews (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/newsManage/add`,
    data
  })
}

export function getHistoryList () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/historyManage/list`
  })
}

export function deleteHistory(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/historyManage/delete`,
    data
  })
}

export function getDepDocList (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/darrange/queryDepDoc`,
    data
  })
}

export function addPlan(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/darrange/add`,
    data
  })
}

export function getPlan(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/system/darrange/list`,
    data
  })
}

export function getMedicineList() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/medicine/manage/list`
  })
}

export function deleteMedicine(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/medicine/manage/delete`,
    data
  })
}

export function addMedicine(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/medicine/manage/add`,
    data
  })
}

export function cancelDate(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/cancelDate`,
    data
  })
}

export function deleteRecord(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/patient/deleteRecord`,
    data
  })
}

export function getDateList(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/dateList`,
    data
  })
}

export function getMedicineList_doc () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/medicineList`
  })
}

export function getCheckList_doc () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/checkList`
  })
}

export function submitHealMes_doc (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/submitHealMes`,
    data
  })
}

export function getHistoryList_doc (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/historyList`,
    data
  })
}

export function getPatientList_mon () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/money/patientList`
  })
}

export function finishPayment (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/money/finishPayment`,
    data
  })
}

export function getPillList_med () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/medicine/distribute/list`
  })
}

export function finishDistribution (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/medicine/distribute/finishDistribution`,
    data
  })
}

export function pillsDetail (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/medicine/distribute/detail`,
    data
  })
}

export function getIncomeAndExpenditure() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/statistics/iande`
  })
}

export function getMedicineList_sta() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/statistics/medicine`
  })
}

export function getDoctorStatistics() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/statistics/doctor`
  })
}

export function getDocId(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/doctor/id`,
    data
  })
}

export function getSymptomMesList() {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/symptom/list`
  })
}

export function deleteSymptomMes(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/symptom/delete`,
    data
  })
}

export function addSymptomMes(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/symptom/add`,
    data
  })
}

export function sendSymptomDes(data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/symptom/query`,
    data
  })
}

export function getDialogUserList (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/dialog/userList`,
    data
  })
}

export function getUserMessageCount (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/dialog/messageNum`,
    data
  })
}

export function getVisitHistory () {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/system/statistics/list`
  })
}

export function addVisitHistory (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/system/statistics/add`,
    data
  })
}

export function deleteVisitHistory (data) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/api/system/statistics/del`,
    data
  })
}

export function getClientIPandCity () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/ipAndCity`
  })
}