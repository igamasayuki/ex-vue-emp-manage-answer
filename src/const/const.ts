// グローバル定数

// 参考：https://konprogrammer.hatenablog.com/entry/2020/02/26/122607

// Object.freezeを使用しないと外部で値を書き換えることが出来る
// Object.freezeはネストしたオブジェクトまで見ないので、Objectの中でObjectを宣言する場合、宣言するObjectにもObject.freezeをつける
export default Object.freeze({
  EMP_WEBAPI_URL: "http://153.127.48.168:8080/ex-emp-api",
});

// 使用方法
// import config from "../const/const";
// const response = await axios.get(
//   `${config.EMP_WEBAPI_URL}/employee/employees`
// );
