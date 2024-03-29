<template>
  <div class="container">
    <div class="row">
      <fieldset>
        <legend>従業員情報</legend>
        <table>
          <tr>
            <th nowrap>従業員名</th>
            <td>
              <span>{{ currentEmployee.name }}</span>
            </td>
          </tr>
          <tr>
            <th nowrap>写真</th>
            <td>
              <img v-bind:src="currentEmployeeImage" />
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
              <div class="input-field col s12">
                <div class="error">{{ errorMessage }}</div>
                <input
                  id="dependentsCount"
                  type="text"
                  class="validate"
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
          v-on:click="update"
        >
          更新
        </button>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";
// グローバル定数の読み込み
import config from "@/const/const";

/**
 * 従業員情報を表示するコンポーネント.
 */
@Component
export default class EmployeeDetail extends Vue {
  // 従業員情報
  // 初期値で初期化しなければtemplateでidなどが存在しないということでエラーとなる
  private currentEmployee = new Employee(
    0,
    "XXXX",
    "/img/noImage.png",
    "XXXX",
    "2020-1-1",
    "XXXX",
    "XXXX",
    "XXXX",
    "XXXX",
    0,
    "XXXX",
    0
  );
  // エラーメッセージ
  private errorMessage = "";
  // 画像ファイル名
  private currentEmployeeImage = "";
  // 扶養人数
  private currentDependentsCount = 0;

  /**
   * VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の従業員情報を取得する.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のGetterを呼ぶ。
   * ライフサイクルフックのcreatedイベント利用
   */
  created(): void {
    // 送られてきたリクエストパラメータのidをnumberに変換して取得する
    const employeeId = Number(this.$route.params.id);

    // VuexストアのGetter、getEmployeeById()メソッドに先ほど取得したIDを渡し、１件の従業員情報を取得し、戻り値をcurrentEmployeeに代入する
    this.currentEmployee = this.$store.getters.getEmployeeById(employeeId);

    // 取得した従業員情報から画像ファイル名を取り出し、外部WebAPIサーバー内のimgディレクトリからパスを指定して取得し、currentEmployeeImageに代入する
    this.currentEmployeeImage = `${config.EMP_WEBAPI_URL}/img/${this.currentEmployee.image}`;

    // 取得した従業員情報から扶養人数を取り出し、currentDependentsCountに代入する
    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }

  /**
   * 扶養人数を更新する.
   *
   * 本メソッドは非同期でWebAPIを呼び出し扶養人数を更新するためasync/await axiosを利用しています。これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async update(): Promise<void> {
    const response = await axios.post(
      `${config.EMP_WEBAPI_URL}/employee/update`,
      {
        id: this.currentEmployee.id,
        dependentsCount: this.currentDependentsCount,
      }
    );
    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      // 成功なら従業員一覧画面に遷移する
      this.$router.push("/employeeList");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "更新できませんでした(" + response.data.message + ")";
    }
  }
}
</script>
