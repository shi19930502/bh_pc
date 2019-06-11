import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import login from '@/views/login'
import productList from '@/views/product/productList'
import shoppingCar from '@/views/product/shoppingCar'
import shoppingSettlement from '@/views/product/shoppingSettlement'
import checkoutSuccess from '@/views/product/checkoutSuccess'

import userCenter from '@/views/usercenter/userCenter'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/reg',
			name: 'reg',
			component: resolve => require(['@/views/reg.vue'], resolve),
		}, {
			path: '/completeRegInfo',
			name: 'completeRegInfo',
			component: resolve => require(['@/views/completeRegInfo.vue'], resolve),
		}, {
			path: '/search',
			name: 'search',
			component: resolve => require(['@/views/product/productSearch.vue'], resolve),
		}, {
			path: '/search_1p',
			name: 'search_1p',
			component: resolve => require(['@/views/product/show1PSellerProduct.vue'], resolve),
		}, {
			path: '/login',
			name: 'login',
			component: login
		},
		// 	{
		// 		path: '/',
		// 		name: 'index',
		// 		component: index
		// 	},
		{ // 北环网上批发市场
			path: '/index',
			name: 'northRingIndex',
			component: resolve => require(['@/views/northviews/NorthRingIndex.vue'], resolve),
		},
		{ // 北环网上批发市场
			path: '/',
			name: 'index',
			component: resolve => require(['@/views/northviews/NorthRingIndex_new.vue'], resolve),
		}, {
			path: '/personalBuyCenter',
			name: 'PersonalBuyCenter',
			component: resolve => require(['@/views/northviews/PersonalBuyCenter.vue'], resolve),
		}, {
			path: '/personalBuyStore',
			name: 'PersonalBuyStore',
			component: resolve => require(['@/views/northviews/PersonalBuyStore.vue'], resolve),
		}, {
			path: '/showProductByStore',
			name: 'showProductByStore',
			component: resolve => require(['@/views/northviews/showProductByStore.vue'], resolve),
		}, {
			path: '/restaurantIndex',
			name: 'RestaurantIndex',
			component: resolve => require(['@/views/northviews/RestaurantIndex.vue'], resolve),
		}, { // 北环网上批发市场结束
			path: '/productList',
			name: 'productList',
			component: productList
		}, {
			path: '/shoppingCar',
			name: 'shoppingCar',
			component: shoppingCar
		}, {
			path: '/selectAddrByMap',
			name: 'selectAddrByMap',
			component: resolve => require(['@/views/northviews/SelectAddr.vue'], resolve),
		}, {
			path: '/shoppingSettlement',
			name: 'shoppingSettlement',
			component: shoppingSettlement
		}, {
			path: '/checkoutSuccess',
			name: 'checkoutSuccess',
			component: checkoutSuccess
		}, {
			path: '/OEvaluation',
			name: 'OEvaluation',
			component: resolve => require(['@/views/usercenter/order/OEvaluation.vue'], resolve),
		}, {
			path: '/evaluationList',
			name: 'evaluationList',
			component: resolve => require(['@/views/northviews/northEvaluationList.vue'], resolve),
		}, {
			path: '/message',
			name: 'message',
			component: resolve => require(['@/views/message/message.vue'], resolve),
		}, {
			path: '/orderDetails',
			name: 'orderDetails',
			component: resolve => require(['@/views/usercenter/order/orderDetails.vue'], resolve),
		}, { // 个人中心
			path: '/userCenter',
			name: 'userCenter',
			redirect: '/userCenter/orderList',
			component: userCenter,
			children: [{
				path: '/userCenter/orderList',
				name: 'orderList',
				component: resolve => require(['@/views/usercenter/order/orderList.vue'], resolve),
			}, {
				path: '/userCenter/orderEvaluate',
				name: 'orderEvaluate',
				component: resolve => require(['@/views/usercenter/order/orderEvaluate.vue'], resolve),
			}, {
				path: '/userCenter/orderPay',
				name: 'orderPay',
				component: resolve => require(['@/views/usercenter/order/orderPay.vue'], resolve),
			}, {
				path: '/userCenter/ofenBuy',
				name: 'ofenBuy',
				component: resolve => require(['@/views/usercenter/order/ofenBuy.vue'], resolve),
			}, {
				path: '/userCenter/contactService',
				name: 'contactService',
				component: resolve => require(['@/views/usercenter/service/contactService.vue'], resolve),
			}, {
				path: '/userCenter/feedback',
				name: 'feedback',
				component: resolve => require(['@/views/usercenter/service/feedback.vue'], resolve),
			}, {
				path: '/userCenter/address',
				name: 'address',
				component: resolve => require(['@/views/usercenter/setting/address.vue'], resolve),
			}, {
				path: '/userCenter/userSetting',
				name: 'userSetting',
				component: resolve => require(['@/views/usercenter/setting/userSetting.vue'], resolve),
			}, {
				path: '/userCenter/collectionStore',
				name: 'collectionStore',
				component: resolve => require(['@/views/usercenter/collection/collectionStore.vue'], resolve),
			}, {
				path: '/userCenter/collectionPro',
				name: 'collectionPro',
				component: resolve => require(['@/views/usercenter/collection/collectionPro.vue'], resolve),
			}]
		},
	]
})
