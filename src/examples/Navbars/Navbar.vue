<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    v-bind="$attrs" id="navbarBlur" data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 me-sm-4" id="navbar">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group m-0 mt-3 mb-0">
            <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
            <input type="text" class="form-control" :placeholder="'Type here...'"/>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from "pinia";
import { d$auth } from "@/store/auth";
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    }
  },
  components: {
    Breadcrumbs
  },
  computed: {
    ...mapState(d$auth, { user: "g$user"}),
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>
