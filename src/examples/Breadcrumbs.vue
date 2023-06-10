<template>
  <nav aria-label="breadcrumb">
    <h4 class="mb-0 font-weight-bolder text-white mt-2">{{ currentPage }}</h4>
  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true
    },
  }
};
</script>
