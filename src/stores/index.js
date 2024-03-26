import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // This will hold our user object
  },
  mutations: {
    // Mutations for setting the user state
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    // Action to login the user and update the state
    loginUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
