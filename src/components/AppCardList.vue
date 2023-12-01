<script>
import AppCard from './AppCard.vue';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
        }
    },
    components: {
        AppCard
    },
    props: {
        page: Number,
        showNextBtn: Boolean
    }
}
</script>

<template>
    <main>
        <div class="container">
            <div class="top-list">
                <h2 class="search-message">{{ store.searchMessage }}</h2>
                <div>
                    <button v-if="page > 1" @click="$emit('show-back')">BACK</button>
                    <button v-if="showNextBtn" @click="$emit('show-more')">NEXT</button>
                </div>
            </div>

            <div>
                <h2 v-if="store.filterFilms.length > 0">FILMS</h2>
                <div class="card-list">
                    <AppCard v-for="(movie, i) in store.filterFilms" :key="i" :film="movie" :filterValue="store.filterValue"
                        :api_key="store.apiKey" />
                </div>
                <hr v-show="store.filterSeries.length > 0">
                <h2 v-if="store.filterSeries.length > 0">SERIES</h2>
                <div class="card-list">
                    <AppCard v-for="(serie, i) in store.filterSeries" :key="i" :film="serie"
                        :filterValue="store.filterValue" :api_key="store.apiKey" />
                </div>
            </div>

        </div>
    </main>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use '../style/partials/variables' as *;

main {
    height: calc(100dvh - 100px);
    overflow: auto;

    &::-webkit-scrollbar {
        width: 15px;
    }

    &::-webkit-scrollbar-track {
        background: #ccc;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-thumb {
        background: $primary-color;
    }
}

.container {
    width: 80%;
    margin: 1rem auto;

    .top-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button {
        padding: .5rem 1rem;
        background-color: rgb(86, 86, 86);
        color: $primary-color;
        border: 1px solid $primary-color;
        margin: 2rem;

        &:hover {
            opacity: 50%;
            cursor: pointer;
        }
    }

    hr {
        margin-top: 3rem;
        border: 1px solid $primary-color;
    }

    .search-message {
        color: $primary-color;
        text-align: center;
    }

    .error {
        color: white;
        font-size: 2rem;
        text-align: center;
        line-height: 500px;
    }

    .card-list {
        @include flex (row, flex-start, center, wrap);
        gap: .5rem;
    }

    h2 {
        text-align: start;
        color: white;
        font-size: 3rem;
        margin: 2rem;
    }
}
</style>
