<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data: () => ({ 
    hydrated: false,
    currentUserInfo: null
    }),
  mounted() {
    this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;
    let urlString = window.location.href;
    let url = new URL(urlString)
    let obj = url.searchParams.get("currentUserInfo")
    let curInfo = JSON.parse(obj);
    let currentUserInfo = {
      memberNum: url.searchParams.get("mNum"),
      participationNum: url.searchParams.get("pNum"),
    };
    this.currentUserInfo = currentUserInfo;
    console.log(this.currentUserInfo.memberNum);
    console.log(this.currentUserInfo.participationNum);
    console.log(curInfo);
  },
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
