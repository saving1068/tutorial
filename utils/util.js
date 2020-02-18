const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const completion = ((rolu,str)=>{
  let res = rolu+str
  return  String(res)
})

const changeString = ((key,list)=>{
 let item =  list.find((item)=> item.id == key);
 console.log(list,item)
 return item.typeName
})

const bMapTransQQMap = ((lng, lat) => {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let logs = Number(z * Math.cos(theta));
  let lats = Number(z * Math.sin(theta)) ;

  return {
    longitude: logs,
    latitude: lats
  }   
})
module.exports = {
  formatTime: formatTime,
  completion, changeString,
  bMapTransQQMap
}
