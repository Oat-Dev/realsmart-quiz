<template>
  <v-row class="login-form">
    <v-alert
      :value="signUpAlert"
      type="success"
      color="green"
      dismissible
      transition="scale-transition"
      class="signup-alert"
    >
      <strong>Sign up success!</strong>
    </v-alert>
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card class="login-card">
        <v-card-title class="text-h5" style="font-weight: 700"
          >Sign In</v-card-title
        >
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="email"
              label="Email or phone number"
              required
              outlined
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              outlined
              :rules="passwordRules"
            ></v-text-field>
            <v-btn block class="login-button" @click="submitForm"
              >Sign In</v-btn
            >
            <div class="login-help-form">
              <div>
                <input
                  type="checkbox"
                  name="rememberMe"
                  v-model="rememberMe"
                  tabindex="0"
                />
                <label>
                  <span>Remember me</span>
                </label>
              </div>
              <a href="/loginHelp">Need help?</a>
            </div>
          </v-form>
        </v-card-text>
        <v-col cols="12">
          <div class="login-signup-now">
            New users ?
            <a class="" @click="signupDialog = true">Sign up now</a>.
          </div>
        </v-col>
      </v-card>
    </v-col>
    <v-dialog v-model="signupDialog" persistent max-width="600px">
      <v-form ref="form2" @submit.prevent="signupForm">
        <v-card>
          <v-card-title>
            <span class="text-h5">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Username"
                    type="text"
                    v-model="signUp.userName"
                    required
                    :rules="usersRules"
                    class="signup-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    required
                    v-model="signUp.email"
                    :rules="signupEmailRules"
                    class="signup-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Phone number"
                    type="text"
                    required
                    v-model="signUp.phoneNo"
                    :rules="phoneRules"
                    class="signup-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    type="password"
                    required
                    v-model="signUp.password"
                    :rules="passwordRules"
                    class="signup-field"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <!-- <small style="color: red;">*Required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="signupDialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="signupForm()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      signUp: {
        userName: "",
        email: "",
        phoneNo: "",
        password: "",
      },
      rememberMe: false,
      signupDialog: false,
      signUpAlert: false,
      emailRules: [
        (v) => {
          const emailRegex = /.+@.+/;
          const phoneRegex = /^\d{10}$/;

          if (emailRegex.test(v) || phoneRegex.test(v)) {
            return true;
          } else {
            return "Please enter a valid email or phone number.";
          }
        },
      ],
      signupEmailRules: [
        (v) => {
          const emailRegex = /.+@.+/;

          if (emailRegex.test(v)) {
            return true;
          } else {
            return "Please enter a valid email.";
          }
        },
      ],
      passwordRules: [
        (v) => !!v || "Your password must contain between 4 and 60 characters.",
        (v) =>
          (v && v.length >= 4 && v.length <= 60) ||
          "Your password must contain between 4 and 60 characters.",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])/.test(v) ||
          "Password must contain both uppercase and lowercase letters",
      ],
      usersRules: [
        (v) => !!v || "Username is required!",
        (v) =>
          (v && v.length >= 1 && v.length <= 10) ||
          "Your username must contain between 1 and 10 characters.",
      ],
      phoneRules: [
        (v) => {
          const phoneRegex = /^\d{10}$/;

          if (phoneRegex.test(v)) {
            return true;
          } else {
            return "Your phone number must contain 10 characters.";
          }
        },
      ],
    };
  },
  mounted() {},
  methods: {
    async submitForm() {
      if (this.$refs.form.validate() === true) {
        try {
          await this.$axios
            .post(`${process.env.baseUrl}/user/login`, {
              identifier: this.email,
              password: this.password,
              rememberMe: this.rememberMe,
            })
            .then((res) => {
              if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("jwtToken", token);
                this.$router.push("/home");
              }
            });
        } catch (error) {
          console.error("Login failed : ", error);
        }
      } else {
        //condition else (validate faill)
      }
    },
    async signupForm() {
      if (this.$refs.form2.validate() === true) {
        try {
          await this.$axios
            .post(`${process.env.baseUrl}/user/createUser`, {
              username: this.signUp.userName,
              email: this.signUp.email,
              phoneNumber: this.signUp.phoneNo,
              password: this.signUp.password,
            })
            .then((res) => {
              if (res.status === 201) {
                this.signupDialog = false;
                this.signUpAlert = true;
              }
            });
        } catch (error) {
          console.error("Sign up failed : ", error);
        }
      } else {
        //condition else (validate faill)
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  font-family: "Open Sans", sans-serif;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.login-card {
  padding: 10%;
  background-color: rgba(0, 0, 0, 0.75);
}

.login-button {
  margin: 48px 0 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  background: #e50914 !important;
  min-height: 50px !important;
}

.login-help-form {
  display: flex;
  justify-content: space-between;
  color: #b3b3b3;

  a {
    font-size: 13px;
    font-weight: 400;
    text-decoration: none;
    color: inherit !important;
  }
}

.login-signup-now {
  color: #737373;
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;

  a {
    color: #fff !important;
    text-decoration: none;
  }
}

.v-text-field {
  border: 0;
  border-radius: 4px;
  border-color: #b92d2b;
  color: #fff;
  background: #333;
  height: 56px;
  line-height: 50px;
  margin-bottom: 48px;

  > :last-child {
    /* text-wrap: nowrap; */
  }
}

.signup-field {
  > :last-child {
    > :last-child {
      padding-top: 20px;
    }
  }
}

.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}

.signup-alert {
  display: block;
  position: absolute;
  top: 1%;
  width: 100%;
  max-width: 280px;
}
</style>
