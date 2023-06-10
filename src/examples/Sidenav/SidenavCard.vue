<template>
  <div
    v-show="this.$store.state.layout !== 'landing'"
    class="card card-plain shadow-none"
    id="sidenavCard"
  >
      <argon-button color="danger" full-width @click="submitLogout" class="mt-9">
        Sign Out
      </argon-button>
  </div>
</template>

<script>
import ArgonButton from '@/components/ArgonButton.vue';
import { mapActions } from "pinia";
import { d$auth } from "@/store/auth";

export default {
  name: "sidenav-card",
  components: {
    ArgonButton
  },
  methods: {
    ...mapActions(d$auth, ["a$logout"]),
    submitLogout(){
      this.a$logout();
      this.$router.replace({ name: 'Signin'});
    }
    },
};
</script>

