<template>
    <v-container class="login-container">
      <LoginPage/>
    </v-container>
</template>

<script>
import LoginPage from '~/components/LoginPage.vue'
export default {
  layout: "loginLayout",
  name: 'IndexPage',
  auth: false,
  components: {
    LoginPage,
  },
}
</script>
<style lang="scss" scoped>

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
