import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/employeeDetail/:id",
    name: "employeeDetail",
    component: () => import("../components/EmployeeDetail.vue"),
  },
  {
    path: "/employeeList",
    name: "employeeList",
    component: () => import("../components/EmployeeList.vue"),
  },
  {
    path: "/registerAdmin",
    name: "registerAdmin",
    component: () => import("../components/RegisterAdmin.vue"),
  },
  // {
  //   path: "/compLoginAdmin",
  //   name: "CompLoginAdmin",
  //   component: () => import("../components/CompLoginAdmin.vue"),
  // },
  // 最終的な受け皿
  // {
  //   path: "*",
  //   redirect: "/",
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
