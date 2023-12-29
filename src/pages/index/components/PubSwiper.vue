
<script setup lang="ts">
import type { Advertise } from '@/types/index';
// 定义props 接收
defineProps<{
  list: Advertise[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator class="navigator" :url="'/pages/product/product?id=' + item.id" open-type="navigate" hover-class="navigator-hover">
          <image class="image" :src="item.pic" mode="scaleToFill" />
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>



<style lang="scss" scoped>
/* 轮播图 */
.carousel {
  height: 380rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .swiper {
    height:100%;
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>