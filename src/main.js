import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'


import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
const defaultoptions = {treeName:'blocks-tree'};

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(VueBlocksTree,defaultoptions)

app.mount('#app')
