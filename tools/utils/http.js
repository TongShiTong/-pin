// const baseUrl = 'http://lsp.jiuduanfw.com/api.php';
const baseUrl = 'http://demo.lsp.jiuduanfw.com/api.php';
// const cdnUrl = 'http://lsp.jiuduanfw.com';
const cdnUrl = 'http://demo.lsp.jiuduanfw.com';
// const resourceUrl = 'https://shanghui.jiuduanfw.com';

const apiRequest = (option) => {
	let token = uni.getStorageSync('token');
	let defOption = {
		api: "",
		method: "GET",
		data: {},
		dataType:"json",
		secuss: (res, httpStatus) => {},
		error: (res, httpStatus) => {},
		complete: (res, httpStatus) => {},
	};
	option = Object.assign({}, defOption, option);
	let httpData = {
		url: baseUrl + option.api,
		data: option.data,
		method: option.method.toUpperCase(),
		header: option.method.toUpperCase() == 'GET' ? {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType:option.dataType,
	};
	
	new Promise(function(resolve, reject) {
		uni.request(httpData).then((res) => {
				resolve(res[1])
			}
		).catch((response) => {
				reject(response)
			}
		)
	}).then((res) => {
		//检测data的code是否存在，存在则属于调用成功
		if(typeof res.data=="object"&&typeof res.data.code !="undefined"){
			option.secuss(res.data,res.statusCode);
		}else{//不存在则调用失败，进入error
			option.error(res.data,res.statusCode);
		}
		option.complete(res.data,res.statusCode);
	});
};

const htmlRequest = (option) => {
	let token = uni.getStorageSync('token');
	let defOption = {
		api: "",
		method: "GET",
		data: {},
		dataType:"json",
		secuss: (res, httpStatus) => {},
		error: (res, httpStatus) => {},
		complete: (res, httpStatus) => {},
	};
	option = Object.assign({}, defOption, option);
	let httpData = {
		url: baseUrl + option.api,
		data: option.data,
		method: option.method.toUpperCase(),
		header: option.method.toUpperCase() == 'GET' ? {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType:option.dataType,
	};
	
	new Promise(function(resolve, reject) {
		uni.request(httpData).then((res) => {
				resolve(res[1])
			}
		).catch((response) => {
				reject(response)
			}
		)
	}).then((res) => {
		
		//检测data的code是否存在，存在则属于调用成功
		if(typeof res.data=="object"&&typeof res.data.code !="undefined"){
			option.secuss(res.data,res.statusCode);
		}else if(res.statusCode==200){//不存在则调用失败，进入error
			option.html(res.data,res.statusCode);
		}else{
			option.error(res.data,res.statusCode);
		}
		option.complete(res.data,res.statusCode);
	});
};

export default {
	cdnUrl,
	baseUrl,
	apiRequest,
	htmlRequest
}
