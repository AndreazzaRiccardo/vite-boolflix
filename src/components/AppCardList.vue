<script>
import AppCard from './AppCard.vue';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            filterFilmsArray: [],
            filterSeriesArray: [],
        }
    },
    components: {
        AppCard
    },
}
</script>

<template>
    <div class="container">
        <h2 v-if="store.filterFilms.length == 0 && store.filterSeries.length == 0">{{ store.searchErrorMessage }}</h2>
        <div v-else>
            <h2 v-if="store.filterFilms.length > 0">FILMS</h2>
            <div class="card-list">
                <AppCard v-for="(movie, i) in store.filterFilms" :key="i" :film="movie" :filterValue="store.filterValue"
                    :api_key="store.apiKey" />
            </div>
            <h2 v-if="store.filterSeries.length > 0">SERIES</h2>
            <div class="card-list">
                <AppCard v-for="(serie, i) in store.filterSeries" :key="i" :film="serie" :filterValue="store.filterValue"
                    :api_key="store.apiKey" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use "../style/partials/mixins" as *;

.container {
    width: 80%;
    margin: 1rem auto;

    .error {
        color: white;
        font-size: 2rem;
        text-align: center;
        line-height: 500px;
    }

    .card-list {
        @include flex (row, flex-start, center, wrap)
    }

    h2 {
        text-align: start;
        color: white;
        font-size: 3rem;
        margin: 2rem;
    }
}
</style>
