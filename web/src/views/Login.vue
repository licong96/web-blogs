<template>
  <div class="home">
    <h1>登录</h1>
    <div>
      <input type="text" v-model="username" placeholder="username">
      <br><br>
      <input type="text" v-model="password" placeholder="password">
      <br><br>
      <button @click="handleSubmit">登录</button>
    </div>
    <p v-if="message">{{ message }}</p>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
})
export default class Home extends Vue {

  username = ''
  password = ''
  message = ''

  async handleSubmit() {
    const result: any = await axios.post('/api/user/login', {
      username: this.username,
      password: this.password
    })
    if (result.data.errno === 0) {
      this.message = '登录成功'
      this.$router.replace('/admin')
    } else {
      this.message = result.data.message
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
