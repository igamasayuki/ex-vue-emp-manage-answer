import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
// 使うためには「
// npm install axios --save
//」を行う
import axios from "axios";
// グローバル定数の読み込み
import config from "../const/const";
// 使うためには「npm install --save vuex-persistedstate」を行う
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    totalEmployeeCount: 0,
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    /**
     * 従業員一覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param context - コンテキスト
     */
    async getEmployeeList(context) {
      // WebAPIから従業員一覧情報を取得する
      const response = await axios.get(
        `${config.EMP_WEBAPI_URL}/employee/employees`
      );
      // 取得したJSONデータをコンソールに出力して確認
      // console.dir("response:" + JSON.stringify(response));
      // 取得したresponseデータの中のdataを取り出してpayload変数に格納する
      const payload = response.data;
      // showEmployeeListという名前のミューテーションを呼び出す
      // (contextオブジェクトのcommitメソッドを呼び出す)
      // その際、先程payload変数に格納したデータを第２引数に渡す
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     *
     * @param context - コンテキスト
     * @param payload - WebAPIから取得した従業員情報(JSON)
     */
    showEmployeeList(state, payload) {
      // console.dir("payload:" + JSON.stringify(payload));
      console.log("totalEmployeeCount:" + payload.totalEmployeeCount);
      // payloadの中(WebAPIから取得したJSON)のtotalEmployeeCountをstateのtotalEmployeeCountに代入する
      state.totalEmployeeCount = payload.totalEmployeeCount;
      // payloadの中(WebAPIから取得したJSON)のemployeesをstateのemployeesに代入する
      // state.employees = payload.employees;
      // 初期化(やらないと従業員一覧表示するたびに追加されていくため)
      state.employees = new Array<Employee>();
      // 今回EmployeeオブジェクトのformatHireDateメソッドを
      // 使用するため、Employeeオブジェクトの配列に変換する必要あり
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
     * @param state - ステート
     * @returns 従業員数
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
      // 下記でも同様に動きます
      // return state.employees.length;
    },
    /**
     * 従業員一覧を返す.
     *
     * @param state - ステート
     * @returns 従業員一覧情報「
     */
    getEmployees(state) {
      console.dir(JSON.stringify(state.employees));
      const array = new Array<Employee>();
      for (const employee of state.employees) {
        array.push(
          new Employee(
            employee._id,
            employee._name,
            employee._image,
            employee._gender,
            employee._hireDate,
            employee._mailAddress,
            employee._zipCode,
            employee._address,
            employee._telephone,
            employee._salary,
            employee._characteristics,
            employee._dependentsCount
          )
        );
      }
      return array;
    },
    /**
     * IDから従業員を検索し返す.
     *
     * @param state - ステート
     * @returns 従業員情報
     */
    getEmployeeById(state) {
      // 渡されたIDで絞り込んだEmployeeオブジェクトを1件返す
      return (employeeId: number) => {
        // const employees = state.employees.filter(
        //   (employee) => employee._id == employeeId
        // );

        for (const employee of state.employees) {
          if (employee._id === employeeId) {
            return new Employee(
              employee._id,
              employee._name,
              employee._image,
              employee._gender,
              employee._hireDate,
              employee._mailAddress,
              employee._zipCode,
              employee._address,
              employee._telephone,
              employee._salary,
              employee._characteristics,
              employee._dependentsCount
            );
          }
        }
      };
    },
  }, // end getters
  modules: {}, // end modules
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
