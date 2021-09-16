import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
// 使うためには「
// npm install axios --save
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
      // WebAPIから従業員一覧情報を取得する
      const response = await axios.get(
        "http://localhost:8080/ex-emp/employee/employees"
      );
      // 取得したJSONデータをコンソールに出力して確認
      console.dir("response:" + JSON.stringify(response));
      // responseデータの中のdataを取り出す
      const payload = response.data;
      // ミューテーションの呼び出し、先程取得したデータをペイロードとして渡す
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成して表示する.
     *
     * @param context コンテキスト
     * @param payload WebAPIから取得した従業員情報(JSON)
     */
    showEmployeeList(state, payload) {
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
    },
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     *
     * @param state ステート
     * @returns 従業員数
     */
    getEmployeeCount(state) {
      return state.employees.length;
    },
    /**
     * 従業員一覧を返す.
     *
     * @param state ステート
     * @returns 従業員一覧情報「
     */
    getEmployees(state) {
      return state.employees;
    },
    /**
     * IDから従業員を検索し返す.
     *
     * @param state ステート
     * @returns 従業員情報
     */
    getEmployeeById(state) {
      // 部分一致で絞り込んだStudentオブジェクトのみを返す
      return (employeeId: number) => {
        const employees = state.employees.filter(
          (employee) => employee.id == employeeId
        );
        return employees[0];
      };
    },
  }, // end getters
  modules: {},
});
