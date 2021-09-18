import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/employeeDetail/:id",
    component: () => import("../components/EmployeeDetail.vue"),
  },
  {
    path: "/employeeList",
    component: () => import("../components/EmployeeList.vue"),
  },
  {
    path: "/loginAdmin",
    component: () => import("../components/LoginAdmin.vue"),
  },
  {
    path: "/registerAdmin",
    component: () => import("../components/RegisterAdmin.vue"),
  },
  // パスが登録されていない場合はログイン画面へ
  {
    path: "*",
    component: () => import("../components/LoginAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
