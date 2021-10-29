import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/logoutAdmin",
    component: () => import("../views/LoginAdmin.vue"),
  },
  {
    path: "/employeeDetail/:id",
    component: () => import("../views/EmployeeDetail.vue"),
  },
  {
    path: "/employeeList",
    component: () => import("../views/EmployeeList.vue"),
  },
  {
    path: "/loginAdmin",
    component: () => import("../views/LoginAdmin.vue"),
  },
  {
    path: "/registerAdmin",
    component: () => import("../views/RegisterAdmin.vue"),
  },
  // パスが登録されていない場合はログイン画面へ
  {
    path: "*",
    component: () => import("../views/LoginAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
