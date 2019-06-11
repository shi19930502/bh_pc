console.log(process.env.NODE_ENV)
console.log(window.ROOT_API)
let ROOT_API,
		SUYUAN_URL;
// const DEV_ROOT_API = `http://localhost:8080/center-pre-interface`;
const DEV_ROOT_API = `http://ssbh.yshfresh.com`;
const PRO_ROOT_API = `http://ssbh.yshfresh.com`;

// 生产环境API
process.env.NODE_ENV === 'production'
		? ROOT_API = PRO_ROOT_API
		: ROOT_API = DEV_ROOT_API
// 在index.html配置
if (window.ROOT_API) {
		ROOT_API = window.ROOT_API
}
// 溯源页面地址
process.env.NODE_ENV === 'production'
		? SUYUAN_URL = `${ROOT_API}/mp/#/suyuan?suyuanCode=`
		: SUYUAN_URL = `http://localhost:8083/#/suyuan?suyuanCode=`

export default {
		api : ROOT_API + '/api',
		rootAPI : ROOT_API + '/api/trade/', //接口根路径
		userAPI : ROOT_API + '/api/user/',
		loginAPI : ROOT_API + '/login/login',
		prefix : 'jz_admin_', //本地存储key前缀
		imgURL : ROOT_API + '/', // 打包后的路径
		uploadURL : ROOT_API + '/api/comm/fileUpload/file',
		SUYUAN_URL : SUYUAN_URL,
		sysID : 7
}