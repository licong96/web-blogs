<template>
  <div class="home">
    <h1>管理中心</h1>
    <div class="page-status" v-if="pageStatus === 2">
      <p>尚未登录</p>
      <button @click="handleLogin">去登录</button>
    </div>
    <div class="main" v-if="pageStatus === 1">
      <button class="new-btn" @click="handleNew">新建博客</button>
      <div class="search">
        <input v-model="keyword" type="text" placeholder="搜索">
        <button @click="getList">搜索</button>
      </div>
      <ul>
        <li v-for="(item, index) in listData" :key="index">
          <p @click="handleDetail(item)">{{ item.title }}</p>
          <button @click="handleEdit(item)">编辑</button>
          <button @click="handleDelete(item)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
})
export default class Home extends Vue {

  listData = []
  pageStatus = 0
  keyword = ''

  created() {
    this.getList()
  }

  async getList() {
    const params = {
      isadmin: 1,
      keyword: this.keyword
    }
    const result: any = await axios.get('/api/blog/list', {
      params
    })
    if (result.data.errno === 0) {
      this.listData = result.data.data
      this.pageStatus = 1
    } else {
      this.pageStatus = 2
    }
  }

  handleDetail(item: any) {
    this.$router.push(`/detail?id=${item.id}`)
  }

  handleNew() {
    this.$router.push('/new')
  }

  handleEdit(item: any) {
    this.$router.push(`/new?id=${item.id}`)
  }
  
  async handleDelete(item: any) {
    const result = await axios.post(`/api/blog/del?id=${item.id}`)
    if (result.data.errno === 0) {
      alert('删除成功')
      this.getList()
    } else [
      alert('删除失败')
    ]
  }

  handleLogin() {
    this.$router.push('/login')
  }
}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
}
h2, p {
  cursor: pointer;
}
ul {
  padding: 20px;
}
li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.page-status {
  padding: 30px;
  text-align: center;
}
.search {
  padding: 20px;
  text-align: center;
}
.new-btn {
  display: block;
  margin: 30px auto;
}
</style>
