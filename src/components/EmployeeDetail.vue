<template>
  <div class="container">
    <div class="row">
      <form action="employeeList.html">
        <fieldset>
          <legend>従業員情報</legend>
          <div class="error">{{ errorMessage }}</div>
          <form>
            <table class="striped">
              <tr>
                <th nowrap>従業員名</th>
                <td>
                  <span>{{ currentEmployee.name }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>写真</th>
                <td>
                  <!-- <img src="{{ currentEmployee.image }}" /> -->
                </td>
              </tr>
              <tr>
                <th nowrap>性別</th>
                <td>
                  <span>{{ currentEmployee.gender }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>入社日</th>
                <td>
                  <span>{{ currentEmployee.hireDate }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>メールアドレス</th>
                <td>
                  <span>{{ currentEmployee.mailAddress }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>郵便番号</th>
                <td>
                  <span>{{ currentEmployee.zipCode }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>住所</th>
                <td>
                  <span>{{ currentEmployee.address }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>電話番号</th>
                <td>
                  <span>{{ currentEmployee.telephone }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>給料</th>
                <td>
                  <span>{{ currentEmployee.salary }}円</span>
                </td>
              </tr>
              <tr>
                <th nowrap>特性</th>
                <td>
                  <span>{{ currentEmployee.characteristics }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>扶養人数</th>
                <td>
                  <span>{{ currentEmployee.dependentsCount }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>扶養人数</th>
                <td>
                  <div class="input-field col s12">
                    <input
                      id="dependentsCount"
                      type="text"
                      class="validate"
                      value="3"
                      v-model="currentDependentsCount"
                      required
                    />
                  </div>
                </td>
              </tr>
            </table>

            <button
              class="btn btn-register waves-effect waves-light"
              type="button"
              name="action"
              v-on:click="update"
            >
              更新
            </button>
          </form>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "../types/employee";
import axios from "axios";

@Component
export default class EmployeeDetail extends Vue {
  // !はこの変数がnullでないことを保証する(Non-null assertion operator)
  // !がないと、update時の「this.currentEmployee.id」部分でコンパイルエラーになる
  currentEmployee!: Employee;
  errorMessage = "";
  currentDependentsCount = 0;

  // ライフサイクルフック(インスタンスが生成タイミング：mountedだとcurrentEmployeeがnullのためエラーが出る)
  created(): void {
    console.log("created(Vueインスタンスが生成タイミング)");

    const employeeId = parseInt(this["$route"].params.id);
    console.log("employeeId:" + employeeId);
    this.currentEmployee = this["$store"].getters.getEmployeeById(employeeId);
    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }

  /**
   * 扶養人数を更新する.
   *
   * 本メソッドは非同期でWebAPIを呼び出し扶養人数を更新するためasync/await axiosを利用しています。これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async update(): Promise<void> {
    console.log(this.currentEmployee.id);
    console.log(this.currentDependentsCount);
    const response = await axios.post(
      "http://localhost:8080/ex-emp/employee/update",
      {
        id: this.currentEmployee.id,
        dependentsCount: this.currentDependentsCount,
      }
    );
    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      // 成功なら従業員一覧画面に遷移する
      this["$router"].push("/employeeList");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "更新できませんでした(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
