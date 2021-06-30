<template>
  <footer>
    <div class="container">
      <div class="footer">
        <div class="footer-center">©️ xxx Inc.</div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  height: 65px;
  color: white;
  background-color: rgb(84, 92, 100);
}

.footer {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  /* justify-content: flex-end; 右寄せにしたい場合*/
}

.footer-center {
  margin: auto; /* ヘッダ右側のリンクだけ右寄せにする(ロゴは左寄せのまま) */
  /* float: right; */
  display: flex; /* ヘッダ右側のリンクを横に並べる */
}

</style>
