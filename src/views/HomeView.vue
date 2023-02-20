<template>
  <v-container >
    <v-card
      class="mx-auto my-15"
      width="min(90%, 25rem)"
      min-height="350"
      elevation="2"
      color="#dfbb9d"
    >
      <h1 class="text-center">Todo list</h1>
      <v-divider></v-divider>

      <v-container>
        <v-container fluid v-if="!isEditing">
          <v-text-field v-model="task" label="Input Task" solo> </v-text-field>
          <v-btn color="primary" block @click="addTask">Add</v-btn>
        </v-container>
        <!-- Edit/Update Task -->
        <v-container fluid v-else>
          <v-text-field v-model="task" label="Edit Task" solo> </v-text-field>
          <v-btn block color="primary" @click="updateTask">Update</v-btn>
        </v-container>
        <v-list color="#dfbb9d">
          <v-list-item v-for="(task, i) in tasks" :key="i">
            <v-list-item-title>{{ task }}</v-list-item-title>

            <div class="button-group d-flex">
              <v-btn @click="editTask(i, task)" small>
                <v-icon color="red"> mdi-pen </v-icon>
              </v-btn>
              <v-btn @click="deleteTask(i)" class="ml-2" small>
                <v-icon color="red"> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-list-item>
        </v-list>
      </v-container>

      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",

  components: {},
  data: () => ({}),
  computed: {
    ...mapState(["task", "tasks", "isEditing", "selectedTask"]),
    task: {
      get() {
        return this.$store.state.task;
      },
      set(value) {
        this.$store.commit("updateTask", value);
      },
    },
    isEditing: {
      get() {
        return this.$store.state.isEditing;
      },
      set(value) {
        this.$store.commit("setIsEditing", value);
      },
    },
  },
  methods: {
    addTask() {
      if (this.task === "") return;
      this.$store.commit("addTask", this.task);
      this.task = "";
    },
    deleteTask(i) {
      this.$store.commit("deleteTask", i);
    },
    editTask(i, task) {
      this.$store.commit("setIsEditing", true);
      this.$store.commit("setSelectedTask", i);
      this.$store.commit("updateTask", task);
    },
    updateTask() {
      if (this.task === "") return;
      this.$store.commit("updateTaskAtIndex", {
        i: this.selectedTask,
        task: this.task,
      });
      this.task = "";
      this.isEditing = false;
      this.selectedTask = null;
    },
  },
};
</script>
