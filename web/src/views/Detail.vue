<template>
  <div class="home">
    <h1>详细</h1>
    <ul>
      <li>
        <h2>{{ detailData.title }}</h2>
        <p>{{ detailData.content }}</p>
        <p>作者：{{ detailData.author }}</p>
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

  detailData = {}

  created() {
    const { id } = this.$route.query
    this.getDetail(id)
  }

  async getDetail(id: any) {
    const result: any = await axios.get(`/api/blog/detail?id=${id}`)
    if (result.data.errno === 0) {
      this.detailData = result.data.data
    }
  }

}
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
