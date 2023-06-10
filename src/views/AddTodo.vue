<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="top-0 mx-auto text-center d-lg-flex h-100 pe-0 position-absolute start-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style=" background: white; background-size: cover;">
              </div>
            </div>
              <div class="my-auto d-flex justify-content-center">
                <div class="card card-plain bg-white p-5 pt-4 pb-1">
                  <div class="pb-0 card-header text-center">
                    <h4 class="font-weight-bolder">Create a New Activity</h4>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitData">
                      <div class="mb-3">
                        <argon-input v-model="input.title" type="text" placeholder="Title Activity" name="title" size="lg" required/>
                      </div>
                      <div class="mb-3">
                        <argon-input v-model="input.description" type="text" placeholder="Description" name="description" size="lg" required/>
                      </div>
                      <div class="mb-3">
                        <argon-input v-model="input.category" type="text" placeholder="Category" name="category" size="lg" required/>
                      </div>
                      <div class="text-center">
                        <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" type="submit">
                          Add Activity
                        </argon-button>
                      </div>
                    </form>
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
import { d$todo } from "@/store/dashboard";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonRadio from "@/components/ArgonRadio.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "add-datatodo",
  components: {
    ArgonInput,
    ArgonRadio,
    ArgonButton,
  },
  data: () => ({
    input: {
      title: "",
      description: "",
      category: "",
    },
  }),
  methods: {
  ...mapActions(d$todo, ["a$add"]),
  async submitData() {
      try {
        await this.a$add({ ...this.input });
        this.$router.push({ name: 'Dashboard' });
      } 
      catch (error) {
        console.log(error);
      }
    }
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
