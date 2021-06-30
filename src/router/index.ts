import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: "/compEmployeeDetail/:id",
  //   name: "CompEmployeeDetail",
  //   component: () => import("../components/CompEmployeeDetail.vue"),
  // },
  // {
  //   path: "/compEmployeeList",
  //   name: "CompEmployeeList",
  //   component: () => import("../components/CompEmployeeList.vue"),
  // },
  // {
  //   path: "/compRegisterAdmin",
  //   name: "CompRegisterAdmin",
  //   component: () => import("../components/CompRegisterAdmin.vue"),
  // },
  // {
  //   path: "/compLoginAdmin",
  //   name: "CompLoginAdmin",
  //   component: () => import("../components/CompLoginAdmin.vue"),
  // },
  // 最終的な受け皿
  {
    path: "*",
    redirect: "/",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
