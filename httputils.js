/**
 * Created by yangc on 2018/5/11.
 * User: 1007181167@qq.com
 */
import wepy from 'wepy';
const rootUri = 'https://api.kuailebama.cn/';
const http_name = {
  onLogin: 'user/onLogin',//登陆
};
function getReq( url, cb, fail) {
  return getReqData(url, null, cb, fail);
}

function getReqData(url, data, cb, fail) {
  wepy.showLoading({
    title: '请求中...'
  });
  return  wepy.request({
    url: rootUri + url,
    method: 'GET',
    data: data,
    success: function(res) {
      console.log(JSON.stringify(res));
      wepy.hideLoading();
      if (res.data.errcode === 0) {
        return typeof cb === 'function' && cb(res.data);
      } else {
        showToast(res.data.errmsg === undefined ? '请稍后再试' : res.data.errmsg);
        return typeof fail === 'function' && fail(res.data);
      }
    },
    fail: function(res) {
      console.log('fail:' + JSON.stringify(res));
      wepy.hideLoading();
      wepy.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      });
      return typeof fail === 'function' && fail(res);
    }
  });
}

function postReqNoData(url, cb, fail) {
    return  postReq(url,undefined,cb,fail)
}

function postReq(url, data, cb, fail) {
  if (data !== undefined) {
    wepy.showLoading({
      title: '请求中...'
    });
  }
  return  wepy.request({
    url: rootUri + url,
    data: data,
    method: 'POST',
    success: function(res) {
      wepy.hideLoading();
      if (res.data.errcode === 0) {
        return typeof cb === 'function' && cb(res.data);
      } else {
        showToast(res.data.errmsg === undefined ? '请稍后再试' : res.data.errmsg);
        return typeof fail === 'function' && fail(res.data.errmsg);
      }
    },
    fail: function(res) {
      wepy.hideLoading();
      wepy.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      });
      return typeof fail === 'function' && fail(res);
    }
  });
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
  header: header,
  http_name: http_name,
  showToast: showToast,
  showToastSuccess: showToastSuccess,
  getTime: getTime,
  patternIdcard:patternIdcard,
};
