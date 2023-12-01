<script>
import axios from 'axios';
import { store } from './store.js';
import AppCardList from './components/AppCardList.vue';
import AppHeader from './components/AppHeader.vue';
import AppLoader from './components/AppLoader.vue';
import AppLogin from './components/AppLogin.vue';
export default {
  data() {
    return {
      store,
      error: false,
      page: 1,
      showNextBtn: true
    };
  },
  created() {
    this.getAllGenres();
    this.mostViewed();
    this.setLocalKey();
    this.store.loading = false;
  },
  methods: {
    apiCall(type) {
      this.store.loading = true;
      const params = {
        query: this.store.searchText,
        api_key: this.store.apiKey,
        page: this.page
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
          this.store.filterFilms = this.store.films;
          this.store.filterSeries = this.store.series;
        });
    },
    searchWhitButton() {
      this.page = 1;
      if (this.store.searchText != "") {
        this.store.searchMessage = `Risultati di ${this.store.searchText}:`.toLocaleUpperCase();
        this.apiCall("tv");
        this.apiCall("movie");
      }
    },
    searchWhitInput() {
      this.page = 1;
      if (this.store.searchText.length % 4 === 0 && this.store.searchText.trim() != "") {
        this.store.searchMessage = `Risultati di ${this.store.searchText.trim()}:`.toLocaleUpperCase();
        this.apiCall("tv");
        this.apiCall("movie");
      } else {
        this.mostViewed();
      }
    },
    getAllGenres() {
      axios
        .get(this.store.baseUrl + "genre/tv/list", {
          params: {
            api_key: this.store.apiKey,
            page: this.page
          }
        })
        .then((resp) => {
          this.store.seriesGenres = resp.data.genres;
        }).finally(() => {
          axios
            .get(this.store.baseUrl + "genre/movie/list", {
              params: {
                api_key: this.store.apiKey,
                page: this.page
              }
            })
            .then((resp) => {
              this.store.filmsGenres = resp.data.genres;
            }).finally(() => {
              this.store.allGenres = [...this.store.seriesGenres, ...this.store.filmsGenres];
            })
        })
    },
    mostViewed() {
      if (this.store.searchText == "") {
        this.store.searchMessage = "I PIU' VISTI:";
        this.store.loading = true;
        axios
          .get(this.store.baseUrl + "tv/top_rated", {
            params: {
              api_key: this.store.apiKey,
              page: this.page
            }
          })
          .then((resp) => {
            this.store.series = resp.data.results;
          })
          .catch((err) => {
            this.error = true;
          })
          .finally(() => {
            this.store.filterSeries = this.store.series;

            axios
              .get(this.store.baseUrl + "movie/top_rated", {
                params: {
                  api_key: this.store.apiKey,
                  page: this.page
                }
              })
              .then((resp) => {
                this.store.films = resp.data.results;
              })
              .catch((err) => {
                this.error = true;
              })
              .finally(() => {
                this.store.loading = false;
                this.store.filterFilms = this.store.films;
              });
          });
      }
    },
    setLocalKey() {
      if (localStorage.getItem("Username") != undefined) {
        this.store.username = localStorage.getItem("Username");
        this.store.login = false;
      }
    },
    showMore() {
      this.store.filterValue = 0;
      this.page++;
      if (this.store.searchText == "") {
        this.mostViewed();
      } else {
        this.apiCall("tv");
        this.apiCall("movie");
      }
      setTimeout(() => {
        if (this.store.filterFilms.length == 0 && this.store.filterSeries.length == 0) {
          this.store.searchMessage = "Non ci sono altre pagine disponibili";
          this.showNextBtn = false;
        }
      }, 500);
    },
    showBack() {
      if (this.page > 1) {
        this.showNextBtn = true;
        this.store.filterValue = 0;
        this.page--;
        if (this.store.searchText == "") {
          this.store.searchMessage = "I PIU'VISTI:";
        } else {
          this.store.searchMessage = `Risultati di ${this.store.searchText.trim()}:`.toLocaleUpperCase();
        }
        if (this.store.searchText == "") {
          this.mostViewed();
        } else {
          this.apiCall("tv");
          this.apiCall("movie");
        }
      }
    },
    closeMenuUser() {
      this.store.visibleMenuUser = false;
    }
  },
  components: { AppCardList, AppHeader, AppLoader, AppLogin },
}
</script>

<template>
  <div class="wrapper">
    <AppHeader @search-whit-button="searchWhitButton" @search-whit-input="searchWhitInput" />
    <AppLoader v-if="store.login && store.loading" />
    <AppLogin v-if="store.login" />
    <div v-else @click="closeMenuUser">
      <AppLoader v-if="store.loading" />
      <AppCardList v-else @show-more="showMore" @show-back="showBack" :page="page" :showNextBtn="showNextBtn" />
    </div>
  </div>
</template>

<style lang="scss">
@use "./style/general.scss";
@use "@fortawesome/fontawesome-free/css/all.css";

.wrapper {
  height: 100dvh;
}
</style>
