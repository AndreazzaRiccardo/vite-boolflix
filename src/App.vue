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
  created() {
    this.getAllGenres();
  },
  methods: {
    apiCall(type) {
      this.store.loading = true;
      const params = {
        query: this.store.searchText,
        api_key: this.store.apiKey
      };
      axios
        .get(this.store.baseUrl + "search/" + type, {
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
      if (this.store.searchText != "") {
        this.apiCall("tv");
        this.apiCall("movie");
        this.store.searchText = "";
      }
    },
    getAllGenres() {
      axios
        .get(this.store.baseUrl + "genre/tv/list", {
          params: {
            api_key: this.store.apiKey
          }
        })
        .then((resp) => {
          this.store.seriesGenres = resp.data.genres
        }).finally(() => {
          axios
            .get(this.store.baseUrl + "genre/movie/list", {
              params: {
                api_key: this.store.apiKey
              }
            })
            .then((resp) => {
              this.store.filmsGenres = resp.data.genres
            }).finally(() => {
              this.store.allGenres = [...this.store.seriesGenres, ...this.store.filmsGenres]
            })
        })
    },
  },
  components: { AppCardList, AppHeader, AppLoader }
}
</script>

<template>
  <AppHeader @search="searchMovieAndSeries" />
  <AppLoader v-if="store.loading" />
  <AppCardList v-else />
</template>

<style lang="scss">
@use "./style/general.scss";
@use "@fortawesome/fontawesome-free/css/all.css";
</style>
