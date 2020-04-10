export default {
	state:{
		footer_nav:[
			{
				name:'首页',
				name_code:'hunterPosition',
				icon:'/static/footer_icon/shouye1.png',
				select_icon:'/static/footer_icon/shouye2.png',
				size:'small'
			},
			{
				name:'人才库',
				name_code:'talentContainer',
				icon:'/static/footer_icon/rencai1.png',
				select_icon:'/static/footer_icon/rencai2.png',
				size:'small'
			},
			{
				name:'任务',
				name_code:'task',
				icon:'/static/footer_icon/renwu1.png',
				select_icon:'/static/footer_icon/renwu2.png',
				size:'small'
			},
			{
				name:'我的',
				name_code:'hunterMy',
				icon:'/static/footer_icon/wode1.png',
				select_icon:'/static/footer_icon/wode2.png',
				size:'small'
			}
			
		],
		now_page_index:0,
	},
	mutations:{
		change_nav_list(state,data){
			state.footer_nav = data;
		},
		change_page(state,index){
			state.now_page_index = index;
		}
	},
	actions:{
		// 用工企业端3个tabBar
		menu_3(ctx){
			let menu_list = [
				{
					name:'任务',
					name_code:'enterPosition',
					icon:'/static/footer_icon/e_renwu1.png',
					select_icon:'/static/footer_icon/e_renwu.png',
					size:'small'
				},
				{
					name:'',
					name_code:'sendOut',
					icon:'/static/footer_icon/e-fabu.png',
					select_icon:'/static/footer_icon/e-fabu.png',
					size:'big'
				},
				{
					name:'我的',
					name_code:'enterMy',
					icon:'/static/footer_icon/e_wode1.png',
					select_icon:'/static/footer_icon/wode2.png',
					size:'small'
				},
			]
			
			ctx.commit("change_nav_list",menu_list)
		},
		// 猎手端端5个tabBar
		menu_5(ctx){
			let menu_list = [
				// {
				// 	name:'首页',
				// 	name_code:'home',
				// 	icon:'/static/footer_icon/a2.png',
				// 	select_icon:'/static/footer_icon/a1.png',
				// 	size:'small'
				// },
				{
					name:'首页',
					name_code:'hunterPosition',
					icon:'/static/footer_icon/shouye1.png',
					select_icon:'/static/footer_icon/shouye2.png',
					size:'small'
				},
				{
					name:'人才库',
					name_code:'talentContainer',
					icon:'/static/footer_icon/rencai1.png',
					select_icon:'/static/footer_icon/rencai2.png',
					size:'small'
				},
				{
					name:'任务',
					name_code:'task',
					icon:'/static/footer_icon/renwu1.png',
					select_icon:'/static/footer_icon/renwu2.png',
					size:'small'
				},
				{
					name:'我的',
					name_code:'hunterMy',
					icon:'/static/footer_icon/wode1.png',
					select_icon:'/static/footer_icon/wode2.png',
					size:'small'
				}
			]
			
			ctx.commit("change_nav_list",menu_list)
		},
	}
}