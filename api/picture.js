import api from '../request/index.js'
const getImageList = (params) => {
  return api.request({//形象
    url: 'imageDisplay/list',
    data: params,
    method: 'GET',
    isShowLoading:true
  })
}

const getPictrue = (params) => {
  return api.request({ //相册
    url: 'picAlbum/list',
    data: params,
    method: 'GET',
    isShowLoading: true
  })
}

const setSelectList = (params) => { 
  return api.request({ //
    url: 'furniture/list',
    data: params,
    method: 'GET',
  })
}
export default { getImageList,getPictrue }