export const state = () => ({
    token: null,
  });
  
  export const mutations = {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('jwtToken', token);
    },
  
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('jwtToken');
    },
  };
  
  export const actions = {
    async login({ commit }, credentials) {
      try {
        const response = await this.$axios.post(`${process.env.baseURL}/user/login` , credentials);
        const token = response.data.token;
        commit('SET_TOKEN', token);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  
    logout({ commit }) {
      commit('CLEAR_TOKEN');
    },
  };
  