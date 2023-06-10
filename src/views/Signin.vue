<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="top-0 mx-auto text-center d-lg-flex h-100 pe-0 position-absolute start-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://images.unsplash.com/photo-1591017895512-7ad085aea404?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
              </div>
            </div>
              <div class="my-auto d-flex justify-content-center">
                <div class="card card-plain bg-white p-5 pt-4 pb-1">
                  <div class="pb-0 card-header text-start">
                    <h4 class="font-weight-bolder">Sign In</h4>
                    <p class="mb-0 text-xs">Enter your username and password to sign in</p>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitLogin">
                      <div class="mb-3">
                        <argon-input v-model="input.username" type="username" placeholder="Username" name="username" size="lg" />
                      </div>
                      <div class="mb-3">
                        <argon-input v-model="input.password" type="password" placeholder="Password" name="password" size="lg" />
                      </div>
                      <!-- <argon-switch id="rememberMe">Remember me</argon-switch> -->
                      <div class="text-center">
                        <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" type="submit">
                          Sign in
                        </argon-button>
                      </div>
                    </form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Don't have an account?
                      <router-link class="text-success text-gradient font-weight-bold" :to="{ name: 'Signup' }">
                        Sign Up
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </main>
</template>


<script>
import { mapActions } from "pinia";
import { d$auth } from "@/store/auth";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  data: () => ({
    input: {
      username: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(d$auth, ["a$login"]),
    async submitLogin() {
      try {
        await this.a$login({ ...this.input });
        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
