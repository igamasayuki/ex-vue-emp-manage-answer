import { Employee } from "@/types/employee";
import Vue from "vue";
import Vuex from "vuex";
// 使うためには「
// npm install axios --save ←これだけでOK
// npm i axios ←不要
// npm i -D @types/axios ←不要
//」を行う
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    totalEmployeeCount: 0,
    employees: new Array<Employee>(),
  },
  mutations: {
    addEmployeeList(state, payload) {
      // console.dir("payload:" + JSON.stringify(payload));
      console.log("totalEmployeeCount:" + payload.totalEmployees);
      state.totalEmployeeCount = payload.totalEmployees;
      state.employees = new Array<Employee>();
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
      // console.log("employees:" + state.employees);
    },
  }, // end mutations
  getters: {
    getEmployeeCount(state) {
      return state.employees.length;
    },
    getEmployees(state) {
      return state.employees;
    },
  }, // end getters
  actions: {
    async getEmployeeList({ commit }, payload) {
      await axios
        .get("http://localhost:8080/ex-emp/employee/employees")
        .then((response) => {
          // console.dir("response:" + JSON.stringify(response));
          payload = response.data; // responseデータの中のdataをペイロードに渡す
        });
      commit("addEmployeeList", payload); // ミューテーションの呼び出し
    },
    async updateEmployee(context, payload) {
      await axios
        .post("http://localhost:8080/ex-emp/employee/update", {
          id: payload.employee.id,
          dependentsCount: payload.employee.dependentsCount,
        })
        .then((response) => {
          console.dir("response:" + JSON.stringify(response));
          // payload = response.data; // responseデータの中のdataをペイロードに渡す
        });
      // ミューテーションの呼び出し
      // context.commit("addEmployeeList", payload);
      // 従業員一覧ページへ
      context.dispatch("getEmployeeList", payload);
    },
  }, // end actions
  modules: {},
});
