# WepyUtils
小程序请求封装支持和promise,原生封装,请求拦截,封装header

### 1.原生封装 httputils.js  不支持Promise 用法


#### 1.引用
```
 import httpUtils from '../../libs/httputils';

```
#### get请求

````
 httpUtils.getReq('get/list', res=> {
         //Success //已经回调成功数，无需判断判断
          this.dataList = res.dataList;
          this.$apply();
        },res=>{
        //error
        });
````
#### post请求
````
 httpUtils.postReq('user/login',res=> {
          //Success //已经回调成功数，无需判断判断
          this.$apply();
        },res=>{
           //error
        });
````

### 2.Promise封装 httputils2.js
#### 1.引用
```
 import httpUtils from '../../libs/httputils2';

```
#### get请求

````
 httpUtils.getReqData2( httpUtils.http_name.banner,null)
        .then(res=>{
          //Success //已经回调成功数，无需判断判断
        })
        .catch(res=>{
         //error
        })
````
#### post请求
````
 httpUtils.getReqData2( httpUtils.http_name.banner,null)
        .then(res=>{
           //Success //已经回调成功数，无需判断判断
        })
        .catch(res=>{
        //error
        })
````

###  3.修改封装httputils内部判断数据规则

`````
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
            .....
           reject('网络出错，请刷新重试')
         })
     })
  }
`````
或者

````
return  wepy.request({
    url: rootUri + url,
    data: data,
    method: 'POST',
    success: function(res) {
      wepy.hideLoading();
      //修改成功判断规则
      if (res.data.errcode === 0) {
        return typeof cb === 'function' && cb(res.data);
      } else {
        showToast(res.data.errmsg === undefined ? '请稍后再试' : res.data.errmsg);
        return typeof fail === 'function' && fail(res.data.errmsg);
      }
    },
    fail: function(res) {
      ///......
      return typeof fail === 'function' && fail(res);
    }
  });
````
### 5 如何在header信息
 推荐在app.wepy添加请求拦截器，而不是在每个请求添加header
  小程序一般的话会使用openId 作为token的

 `````
 //导入Promise
  import 'wepy-async-function';
  export default class extends wepy.app {


     constructor () {
      super();
      //开启Promise用法
      this.use('promisify');
        // 拦截request请求
        this.intercept('request', {
          // 发出请求时的回调函数
          config (p) {
            // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
            p.timestamp = +new Date();
            console.log('config request: ', p);
            p.header={
              'Accept': 'application/json',
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': null,
              'openId': this.globalData.openId
            };
            // 必须返回OBJECT参数对象，否则无法发送请求到服务端
            return p;
          },
          // 请求完成时的回调函数(请求成功或失败都会被执行)
          complete (p) {
            console.log('request complete: ', p);
          }
        });
      }
       globalData = {
              openId:'',
              userInfo: null,
       };
  }
 `````