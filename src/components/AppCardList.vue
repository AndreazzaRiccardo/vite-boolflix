<script>
import AppCard from './AppCard.vue';
import { store } from '../store.js';
export default {
    data() {
        return {
            store
        }
    },
    components: {
        AppCard
    }
}
</script>

<template>
    <div class="container">
        <h2 v-if="store.films.length !== 0">FILMS</h2>
        <div class="card-list">
            <AppCard v-for="(movie, i) in store.films" :key="i" :film="movie" />
        </div>
        <h2 v-if="store.series.length !== 0">SERIES</h2>
        <div class="card-list">
            <AppCard v-for="(serie, i) in store.series" :key="i" :film="serie" />
        </div>
    </div>
</template>

<style lang="scss">
@use "../style/partials/mixins" as *;

.container {
    width: 80%;
    margin: 1rem auto;

    .card-list {
        @include flex (row, flex-start, center, wrap)
    }

    h2 {
        text-align: center;
        color: white;
        font-size: 3rem;
        margin: 2rem;
    }
}
</style>
