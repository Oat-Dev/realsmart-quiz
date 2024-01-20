<template>
  <v-row class="home-form">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card
      class="mx-auto"
      >

    <v-app-bar
      dark
      color="orange"
    >
      <v-toolbar-title class="font-weight-bold">Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in users"
          :key="i"
          cols="12"
        >
          <v-card
            :color="white"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.username"
                ></v-card-title>

                <v-card-subtitle v-text="item.email"></v-card-subtitle>
                <v-card-subtitle v-text="item.phoneNumber"></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data() {
    return {
      users : [],
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      const token = localStorage.getItem('jwtToken');
      console.log(token)
      try {
        await this.$axios
          .get('/user/getAll',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
          console.log(res.status)
          if (res.status !== 200) {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
          } else {
            this.users = res.data
          }
          })
        } catch (err) {
          this.$store.dispatch('auth/logout');
          this.$router.push('/');
        }
      },
  }
}
</script>

<style>
.home-form {
  font-family: 'Open Sans', sans-serif;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.home-card {
    padding: 10%;
    background-color: rgba(0,0,0,.75);
  }
</style>