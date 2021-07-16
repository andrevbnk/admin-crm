import Vue from 'vue'
import VueRouter from 'vue-router'
import TreeView from '../views/TreeView.vue'
import FolderTree from '../views/FolderTree.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tree',
    name: 'Tree',
    component: TreeView
  },
  {
    path: '/folder-tree',
    name: 'Tree',
    component: FolderTree
  },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
