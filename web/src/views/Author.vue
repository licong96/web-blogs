<template>
  <div class="home">
    <h1>作者列表</h1>
    <ul>
      <li v-for="(item, index) in listData" :key="index">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <p>作者：{{ item.author }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
  data() {
    return {
      listData: []
    }
  },
  created() {
    const { author } = this.$route.query
    if (author) {
      this.getList(author)
    }
  },
  methods: {
    async getList(author: any) {
      const result: any = await axios.get(`/api/blog/list?author=${author}`)
      if (result.data.errno === 0) {
        this.listData = result.data.data
      }
    }
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
}
ul {
  padding: 20px;
}
li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>
