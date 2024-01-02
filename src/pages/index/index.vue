<script setup lang="ts">
import { ref } from 'vue';
import { indexContentAPI } from '@/services/index';
import type { Advertise } from '@/types/index';
import { onLoad } from '@dcloudio/uni-app';
import PubSwiper from './components/PubSwiper.vue';
import Guess from './components/Guess.vue'

const advertiseList = ref<Advertise>();
const getIndexContentData = async () => {
  let res = await indexContentAPI();
  advertiseList.value = res.data.advertiseList;
}

const isTriggered = ref(false);
const guessRef = ref<InstanceType<typeof Guess>>()
const onRefresh = async () => {
  isTriggered.value = true;
  guessRef.value?.resetData();
  await Promise.all([getIndexContentData(), guessRef.value?.getMore()])
  isTriggered.value = false;
}

// 滚动触底时，进行下一次的分页查询
const onScrolltolower = () => {
  console.log("333")
  guessRef.value?.getMore();
}

onLoad(() => {
  // 页面加载时，获取轮播图数据
  getIndexContentData();
})

</script>
<template>
  <view class="viewport">
    <!-- 添加滚动容器 -->
    <scroll-view class="scroll-view" 
      scroll-y 
      @scrolltolower="onScrolltolower">
      <template>
        <!-- 轮播图 -->

        <PubSwiper :list="advertiseList"></PubSwiper>
        <!-- 通告栏 -->
        <!-- 在线客服 -->
        <!-- 热门分类 -->
        <!-- 商品总览 -->
        <Guess ref="guessRef"></Guess>
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  // flex: 1;
  overflow: hidden;
  height: 800px;
}

</style>
