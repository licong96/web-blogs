<template>
  <div class="home">
    <h1>创建</h1>
    <div>
      <input type="text" v-model="title" placeholder="title">
      <br><br>
      <textarea v-model="content" cols="30" rows="10" placeholder="content"></textarea>
      <br><br>
      <button @click="handleSubmit">{{ id ? '编辑' : '创建' }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
})
export default class Home extends Vue {

  title = ''
  content = ''
  pageStatus = 0
  id = null as any

  created() {
    const { id } = this.$route.query
    // 有id就是编辑
    if (id) {
      this.id = id
      this.getDetail(this.id)
    }
  }

  async getDetail(id: any) {
    const result: any = await axios.get(`/api/blog/detail?id=${id}`)
    if (result.data.errno === 0) {
      this.title = result.data.data.title
      this.content = result.data.data.content
    }
  }

  async handleSubmit() {
    if (this.id) {
      this.editBlog(this.id)
    } else {
      this.newBlog()
    }
  }

  async editBlog(id: any) {
    const result: any = await axios.post(`/api/blog/update?id=${id}`, {
      title: this.title,
      content: this.content
    })
    if (result.data.errno === 0) {
      alert('编辑成功')
      this.$router.back()
    }
  }

  async newBlog() {
    const result: any = await axios.post('/api/blog/new', {
      title: this.title,
      content: this.content
    })
    if (result.data.errno === 0) {
      alert('新建成功')
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  padding: 30px;
  text-align: center;
}
</style>
