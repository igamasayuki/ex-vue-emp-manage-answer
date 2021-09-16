<template>
  <!-- <div class="registerAdmin">
    <div class="error">{{ errorMessage }}</div>
    <form>
      <div>メールアドレス：<input type="text" v-model="mailAddress" /></div>
      <div>パスワード：<input type="password" v-model="password" /></div>
      <button type="button" v-on:click="loginAdmin">ログイン</button>
    </form>
  </div> -->
  <div class="container">
    <div class="row login-page">
      <div class="col s12 z-depth-6 card-panel">
        <div class="error">{{ errorMessage }}</div>
        <form class="login-form">
          <div class="row"></div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input
                class="validate"
                id="mailAddress"
                type="email"
                v-model="mailAddress"
              />
              <label for="mailAddress" data-error="wrong" data-success="right"
                >メールアドレス</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="password" type="password" v-model="password" />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <button
                class="btn btn-register waves-effect waves-light col s12"
                type="button"
                name="action"
                v-on:click="loginAdmin"
              >
                ログイン
              </button>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m6 l6">
              <p class="margin medium-small">
                <router-link to="/registerAdmin"
                  >管理者登録はこちら</router-link
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LoginAdmin extends Vue {
  errorMessage = "";
  mailAddress = "";
  password = "";

  // 非同期でWebAPIを呼び出し管理者情報を登録する
  async loginAdmin(): Promise<void> {
    const response = await axios.post("http://localhost:8080/ex-emp/login", {
      mailAddress: this.mailAddress,
      password: this.password,
    });
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status == "success") {
      // 従業員一覧に遷移する
      this["$router"].push("/employeeList");
    } else {
      this.errorMessage =
        "ログインに失敗しました(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 600px;
}
</style>
