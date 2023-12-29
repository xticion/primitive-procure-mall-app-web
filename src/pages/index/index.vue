<script setup lang="ts">
import { ref } from 'vue';
import {indexContentAPI} from '@/services/index';
import type {IndexContent} from '@/types/index';
import { onLoad } from '@dcloudio/uni-app';
import PubSwiper from './components/PubSwiper.vue'

const indexContent = ref<IndexContent>();

const getIndexContentData = async()=>{
  let res = await indexContentAPI();
  indexContent.value = res.data;
}

onLoad(()=>{
  console.log("index onload begin")
  // 页面加载时，获取轮播图数据
  getIndexContentData();
})

</script>
<template>
  <PubSwiper :list="indexContent.advertiseList"></PubSwiper>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
