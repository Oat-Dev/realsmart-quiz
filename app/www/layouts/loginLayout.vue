<!-- layouts/default.vue -->
<template>
  <v-app dark>
  <div>
    <div class="background">
      <Nuxt />
    </div>
  </div>
  </v-app>
</template>

<script>
export default {
};
</script>

<style scoped>
.background {
  /* Add background styling here */
  background: linear-gradient(to top, #000000, #ffffff);
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  position: relative;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: url("~static/hero-img.jpg") center/cover no-repeat; */
  opacity: 0.5; /* Adjust the opacity as needed */
}

</style>
