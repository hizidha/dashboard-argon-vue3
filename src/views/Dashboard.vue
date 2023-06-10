<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <todo-table />
      </div>
    </div>
  </div>
</template>

<script>
import TodoTable from "./components/ToDoTable.vue";

export default {
  name: "dashboard",
  components: {
    TodoTable,
  },
  // data() {
  //   return {
  //     stats: {
  //   },
  //   };
  // },
};
</script>
