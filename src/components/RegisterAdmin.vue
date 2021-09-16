<template>
  <div class="container">
    <div class="row register-page">
      <div class="error" v-for="error of errors" v-bind:key="error">
        {{ error }}
      </div>
      <div class="error">{{ errorMessage }}</div>
      <form class="col s12" id="reg-form">
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
              type="button"
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
  errors: Array<string> = [];
  errorMessage = "";
  lastName = "";
  firstName = "";
  mailAddress = "";
  password = "";

  /**
   * 管理者情報を登録する.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出し管理者登録をするためasync/await axiosを利用しています。これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async registerAdmin(): Promise<void> {
    // エラーチェック
    this.errors = [];
    if (this.lastName === "" || this.firstName === "") {
      this.errors.push("姓または名が入力されていません");
    }
    if (this.mailAddress === "") {
      this.errors.push("メールアドレスが入力されていません");
    }
    if (this.password === "") {
      this.errors.push("パスワードが入力されていません");
    }
    // エラーが１つ以上あれば処理を止める
    if (0 < this.errors.length) {
      return;
    }

    // 管理者登録処理
    const response = await axios.post("http://localhost:8080/ex-emp/insert", {
      name: this.lastName + " " + this.firstName,
      mailAddress: this.mailAddress,
      password: this.password,
    });
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status === "success") {
      // 成功ならログイン画面に遷移する
      this["$router"].push("/loginAdmin");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "登録できませんでした(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
