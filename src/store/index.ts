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
  actions: {
    /**
     * 従業員一覧情報をWebAPIから取得する.
     *
     * @param context コンテキスト
     */
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://localhost:8080/ex-emp/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data; // responseデータの中のdataをペイロードに渡す
      context.commit("addEmployeeList", payload); // ミューテーションの呼び出し
    },
    /**
     * 扶養人数を更新する.
     *
     * @param context コンテキスト
     * @param payload ペイロード(従業員IDと扶養人数)
     */
    async updateEmployee(context, payload) {
      const response = await axios.post(
        "http://localhost:8080/ex-emp/employee/update",
        {
          id: payload.employee.id,
          dependentsCount: payload.employee.dependentsCount,
        }
      );
      console.dir("response:" + JSON.stringify(response));
      // 従業員一覧ページへ(アクションの呼び出し)
      context.dispatch("getEmployeeList");
    },
  }, // end actions
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
  modules: {},
});
