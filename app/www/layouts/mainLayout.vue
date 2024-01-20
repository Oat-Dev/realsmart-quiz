<template>
  <v-app>
    <v-app-bar app>
      <v-tabs v-model="tab" align-with-title>
        <v-tab v-for="(item, index) in items" :key="index" :to="item.to">
          {{ item.label }}
        </v-tab>
        <v-spacer></v-spacer>
        <v-tab @click="logout()">Logout</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: 0, 
      items: [
        { label: 'Home', to: '/home' },
        // { label: 'Contact', to: '/contact' },
        // { label: 'Support', to: '/support' },
      ],
    };
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};
</script>
