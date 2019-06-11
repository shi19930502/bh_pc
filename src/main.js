import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {
  getRequest,
  postRequest
} from './utils/api'

import {
  MessageBox,
  Message,
  Notification,
  Loading
} from 'element-ui'

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.$alert = MessageBox;
Vue.prototype.$message = Message;

import './assets/css/comm.scss'
import './assets/css/overwrite.scss'
/**处理js计算精度*/
import './utils/mathfix.js'
Vue.config.productionTip = false

// 解决Error: Loading chunk 33 failed.路由不跳转
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

router.beforeEach((route, redirect, next) => {
  // next();

  if (route.name == 'RestaurantIndex' || route.name == 'PersonalBuyCenter' || route.name == 'northRingIndex' ||
    route.name == 'login' || route.name == 'reg') {
    next();
  } else {
    // if (store.state.isLogin) {
      next();
//     } else {
//       MessageBox.confirm('还没有登录，是否马上登录?', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//       }).then(() => {
//         router.push({
//           name: 'login'
//         })
//       }).catch(() => {
// //         if (route.name == "PersonalBuyCenter") {
// // 
// //         } else {
// //           router.push({
// //             name: 'northRingIndex'
// //           })
// //         }
//       });
//     }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
