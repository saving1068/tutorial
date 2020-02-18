import api from '../request/index.js'
const getSwiperList = (params) =>{
  return api.request({
    url: 'tbBanner/list',
    data:params,
    method:'GET'
  })
}

const getSeries = (params) =>{
  return api.request({
    url:'furnitureType/list',
    data: params,
    method: 'GET'
  })
}

export default { getSwiperList, getSeries}