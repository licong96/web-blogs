<template>
  <div class="home">
    <h1>首页列表</h1>
    <div class="nav">
      <button @click="handleAdmin">个人中心</button>
    </div>
    <ul>
      <li v-for="(item, index) in listData" :key="index">
        <h2 @click="handleDetail(item)">{{ item.title }}</h2>
        <p @click="handleAuthor(item)">作者：{{ item.author }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
})
export default class Home extends Vue {
  listData = []

  created() {
    this.getList()
  }

  async getList() {
    const result: any = await axios.get('/api/blog/list')
    if (result.data.errno === 0) {
      this.listData = result.data.data
    }
  }

  handleDetail(item: any) {
    this.$router.push(`/detail?id=${item.id}`)
  }

  handleAuthor(item: any) {
    this.$router.push(`/author?author=${item.author}`)
  }

  handleAdmin() {
    this.$router.push('/admin')
  }
}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
}
h2,
p {
  cursor: pointer;
  padding: 5px;
}
ul {
  padding: 20px;
}
li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.nav {
  text-align: right;
}
</style>
