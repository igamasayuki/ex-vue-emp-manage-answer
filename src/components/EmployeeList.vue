<template>
  <div class="show-employee-list">
    <!-- <el-button v-on:click="getEmployeeListFromApi">従業員一覧取得</el-button> -->
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
              <td>{{ employee.dependentsCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EmployeeList extends Vue {
  // ライフサイクルフック(インスタンスがページに紐つけられたタイミング)
  mounted(): void {
    // 非同期でWebAPIから従業員一覧を取得しに行く
    this["$store"].dispatch("getEmployeeList");
  }

  // getEmployeeListFromApi(): void {
  //   this["$store"].dispatch("getEmployeeList");
  // }
  // 非同期で取得した従業員一覧を取得し返す
  get getEmployees(): void {
    return this["$store"].getters.getEmployees;
  }
  // 非同期で取得した従業員数を取得し返す
  get getEmployeeCount(): void {
    // return this["$store"].state.totalEmployeeCount;
    return this["$store"].getters.getEmployeeCount;
  }
}
</script>
