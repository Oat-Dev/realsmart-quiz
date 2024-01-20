export default function ({ $axios, store }) {

    $axios.onRequest((config) => {
      const token = store.state.auth.token;
  
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    });
  
    $axios.onResponse((response) => {
      return response;
    });
  
    $axios.onError((error) => {
      return Promise.reject(error);
    });
  }
  