<script>
import axios from 'axios';
import { store } from './store.js';
import AppCardList from './components/AppCardList.vue';
import AppHeader from './components/AppHeader.vue';
export default {
  data() {
    return {};
  },
  methods: {

  },
  components: { AppCardList, AppHeader }
}
</script>

<template>
  <AppHeader />
  <AppCardList />
</template>

<style lang="scss">
@use "./style/general.scss";
@use "@fortawesome/fontawesome-free/css/all.css";
</style>
