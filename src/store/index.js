import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";
import auth from '@/modules/auth';
import axios from 'axios';
import { refit_keys } from '@/util/recurTree';
Vue.use(Vuex);

const authState = createPersistedState({
	paths:['auth'],
})


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
	async getTree() {
		const result = await axios.get('/dialog');
		return refit_keys(result.data, 'options', 'children')
	},

	
	async saveTree() {
		// axios.patch('/saveDialog',this.dialog);
		return new Promise((resolve)=>{
			setTimeout(() => {
				resolve(true);
			}, 10);
		});
	},

	downloadJson({commit},tree) {
		console.log(commit);
		const json = JSON.stringify(tree);
		let blob = new Blob([json], {
			type: "application/json",
		}); // 2. Get the blob setting file type in the response object returned by the request. Here is excel as an example.
		let url = window.URL.createObjectURL(blob); // 3. Create a temporary url pointing to the blob object
	
		// 4. After creating the url, you can simulate a series of operations on this file object, for example: preview, download
		let a = document.createElement("a");
		a.href = url;
		a.download = "Dialog Tree.json";
		a.click();
		// 5. Release this temporary object url
		window.URL.revokeObjectURL(url);
	}
  },
  modules: {
	auth,
  },
  plugins: [authState],
})
