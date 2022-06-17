<!-- ##### INTRODUCTION: #####
1. 说明：歌曲专辑图片组件
2. 功能：实现展示歌曲专辑组件
3. 接口：album，传入专辑id获取图片url，地址/album?id=
-->
<template>
  <div class="AblumImg">
    <img :src="albumUrl" />
  </div>
</template>
<script>
export default {
  data() {
    return { albumUrl: "" };
  },
  mounted() {
    let albumId = this.$route.query.albumId;
    if (albumId != undefined) {
      this.$axios.get(`/netease/album?id=${albumId}`).then((res) => {
        this.albumUrl = res.data.album.picUrl;
      });
    } else {
      this.albumUrl =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190402%2Fa62f68609590437e9a662cfc5fbd6323.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653958947&t=2b68cf258828d6b0cb83ce4c387834a2";
    }
  },
};
</script>
<style scoped>
.AblumImg {
  width: 375px;
  height: 375px;
  background-color: #f8f8f8;
}
.AblumImg > img {
  width: 80%;
  height: 80%;
  padding: 37.5px;
  display: block;
}
</style>