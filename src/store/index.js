import Vue from 'vue'
import Vuex from 'vuex'
import { get } from "@/utils/http"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    fromDate:false,
    role:{}
  },
  getters: {
  },
  mutations: {
    getRow(state,payload){
      state.row=payload
    },
    removeRow(state){
      state.row={}
    },
    changefromDate(state,payload){
      state.fromDate=payload
    },
    setrole(state,payload){
      state.role=payload
    }

  },
  actions: {
    async getrole({commit}){
            let {role}=await get ("/getrole")
            commit("setrole",role)
    }
  },
  modules: {
  }
})
