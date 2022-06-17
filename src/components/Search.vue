<!-- ##### INTRODUCTION: #####
1. 说明：搜索框
2. 功能：实现搜索歌曲/歌手等关键字
3. 接口：cloudsearch，获取数据，地址/cloudsearch?keywords
4. 必选参数：keywords，关键词可以多个以空格隔开
5. 参数传递：页面跳转至/searchRes，且将数据resArr需传递至SearchRes中渲染
-->

<template>
  <van-search
    v-model="value"
    placeholder="输入关键词回车搜索"
    shape="round"
    background="#242424"
    v-on:keypress="search($event)"
  />
</template>

<script>
export default {
  data() {
    return {
      value: "",
      resArr: [],
    };
  },
  methods: {
    search(evt) {
      if (evt.keyCode == 13) {
        this.$axios
          .get(`./netease/search?keywords=${this.value}`)
          .then((res) => {
            this.resArr = [];
            for (var i = 0; i < res.data.result.songs.length; i++) {
              let songId = res.data.result.songs[i].id;
              let songName = res.data.result.songs[i].name;
              let artist = res.data.result.songs[i].artists[0].name;
              let durationMin = parseInt(
                res.data.result.songs[i].duration / 1000 / 60
              );
              let durationSec = parseInt(
                (res.data.result.songs[i].duration / 1000) % 60
              );
              if (durationSec < 10) durationSec = "0" + durationSec;
              let albumId = res.data.result.songs[i].album.id;
              this.resArr.push({
                songId,
                songName,
                artist,
                duration: `${durationMin}:${durationSec}`,
                albumId,
              });
            }
            // 传递给SearchRes.vue数据;
            this.$emit("getDataFromSearch", this.resArr);
            // 跳转地址;
            if (this.$router.currentRoute.fullPath != "/searchRes") {
              this.$router.push("/searchRes");
            }
          });
      }
    },
  },
};
</script>
