import Vue from 'vue'
import Vuex from 'vuex'
import data from '../../assets/json/data.json'

Vue.use(Vuex)

const state = {
	list: data.list,
	user: '',
	isLogin: false,
}

const mutations = {
	ADDTODOS(state,title){
		if(title===""){
			return
		}
		let obj = {
			"status": 0,
			"content": title
		}
		state.list.push(obj);
		title = "";
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
	LOGINACTION(state,user,list){
		state.isLogin = true
		state.user = user
		state.list = list
	},
	LOGOUTACTION(state,user){
		state.isLogin = false
		state.user = ""
		state.list = data.list
	},
}

export default new Vuex.Store({
    state,
    mutations,
})
