<template>
  <div>
    <HomePage/>
  </div>
</template>

<script>
import HomePage from '~/components/HomePage.vue'

export default {
  layout: "mainLayout",
  name: 'home',
  components: {
    HomePage,
  },
}
</script>

<style>

</style>