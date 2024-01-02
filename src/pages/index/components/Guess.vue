<script lang="ts" setup>
import type { Product } from '@/types/index';
import type { PageParam } from '@/types/global';
import { recommendProductList } from '@/services/index';
import { ref, onMounted } from 'vue';

const pageParam: PageParam = {
  pageNum: 1,
  pageSize: 6
}
// 分页已到末尾的标记
const finish = ref(false);

const productList = ref<Product[]>([]);

const getData = async () => {
  if (finish.value === true) {
    // 没有更多数据
    return uni.showToast({
      title: '没有更多商品',
      icon: 'none',
      mask: true
    })
  }
  // 进行异步请求
  const res = await recommendProductList(pageParam);
  // 判断获取到的数据是否为空
  if (res.data.length == 0) {
    // 没有更多数据
    finish.value = true;
  } else {
    // 数据追加
    productList.value.push(...res.data);
    // 修改分页信息
    pageParam.pageNum++;
  }
}

// 重置数据
const resetData = () => {
  pageParam.pageNum = 1
  productList.value = []
  finish.value = false
}

// 组件挂载完毕执行
onMounted(() => {
  getData();
})
// 暴露方法
defineExpose({
  resetData,
  getMore: getData
})
</script>

<template>
  <view class="guess">
    <navigator class="guess-item" v-for="item in productList" :key="item.id" :url="`/pages/goods/goods?id=` + item.id">
      <image class="image" mode="aspectFill" :src="item.pic"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }} 起</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ finish ? '没有更多商品~' : '正在加载...' }}
  </view>
</template>
<style scoped lang="scss">
:host {
  display: block;
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  background: #f5f5f5;
  .guess-item {
    // width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }

  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>