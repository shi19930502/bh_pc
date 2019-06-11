import axios from 'axios'
import {
	Message
} from 'element-ui';
import configs from '../configs'
import router from '../router'
axios.interceptors.request.use(config => {
	return config;
}, err => {
	Message('请求超时!')
	return Promise.resolve(err);
})

axios.interceptors.response.use(data => {
	if (data.status && data.status == 200) {
		if (data.request.responseURL.indexOf('telephoneMatche') != -1) {
			// 判断手机号码是否被注册
		} else {
			if (data.data.state != 0) {
				Message.error(data.data.msg)

				if (data.data.state == 97) {
					router.push({
						name: 'login'
					})
				}
			}
		}

	}
	return data;
}, err => {
	if (err.response) {
		if (err.response.status == 504 || err.response.status == 404) {
			Message.error('服务器错误⊙﹏⊙∥')
		} else if (err.response.status == 403) {
			Message.error('权限不足,请联系管理员!')
		} else {
			Message.error('未知错误!');
		}
		return Promise.resolve(err);
	} else {
		Message.error('未知错误!');
	}
})

export const postRequest = (url, params, isLogin, isUser) => {
	let urlp;
	if (isLogin) { //是否登录调用
		urlp = `${configs.loginAPI}${url}`
	} else {
		if (url.split('/').length > 2) {
			urlp = `${configs.api}${url}`
		} else {
			if (isUser) {
				urlp = `${configs.userAPI}${url}`
			} else {
				urlp = `${configs.rootAPI}${url}`
			}
		}
	}
	// 获取token
	let userInfo = JSON.parse(localStorage.getItem('userInfo'));
	if (userInfo) {
		params.token = userInfo.token
	}

	return axios({
		method: 'post',
		url: urlp,
		data: params,
		transformRequest: [function(data) {
			let ret = ''
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}

export const getRequest = (url) => {
	return axios({
		method: 'get',
		url: `${configs.api}${url}`
	});
}

export const uploadFileRequest = (url, params) => {
	return axios({
		method: 'post',
		url: `${configs.rootAPI}${url}`,
		data: params,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

export const putRequest = (url, params) => {
	return axios({
		method: 'put',
		url: `${configs.rootAPI}${url}`,
		data: params,
		transformRequest: [function(data) {
			let ret = ''
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}

export const deleteRequest = (url) => {
	return axios({
		method: 'delete',
		url: `${configs.rootAPI}${url}`
	});
}
