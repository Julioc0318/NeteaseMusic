<template>
  <div class="Play">
    <AlbumImg />
    <AudioPlayer :songUrl="songUrl" />
  </div>
</template>

<script>
import AlbumImg from "./AlbumImg.vue";

import AudioPlayer from "./AudioPlayer";
export default {
  name: "Play",
  data() {
    return { songUrl: "", songId: "" };
  },
  components: { AlbumImg, AudioPlayer },
  mounted() {
    this.songId = this.$route.query.songId;
    if (this.songId != undefined) {
      this.$axios.get(`/netease/song/url?id=${this.songId}`).then((res) => {
        this.songUrl = res.data.data[0].url;
      });
    }
  },
};
</script>