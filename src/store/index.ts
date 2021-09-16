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
    // /**
    //  * 管理者情報を登録する.
    //  *
    //  * @param context コンテキスト
    //  * @param payload ペイロード(管理者名、メールアドレス、パスワード)
    //  */
    // async registerAdmin(context, payload) {
    //   alert("Vuexストア#registerAdmin()呼ばれた");
    //   // alert("payload" + payload);
    //   // console.dir("payload:" + JSON.stringify(payload));
    //   // WebAPIを使用して管理者情報を登録する
    //   const response = await axios.post("http://localhost:8080/ex-emp/insert", {
    //     name: payload.administrator.name,
    //     mailAddress: payload.administrator.mailAddress,
    //     password: payload.administrator.password,
    //   });
    //   // 取得したJSONデータをコンソールに出力して確認
    //   console.dir("response:" + JSON.stringify(response));
    //   if (response.data.status !== "success") {
    //     throw new Error("登録できませんでした(" + response.data.message + ")");
    //   }
    // },
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
      // console.log("employees:" + state.employees);
    },
  }, // end mutations
  getters: {
    /**
     * 指定されたメールアドレスに一致する従業員の配列を返す.
     *
     * @param state ステート
     * @returns 指定されたメールアドレスに一致する従業員の配列
     */
    getSearchStudentByMailAddress(state) {
      // 部分一致で絞り込んだStudentオブジェクトのみを返す
      return (mailAddress: string) => {
        return state.employees.filter(
          (employee) => employee.mailAddress === mailAddress
        );
      };
    },
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
     * @returns 従業員一覧
     */
    getEmployees(state) {
      return state.employees;
    },
  }, // end getters
  modules: {},
});
