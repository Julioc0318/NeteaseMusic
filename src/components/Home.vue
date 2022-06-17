<template>
  <div class="Home">
    <Swipe />
  </div>
</template>

<script>
import axios from "../plugins/axios";

import Swipe from "./Swipe.vue";

export default {
  components: {
    Swipe,
  },
};
</script>

<style scoped>
</style>