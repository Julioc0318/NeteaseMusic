<!-- ##### INTRODUCTION: #####
1. 说明：搜索歌曲结果列表
2. 功能：展示歌曲列表，点击跳转(携带参数)
3. 接口：无接口
-->

<template>
  <van-cell-group>
    <van-cell
      :title="songName"
      :value="duration"
      :label="artist"
      v-on:click="toPlay"
    />
  </van-cell-group>
</template>

<script>
export default {
  // 从SearchRes中接收参数
  props: ["artist", "songId", "songName", "duration", "albumId"],
  methods: {
    toPlay() {
      // 跳转地址并夹杂参数给Play.vue
      if (this.$router.currentRoute.fullPath != "/play") {
        this.$router.push({
          // params 要想参数传递必须用 name 而不是 path
          name: "play",
          query: { songId: this.songId, albumId: this.albumId },
          params: { duration: this.duration },
        });
      }
    },
  },
};
</script>