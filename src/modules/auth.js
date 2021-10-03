import axios from 'axios';
import router from '@/router';

const state = {
    user: null,
};

const getters = {
    isAuthenticated: state => !!state.user,    
    StateUser: state => state.user,
    userId: state => state.user?.id,
};

const actions = {
    async AUTH_LOGIN({commit}, User) {
		try{
			const res = await axios.post('/auth/login', User);
			
			axios.defaults.headers.common['x-access-token'] = res.data.token;
			axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
			await commit('SetUser', res.data);
            
			router.push({ name: 'TreeView'}).catch(()=>{});

			return true;
		} catch(e){
			console.log(e);
		}
      },
      
    async AUTH_LOGOUT({commit}){
        let user = null;
        commit('LogOut', user)
    },

    async AUTH_SETNAME({commit},username){
        commit('SetName', username)
    },

};
const mutations = {
    SetUser(state, user){
        state.user = user;
    },
    SetName(state,username){
        state.user.username = username;
    },
    LogOut(state){
        delete axios.defaults.headers.common['x-access-token'];
        delete axios.defaults.headers.common['Authorization'];
        state.user = null;
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};

