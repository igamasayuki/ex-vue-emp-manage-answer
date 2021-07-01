import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
  {
    path: "/loginAdmin",
    name: "loginAdmin",
    component: () => import("../components/LoginAdmin.vue"),
  },
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
