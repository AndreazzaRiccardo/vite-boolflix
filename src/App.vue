<script>
import axios from 'axios';
import { store } from './store.js';
import AppCardList from './components/AppCardList.vue';
import AppHeader from './components/AppHeader.vue';
import AppLoader from './components/AppLoader.vue';
export default {
  data() {
    return {
      store,
      error: false
    };
  },
  methods: {
    apiCall(type) {
      this.store.loading = true;
      const params = {
        query: this.store.searchText,
        api_key: this.store.apiKey
      };
      axios
        .get(this.store.baseUrl + "search" + "/" + type, {
          params,
        })
        .then((resp) => {
          if (type == "tv") {
            this.store.series = resp.data.results;
          } else if (type == "movie") {
            this.store.films = resp.data.results;
          }
        })
        .catch((err) => {
          this.error = true;
        })
        .finally(() => {
          this.store.loading = false;
        });
    },
    searchMovieAndSeries() {
      this.apiCall("tv");
      this.apiCall("movie");
      this.store.searchText = "";
      console.log(this.store.films);
      console.log(this.store.series);
    }
  },
  components: { AppCardList, AppHeader, AppLoader }
}
</script>

<template>
  <AppHeader @search="searchMovieAndSeries" />
  <AppLoader v-if="store.loading"/>
  <AppCardList v-else />
</template>

<style lang="scss">
@use "./style/general.scss";
@use "@fortawesome/fontawesome-free/css/all.css";
</style>
