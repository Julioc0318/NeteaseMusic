<!-- ##### INTRODUCTION: #####
1. 说明：获取歌词并展示
2. 功能：展示歌词列表
3. 接口：/lyric?id=33894312
-->
<template>
  <div class="Lyric">
    <ul style="position: relative">
      <li
        v-for="(item, index) in lyricsObjArr"
        :key="index"
        :class="item.active"
      >
        {{ item.lyric }}
      </li>
    </ul>
    <p style="display: none">{{ lyricMatch }}</p>
  </div>
</template>

<script>
export default {
  props: ["currentTimeInSec"],
  data() {
    return { songId: "", lyricsObjArr: "", lyricActiveIndex: "" };
  },
  created() {
    this.songId = this.$route.query.songId;
    this.$axios.get(`./netease/lyric?id=${this.songId}`).then((res) => {
      let lyric = res.data.lrc.lyric;
      this.lyricsObjArr = lyricProcess(lyric);
    });
  },
  computed: {
    lyricMatch() {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (this.currentTimeInSec >= parseInt(this.lyricsObjArr[i].timeInSec)) {
        } else {
          i = i - 1;
          this.lyricActiveIndex = i;
          let ul = document.querySelector("ul");
          ul.style.top = `${this.lyricActiveIndex * -22 + 66}px`;
          ul.style.offsetTop = `${this.lyricActiveIndex * -22 + 66}px`;
          this.lyricsObjArr.forEach((item) => {
            item.active = "";
          });
          if (i == 0) this.lyricsObjArr[i].active = "active";
          if (i > 0) {
            this.lyricsObjArr[i].active = "active";
          }
          break;
        }
      }
    },
  },
};
function lyricProcess(lyric) {
  const regNewLine = /\n/;
  const lineArr = lyric.split(regNewLine); // 得到每行歌词的数组
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/g;
  const lyricObjArr = [];
  lineArr.forEach((item) => {
    if (item == "") return;
    const time = item.match(regTime);
    const min = time[0].slice(1, 3);
    const sec = time[0].slice(4, 6);
    const ms = time[0].slice(7, 9);
    const timeInSec = min * 60 + parseInt(sec) + "." + ms;
    const lyric = item.replace(time, "");
    lyricObjArr.push({ timeInSec, lyric, active: "" });
  });
  return lyricObjArr;
}
</script>

<style scoped>
.Lyric {
  width: 100%;
  height: 158px;
  background-color: #f8f8f8;
}
.Lyric {
  overflow: hidden;
}
.Lyric > ul {
  margin: 8px auto;
}
.Lyric > ul > li {
  font-size: 15px;
  line-height: 22px;
  text-align: center;
}
.Lyric > ul > li.active {
  color: #c20c0c;
  font-weight: bold;
}
</style>