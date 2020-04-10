import Vue from 'vue'
import Vuex from 'vuex'
import footer_store from "./modules/footer_store.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading:'0',
		base_url:"https://cnodejs.org/api/v1",
		list:[],
		detail:'',
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		pushMessage: {},
		// repaiDetial: {
		// 	name:'',
		// 	mobile:'',
		// 	idcard:'',
		// 	content:''
		// }
		user: {
			home: {
				id: 1,
				name: 'tax',
				img: 'static/img/homeHL.png'
			},
			customer: {
				id: 2,
				name: 'customer',
				img: 'static/img/customerHL.png'
			}
		}
	},
	updated:function(){
		console.log('message update:'+ this.scrollTop);
	},
	mutations: {
		login(state, userName) {
		    state.userName = userName || '新用户';
		    state.hasLogin = true;
		},
		logout(state) {
		    state.userName = "";
		    state.hasLogin = false;
		},
		updatePushMessage(state, message) {
			/**
			 * 注意：这里为了方便预览查看效果，始终对 payload 做了序列化的处理。
			 * 实际开发期中，请自行调整代码并注意发送的 payload 消息格式。
			 */ 
			let payload = message.payload;
			if (typeof payload !== 'string') {
				message.payload = JSON.stringify(payload);
			}
			state.pushMessage = message || {};
		},
		// repairName(state,msg) {
		// 	state.repaiDetial.name=msg
		// },
		switch_loading(state,status){
			console.log(status)
			if(status == "change"){
				if(state.loading=='0'){
					state.loading = '1'
				}else{
					state.loading = '0'
				}
			}else{
				state.loading = status;
			}
			
		},
		update_list(state,data){
			state.list = data
		},
		update_detail(state,data){
			state.detail = data
		}
	},
	actions: {
		get_data(ctx){
			
			console.log(ctx)
			ctx.commit("switch_loading","1")
			
			uni.request({
				url:ctx.state.base_url+"/topics",
				data:{
					page :1,
					tab :"share",
					limit :10,
					mdrender :false
				},
				success(res) {
					ctx.commit("update_list",res.data.data)
				},
				complete(){
					ctx.commit("switch_loading","0")
				}
			})
		},
		get_detail(ctx,id){
			ctx.commit("switch_loading","1")
			uni.request({
				url:ctx.state.base_url+"/topic/"+id,
				data:{
					mdrender :true
				},
				success(res) {
					console.log(res)
					ctx.commit("update_detail",res.data.data.content)
				},
				complete(){
					ctx.commit("switch_loading","0")
				}
			})
		}
	},
	modules:{
		footer_store
	}
})

export default store
