<template>
  <!-- <div class="show-employee-detail">
    <div>{{ currentEmployee.id }}</div>
    <div>{{ currentEmployee.name }}</div>
    <div>{{ currentEmployee.image }}</div>
    <div>{{ currentEmployee.gender }}</div>
    <div>{{ currentEmployee.hireDate }}</div>
    <div>{{ currentEmployee.mailAddress }}</div>
    <div>{{ currentEmployee.zipCode }}</div>
    <div>{{ currentEmployee.address }}</div>
    <div>{{ currentEmployee.telephone }}</div>
    <div>{{ currentEmployee.salary }}</div>
    <div>{{ currentEmployee.image }}</div>
    <div>{{ currentEmployee.characteristics }}</div>
    <div>{{ currentEmployee.dependentsCount }}</div>
    <form>
      <input type="text" v-model="currentDependentsCount" />
      <button type="button" v-on:click="update">更新</button>
    </form>
  </div> -->
  <div class="container">
    <div class="row">
      <form action="employeeList.html">
        <fieldset>
          <legend>従業員情報</legend>

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
                    <!-- <label for="dependentsCount">扶養人数</label> -->
                  </div>
                </td>
              </tr>
            </table>

            <button
              class="btn btn-register waves-effect waves-light"
              type="submit"
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

@Component
export default class EmployeeDetail extends Vue {
  currentEmployee = null;
  // currentEmployee :Employee;
  currentEmployeeId = 0;
  currentDependentsCount = 0;

  // ライフサイクルフック(インスタンスが生成タイミング：mountedだとcurrentEmployeeがnullのためエラーが出る)
  created(): void {
    console.log("created(Vueインスタンスが生成タイミング)");

    const employeeId = parseInt(this["$route"].params.id);
    console.log("employeeId:" + employeeId);

    this.currentEmployee = this["$store"].state.employees.find(
      (element: Employee) => element.id == employeeId
    );
    this.currentEmployeeId = this.currentEmployee.id;
    this.currentDependentsCount = this.currentEmployee.dependentsCount;
    console.log(this.currentEmployee);
  }

  // 非同期でWebAPIを呼び出し扶養人数を更新する
  update(): void {
    console.log("this.currentEmployeeId : " + this.currentEmployeeId);
    console.log("this.currentDependentsCount : " + this.currentDependentsCount);
    // console.log("this.currentEmployeeId : " + this.currentEmployee!.id);
    // console.log("this.currentDependentsCount : " + this.currentEmployee!.id);
    this["$store"].dispatch("updateEmployee", {
      employee: {
        id: this.currentEmployeeId,
        dependentsCount: this.currentDependentsCount,
      },
    });
    // 従業員一覧画面に遷移する
    this["$router"].push("/employeeList");
  }
}
</script>
