<template>
  <div id="app">
    <Tit />
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<script>
import Tit from "./components/Tit.vue";
import TabBar from "./components/TabBar.vue";

export default {
  name: "App",
  data() {
    return {
      dataFromSearch: [],
    };
  },
  components: {
    Tit,
    TabBar,
  },
};
</script>

<style scoped>
</style>