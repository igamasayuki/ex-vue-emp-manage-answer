<template>
  <div class="container">
    <div>従業員数:{{ getEmployeeCount }}人</div>
    <div class="row">
      <table class="striped">
        <thead>
          <tr>
            <th>名前</th>
            <th>入社日</th>
            <th>扶養人数</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee of getEmployees" v-bind:key="employee.id">
            <td>
              <router-link :to="'/employeeDetail/' + employee.id">{{
                employee.name
              }}</router-link>
            </td>
            <td>{{ employee.hireDate }}</td>
            <td>{{ employee.dependentsCount }}人</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";

@Component
export default class EmployeeList extends Vue {
  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のアクションを呼ぶ(ディスパッチする)。
   * ライフサイクルフックのcreatedイベント利用
   */
  created(): void {
    this["$store"].dispatch("getEmployeeList");
  }

  /**
   * 非同期で取得したVuexストア内の従業員数を取得し返す.
   *
   * @returns 従業員数
   */
  get getEmployeeCount(): number {
    return this["$store"].getters.getEmployeeCount;
  }
  /**
   * 非同期で取得したVuexストア内の従業員一覧を取得し返す.
   *
   * @returns 従業員一覧情報
   */
  get getEmployees(): Array<Employee> {
    return this["$store"].getters.getEmployees;
  }
}
</script>
