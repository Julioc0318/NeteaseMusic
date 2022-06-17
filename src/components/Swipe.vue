<!-- ##### INTRODUCTION: #####
1. 说明：轮播图
2. 功能：实现轮播图音乐图片切换
3. 接口：banner，获取数据，地址/banner
4. 可选参数：type，表示资源类型，其中使用2表示iPhone
-->

<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(imageUrl, index) in imageArr" :key="index">
        <img :src="imageUrl" width="100%" style="display: block" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageArr: [],
    };
  },
  mounted() {
    this.$axios.get("./netease/banner?type=2").then((res) => {
      for (var i = 0; i < 11; i++) {
        this.imageArr.push(res.data.banners[i].pic);
      }
    });
  },
};
</script>
<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
