<template>
  <div class="container">
    <div class="row register-page">
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
// グローバル定数の読み込み
import config from "../const/const";

/**
 * 管理者登録をするコンポーネント.
 */
@Component
export default class RegisterAdmin extends Vue {
  // 登録失敗時のエラーメッセージ
  private errorMessage = "";
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";

  /**
   * 管理者情報を登録する.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出し管理者登録をするためasync/await axiosを利用しています。これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * 動作確認用curlコマンド
   * curl -X POST -H "Content-Type: application/json" -d '{"name":"テスト太郎","mailAddress":"test10@gmail.com", "password":"testtesttest"}' "http://153.127.48.168:8080/ex-emp-api/insert"
   * @returns Promiseオブジェクト
   */
  async registerAdmin(): Promise<void> {
    // 管理者登録処理
    const response = await axios.post(`${config.EMP_WEBAPI_URL}/insert`, {
      name: this.lastName + " " + this.firstName,
      mailAddress: this.mailAddress,
      password: this.password,
    });

    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      // 成功ならログイン画面に遷移する
      this.$router.push("/loginAdmin");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "登録できませんでした(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}
</style>
