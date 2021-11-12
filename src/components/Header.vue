<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <router-link to="/"
            ><img class="logo" src="/img/header_logo.png"
          /></router-link>
        </div>

        <div class="header-right">
          <router-link to="/registerAdmin">
            管理者登録
          </router-link>
          <router-link to="/loginAdmin">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
          <router-link to="/logoutAdmin">
            <i class="fas fa-sign-in-alt"></i>ログアウト
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  height: 65px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
}

.header {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  /* justify-content: flex-end; 右寄せにしたい場合*/
}

.logo {
  width: 130px;
  margin-top: 15px;
}

.header-right {
  margin-left: auto; /* ヘッダ右側のリンクだけ右寄せにする(ロゴは左寄せのまま) */
  /* float: right; */
  display: flex; /* ヘッダ右側のリンクを横に並べる */
}

.header-right a {
  line-height: 65px; /* 行の高さを指定(文字が上下の真ん中に配置される) */
  padding: 0 25px;
  color: gray;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  /* float: left; */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}

/* fontawesome(ログインアイコンの設定) */
.fas {
  margin-right: 5px;
}
</style>
