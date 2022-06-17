<template>
  <div class="Home">
    <Search @getDataFromSearch="getDataFromSearch" />
    <Cell
      v-for="(song, index) in dataFromSearch"
      :key="index"
      v-bind="dataFromSearch[index]"
    />
  </div>
</template>

<script>
import axios from "../plugins/axios";
import Search from "./Search.vue";
import Cell from "./Cell.vue";

export default {
  // 数据传递给 Cell
  data() {
    return {
      dataFromSearch: [],
    };
  },
  components: {
    Search,
    Cell,
  },
  // 数据来自于dataFromSearch Search.vue
  methods: {
    getDataFromSearch(data) {
      this.dataFromSearch = data;
    },
  },
};
</script>

<style scoped>
</style>