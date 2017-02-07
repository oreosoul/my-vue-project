import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	list:[
		{status: 0,content: '未完成'},
		{status: 1,content: '已完成'},
		{status: 2,content: '已移除'},
	],
	user: '',
	isLogin: false,
}

const mutations = {
	ADDTODOS(state,title){
		if(title===''){
			return
		}
		let obj = {
			status: 0,
			content: title
		}
		state.list.push(obj);
		title = '';
	},
	FINISHTODO(state,index){
		let list = state.list;
		list[index].status = 1;
		state.list = list;
	},
	REMOVETODO(state,index){
		let list = state.list;
		list[index].status = 2;
		state.list = list;
	},
	DELETETODO(state,index){
		state.list.splice(index,1);
	},
	UNFINISHTODO(state,index){
		let list = state.list;
		list[index].status = 0;
		state.list = list;
	},
	LOGINACTION(state,user){
		state.isLogin = true
		state.user = user
	},
	LOGOUTACTION(state,user){
		state.isLogin = false
		state.user = ""
	},
}

export default new Vuex.Store({
    state,
    mutations,
})
