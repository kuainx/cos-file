import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import axios from "axios";
import VueClipboard from "vue-clipboard2";
import "ant-design-vue/dist/antd.css";

if (process.env.NODE_ENV === "production") {
	axios.defaults.baseURL = "./api/";
} else {
	axios.defaults.baseURL = "http://localhost/cos-api/index.php";
}
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype["$axios"] = axios;
Vue.use(Antd);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
new Vue({
	render: h => h(App),
}).$mount("#app");

import COS from "cos-js-sdk-v5";

window.getAuthorization = (options, callback) => {
	callback({
		XCosSecurityToken: window.credentials.sessionToken,
		Authorization: COS.getAuthorization({
			SecretId: window.credentials.tmpSecretId,
			SecretKey: window.credentials.tmpSecretKey,
			Method: options.Method,
			Pathname: options.Pathname,
		}),
	});
};
window.camSafeUrlEncode = str => {
	return encodeURIComponent(str)
		.replace(/!/g, "%21")
		.replace(/'/g, "%27")
		.replace(/\(/g, "%28")
		.replace(/\)/g, "%29")
		.replace(/\*/g, "%2A");
};
window.cosA = new COS({
	// 必选参数
	getAuthorization: window.getAuthorization,
	// 可选参数
	FileParallelLimit: 3,    // 控制文件上传并发数
	ChunkParallelLimit: 3,   // 控制单个文件下分片上传并发数
	ChunkSize: 1024 * 1024 * 3,  // 控制分片大小，单位 B
	ProgressInterval: 100,  // 控制 onProgress 回调的间隔
	ChunkRetryTimes: 3,   // 控制文件切片后单片上传失败后重试次数
	UploadCheckContentMd5: true,   // 上传过程计算 Content-MD5
});

window.renderSize = value => {
	if (value == null || value == "") {
		return "0 Bytes";
	}
	const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	let index = 0;
	let srcSize = parseFloat(value);
	index = Math.floor(Math.log(srcSize) / Math.log(1024));
	let size = srcSize / Math.pow(1024, index);
	size = size.toFixed(2); //保留的小数位数
	return size + unitArr[index];
};
