<template>
  <div>
    <van-search
        shape="round"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
    />
    <!-- 热门搜索容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <ul class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <li
            class="hot_item"
            v-for="(obj,index) in hotList"
            :key="index"
            @click="btn(obj.first)"
            >
          {{ obj.first }}
        </li>
      </ul>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
      ></SongItem>
    </div>
  </div>
</template>

<script>

import { hotSearchAPI, searchResultListAPI } from "@/api";
import SongItem from "@/components/SongItem";
export default {
  data() {
    return {
     searchValue:'',
     hotList:[], // 热搜关键字
     resultList:[], // 搜索结果
     timer: null, // 保存防抖定时器

    };
  },

  async created() {
    const res = await hotSearchAPI()
    console.log(res)
    this.hotList = res.data.result.hots;// 选中的关键词显示到搜索框
  },
  methods: {
    async btn(str) {
      this.searchValue = str
      const res =  await searchResultListAPI({
        type: 1,
        keywords: this.searchValue
      })
      console.log(res);
      this.resultList = res.data.result.songs;
      setTimeout(() => {
        clearTimeout(this.timer)
      }) // 防止下面的请求这次执行
    }
  },
  watch: {
    async searchValue(val){  // 搜索框里的值改变（点击/键盘输入），立即发起请求
      if (this.timer !== null){
        clearTimeout(this.timer)
      }
      if (val.length === 0) return (this.resultList = [])
      console.log(val)
      this.timer = setTimeout(async() => {
          const res =  await searchResultListAPI({
            type: 1,
            keywords: val
          })
          console.log(res);
          this.resultList = res.data.result.songs;
      },1000)

      },
  },
  components: {
    SongItem,
  },
  // 防抖：n秒内，最后执行一次  （补充：函数在n秒内，再次执行，重新计时）
  // 节流：间隔n秒，执行一次
};
</script>

<style scoped>

/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell__title {
  font-size: 20px;
}
</style>
