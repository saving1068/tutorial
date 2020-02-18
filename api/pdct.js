import api from '../request/index.js'

const getSeries = (params) => {
  return api.request({
    url: 'furnitureType/list',
    data: params,
    method: 'GET'
  })
}

const getfurnitureList = (params) => {
  console.log(params)
 return api.request({
   url:'furniture/list',
   data:{...params},
   method: 'GET',
  })

}
const selectList = (params) => {
  return api.request({ //
    url: 'furniture/list',
    data: params,
    method: 'GET'
  })
}

const furnitureDetail = (params) => {
  return api.request({ //
    url: 'furniture/detail',
    data: params,
    method: 'GET',
    isShowLoading:true
  })
}

const shareInfo = (params) => {
  return api.request({ //
    url: 'PreviewShare/insert',
    data: params,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}
const shareDetail = (params) => {
  return api.request({ //
    url: 'PreviewShare/list',
    data: params,
    method: 'GET',
    isShowLoading: true
  })
}
export default { getfurnitureList, getSeries, selectList, furnitureDetail, shareInfo, shareDetail}