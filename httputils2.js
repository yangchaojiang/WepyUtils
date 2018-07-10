/**
 * Created by yangc on 2018/5/11.
 * User: 1007181167@qq.com
 */
import wepy from 'wepy';
const rootUri = 'https://api.kuailebama.cn/';

/***
 * 后台接口名称
 * ****/
const http_name = {
  onLogin: 'user/onLogin',//登陆
};

/***
 * get请求  没有参数
 * @param  url     地址
 * ***/
function getReq(url) {
  return getReqData(url, null);
}
/***
 * get请求
 * @param data data  参数
 * @param  url   地址
 * ***/
function getReqData(url, data) {
   return new Promise((resolve, reject)=>{
     wepy.showLoading({
       title: '请求中...'
     });
     wepy.request({
       url: rootUri + url,
       method: 'GET',
       data: data,
     })
       .then(res=>{
         console.log(JSON.stringify(res));
         wepy.hideLoading();
         if (res.data.errcode === 0) {
           resolve(res.data)
         } else {
           showToast(res.data.errmsg === undefined ? '请稍后再试' : res.data.errmsg);
           reject(res.data.errmsg)
         }
       })
       .catch(res=>{
         console.log('fail:' + JSON.stringify(res));
         wepy.hideLoading();
         wepy.showModal({
           title: '网络错误',
           content: '网络出错，请刷新重试',
           showCancel: false
         });
         reject('网络出错，请刷新重试')
       })
   })
}
/***
 * post请求  没有参数
 * @param  url   地址
 * ***/
function postReqNoData(url) {
  postReq(url,undefined)
}
/***
 * get请求
 * @param  url   地址
 * @param data data  参数
 * ***/
function postReq(url, data) {
  return new Promise((resolve, reject)=>{
    if (data !== undefined) {
      wepy.showLoading({
        title: '请求中...'
      });
    }
    wepy.request({
      url: rootUri + url,
      data: data,
      method: 'POST',})
      .then(res=>{
        wepy.hideLoading();
        if (res.data.errcode === 0) {
          resolve(res.data)
        } else {
          showToast(res.data.errmsg === undefined ? '请稍后再试' : res.data.errmsg);
          reject(res.data.errmsg)
        }
      }).catch(()=>{
      wepy.hideLoading();
      wepy.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      });
      reject('网络出错，请刷新重试')
    })
  })
}


/**
 * 显示toast
 * @param  msg msg
 * **/
function showToast(msg) {
  wepy.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  });
}

/**
 * 显示toast
 * @param  msg msg
 * **/
function showToastSuccess(msg) {
  wepy.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  });
}

function getTime() {
  return new Date().getTime();
}

/**
 * 效验的身份号
 * **/
function patternIdcard(value) {
  var pattern =/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return pattern.test(value);
}

module.exports = {
  getReq: getReq,
  postReq: postReq,
  getReqData: getReqData,
  postReqNoData:postReqNoData,
  http_name: http_name,
  showToast: showToast,
  showToastSuccess: showToastSuccess,
  getTime: getTime,
  patternIdcard:patternIdcard,
};
