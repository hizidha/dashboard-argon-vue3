<template>
  <div class="card">
    <div class="card-header p-4 pt-3 pb-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h5 class="mt-1 mb-0"><strong>To Do List</strong></h5>
        </div>
        <div class="col-6 text-end">
          <router-link :to="{ name: 'Addtodo' }">
            <button class="btn btn-success mb-0 text-xs">
              <i class="fas fa-plus me-2"></i> Add Activity
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">activity title</th>
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">description</th>
              <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">status</th>
              <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">activities</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tutorials" :key="index">
              <td>
                <p class="text-uppercase text-xs font-weight-bolder mb-0 p-3 pb-0 pt-0">{{ item.title }}</p>
              </td>
              <td>
                <p class="text-xs mb-0">{{ item.description }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span v-if="item.completed != false" class="badge badge-s bg-gradient-success">Complete</span>
                <span v-else class="badge badge-s bg-gradient-danger">Uncomplete</span>
              </td>
              <td class="align-middle text-center">
                <a @click="update1Data(item.id)" 
                  class="fas fa-check btn btn-success m-1 mt-0 mb-0 p-2 pt-1 pb-1 mr-2" 
                  data-toggle="tooltip" data-original-title="Completed-Act">
                </a>
                <a @click="update2Data(item.id)" 
                  class="fas fa-clock btn btn-warning m-1 mt-0 mb-0 p-2 pt-1 pb-1 mr-2" 
                  data-toggle="tooltip" data-original-title="Uncompleted-Act">
                </a> 
                <a @click="deleteData(item.id)" 
                  class="fas fa-trash-alt btn btn-danger m-1 mt-0 mb-0 p-2 pt-1 pb-1" 
                  data-toggle="tooltip" data-original-title="Delete-Act">
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TodoDataService from "@/service/todo";

export default {
  name: "todo-table",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTutorials() {
      TodoDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async update1Data(id) {
    try {
        const tutorial = this.tutorials.find(item => item.id === id);
        const data = {
        title: tutorial.title,
        description: tutorial.description,
        completed: true
      };
      await TodoDataService.update(id, data);
      this.retrieveTutorials();
     }
     catch (error) {
       console.log(error);
     } 
    },

    async update2Data(id) {
    try {
        const tutorial = this.tutorials.find(item => item.id === id);
        const data = {
        title: tutorial.title,
        description: tutorial.description,
        completed: false
      };
      await TodoDataService.update(id, data);
      this.retrieveTutorials();
     }
     catch (error) {
       console.log(error);
     } 
    },

    deleteData(e) {
      console.log(e);
      TodoDataService.delete(e)
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);

          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      TodoDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      TodoDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>
