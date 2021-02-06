import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//then you use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    //code to come
    state: {
        token: localStorage.getItem('apitoken'),
        user: {}
    },
    mutations: {
        auth_success(state, token, user) {
            state.token = token,
            state.user = user
        }
    },
    actions: {
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('apitoken')
                delete axios.defaults.headers.common['X-AUTH-TOKEN']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token
    }
});