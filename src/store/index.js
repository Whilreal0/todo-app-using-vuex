import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: "",
    tasks: [],
    selectedTask: null,
    isEditing: false

  },
  getters: {},
  mutations: {
    updateTask(state, task) {
      state.task = task;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    deleteTask(state, i){
      state.tasks.splice( i, 1)
    },
    editTask(state, i){
      state.selectedTask = i
      state.task = state.tasks[i]
      
      state.isEditing = true
    },
    updateTaskAtIndex(state, { i, task }){
      state.tasks[i] = task
    },
    setIsEditing(state, newValue) {
      state.isEditing = newValue;
    },
    setSelectedTask(state, task) {
      state.selectedTask = task;
    }
  },
  actions: {},
  modules: {},
});
