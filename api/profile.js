import api from '../request/index.js'
const getIntro = (params) => {
  return api.request({
    url: 'corporateInfo/intro',
    data: params,
    method: 'GET'
  })
}

const getAboutUs = (params) => {
  return api.request({
    url: 'corporateInfo/aboutUs',
    data: params,
    method: 'GET'
  })
}

export default { getIntro, getAboutUs }