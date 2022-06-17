<template>
  <div class="AudioPlayer">
    <Lyric :currentTimeInSec="currentTimeInSec" />

    <!-- ***** BEGIN: 播放/暂停按钮 ***** -->
    <div class="playBtn icon">
      <van-icon :name="playIcon" v-on:click="playMusic()" />
      <span>{{ this.currentTime }}</span>
    </div>
    <!-- ***** END: 播放/暂停按钮 ***** -->

    <!-- ***** BEGIN: 播放进度条 ***** -->
    <div class="processSlider">
      <van-slider
        v-model="percentage"
        active-color="#C20C0C"
        bar-height="8px"
        @change="onChange"
      >
        <template #button>
          <div
            class="custom-button"
            v-on:touchstart="onTouchStart()"
            v-on:touchend="onTouchEnd()"
          ></div>
        </template>
      </van-slider>
    </div>
    <!-- ***** END: 播放进度条 ***** -->

    <!-- ***** BEGIN: 音量按钮 ***** -->

    <div class="volumnBtn icon" v-on:click="volumeChange()">
      <span>{{ this.duration }}</span
      ><van-icon :name="volumeIcon" />
    </div>
    <!-- ***** END: 音量按钮 ***** -->

    <audio :src="songUrl" v-on:timeupdate="getParaent($event)"></audio>
  </div>
</template>

<script>
import Lyric from "./Lyric.vue";
export default {
  props: ["songUrl"],
  components: { Lyric },
  data() {
    return {
      onTouch: false,
      playIcon: "play-circle",
      volumeIcon: "volume",
      percentage: 0,
      currentTime: "0:00",
      currentTimeInSec: "",
      duration: this.$route.params.duration || "0:00",
    };
  },
  methods: {
    volumeChange() {
      let audio = document.querySelector("audio");
      if (this.volumeIcon == "volume") {
        audio.volume = 0.0;
        this.volumeIcon = "close";
      } else {
        audio.volume = 1.0;
        this.volumeIcon = "volume";
      }
    },
    playMusic() {
      let audio = document.querySelector("audio");
      if (this.playIcon == "play-circle") {
        audio.play();
        this.playIcon = "pause-circle";
      } else {
        audio.pause();
        this.playIcon = "play-circle";
      }
    },
    getParaent(evt) {
      let currentTime = evt.target.currentTime;
      this.currentTimeInSec = evt.target.currentTime;
      let min = parseInt(currentTime / 60);
      let sec = parseInt(currentTime % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      this.currentTime = `${min}:${sec}`;
      let duration = evt.target.duration;
      if (this.onTouch == false)
        this.percentage = (currentTime * 100) / evt.target.duration;
    },
    onChange() {
      let audio = document.querySelector("audio");
      audio.currentTime = (this.percentage * audio.duration) / 100;
      this.currentTimeInSec = audio.currentTime;
    },
    onTouchStart() {
      this.onTouch = true;
    },
    onTouchEnd() {
      let audio = document.querySelector("audio");
      audio.currentTime = (this.percentage * audio.duration) / 100;
      this.currentTimeInSec = audio.currentTime;
      this.onTouch = false;
    },
  },
};
</script>

<style scoped>
.AudioPlayer {
  width: 100%;
  height: 30px;
  background-color: #f8f8f8;
}
.AudioPlayer > div {
  float: left;
}
.AudioPlayer > div.processSlider {
  width: 58%;
  margin-right: 2%;
}
.AudioPlayer > div.processSlider > .van-slider {
  margin-top: 10px;
}
.custom-button {
  width: 10px;
  height: 10px;
  background-color: #242424;
  border-radius: 50%;
}
/* BEGIN: 播放/暂停按钮, 音量按钮 */
.icon {
  width: 20%;
  height: 100%;
}
.icon > span {
  font-size: 14px;
  position: relative;
  top: -4px;
  left: 4px;
  font-weight: bold;
}
.icon > .van-icon {
  font-size: 26px;
  padding-left: 3px;
}
.volumnBtn > .van-icon {
  padding-left: 8px;
}
/* END: 播放/暂停按钮, 音量按钮 */
</style>