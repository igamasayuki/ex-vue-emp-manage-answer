<template>
  <!-- <div class="registerAdmin">
    <div class="error">{{ errorMessage }}</div>
    <form>
      <div>名前：<input type="text" v-model="name" /></div>
      <div>メールアドレス：<input type="text" v-model="mailAddress" /></div>
      <div>パスワード：<input type="password" v-model="password" /></div>
      <button type="button" v-on:click="registerAdmin">登録</button>
    </form>
  </div> -->
  <div class="container">
    <div class="row register-page">
      <div class="error">{{ errorMessage }}</div>
      <form class="col s12" id="reg-form" action="login.html">
        <div class="row">
          <div class="input-field col s6">
            <input
              id="last_name"
              type="text"
              class="validate"
              v-model="lastName"
              required
            />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              v-model="firstName"
              required
            />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              v-model="mailAddress"
              required
            />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              minlength="8"
              v-model="password"
              required
            />
            <label for="password">パスワード</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <button
              class="btn btn-large btn-register waves-effect waves-light"
              type="submit"
              name="action"
              v-on:click="registerAdmin"
            >
              登録
              <i class="material-icons right">done</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class RegisterAdmin extends Vue {
  lastName = "";
  firstName = "";
  mailAddress = "";
  password = "";
  errorMessage = "";

  // 非同期でWebAPIを呼び出しログインする
  async registerAdmin() {
    await axios
      .post("http://localhost:8080/ex-emp/insert", {
        name: this.lastName + " " + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      })
      .then((response) => {
        console.dir("response:" + JSON.stringify(response));
        if (response.data.status == "success") {
          // ログイン画面に遷移する
          this["$router"].push("/loginAdmin");
        } else {
          this.errorMessage =
            "登録できませんでした(" + response.data.message + ")";
        }
      });
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
