<!-- ##### INTRODUCTION: #####
1. 说明：底部导航条
2. 功能：实现导航和地址的转换(监听地址)
3. 接口：无接口
-->

<template>
  <div>
    <van-tabbar v-model="active" active-color="#C20C0C" @change="onChange">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="play-circle">播放</van-tabbar-item>
      <van-tabbar-item icon="friends">登录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("/home") != -1) {
        this.active = 0;
      } else if (to.fullPath.indexOf("/searchRes") != -1) {
        this.active = 1;
      } else if (to.fullPath.indexOf("/play") != -1) {
        this.active = 2;
      } else if (to.fullPath.indexOf("/login") != -1) {
        this.active = 3;
      }
    },
  },
  methods: {
    onChange(index) {
      if (index == 0 && this.$router.fullPath != "/home")
        this.$router.push("./home");
      else if (index == 1 && this.$router.fullPath != "/searchRes")
        this.$router.push("./searchRes");
      else if (index == 2 && this.$router.fullPath != "/play")
        this.$router.push("./play");
      else if (index == 3 && this.$router.fullPath != "/login")
        this.$router.push("./login");
    },
  },
};
</script>
<style scoped>
.van-tabbar-item {
  color: #dbd8d8;
  background-color: #242424;
}
.van-tabbar-item--active {
  background-color: rgba(36, 36, 36, 0.9);
  box-sizing: border-box;
  font-weight: bold;
  /* color: #e60026 !important; */
}
</style>
