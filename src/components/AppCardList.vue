<script>
import AppCard from './AppCard.vue';
import { store } from '../store.js';
import AppPoster from './AppPoster.vue';
export default {
    data() {
        return {
            store,
        }
    },
    components: {
        AppCard,
        AppPoster
    },
    props: {
        page: Number,
        showNextBtn: Boolean
    }
}
</script>

<template>
    <main :class="{ 'hidden': store.hiddenSearch === true }">
        <AppPoster class="hidden" />
        <div class="container">
            <div class="top-list">
                <h2 class="search-message">{{ store.searchMessage }}</h2>
                <div class="btn-page">
                    <button v-if="page > 1" @click="$emit('show-back')"><i class="fa-solid fa-angles-left"></i>BACK</button>
                    <button v-if="showNextBtn" @click="$emit('show-more')">NEXT<i class="fa-solid fa-angles-right"></i></button>
                </div>
            </div>

            <div>
                <h2 v-if="store.filterFilms.length > 0">FILMS</h2>
                <div class="card-list">
                    <AppCard v-for="(movie, i) in store.filterFilms" :key="i" :film="movie" :filterValue="store.filterValue"
                        :api_key="store.apiKey" :imgSelect="store.imgSelect" />
                </div>
                <hr v-show="store.filterSeries.length > 0">
                <h2 v-if="store.filterSeries.length > 0">SERIES</h2>
                <div class="card-list">
                    <AppCard v-for="(serie, i) in store.filterSeries" :key="i" :film="serie"
                        :filterValue="store.filterValue" :api_key="store.apiKey" :imgSelect="store.imgSelect" />
                </div>
            </div>

        </div>
    </main>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use '../style/partials/variables' as *;

main {

    @include responsive("lg") {
        .hidden {
            display: none;
        }
    }

    height: calc(100dvh - 100px);
    overflow: auto;

    &::-webkit-scrollbar {
        width: 1px;
    }

    @include responsive("lg") {
        height: calc(100dvh - 300px);
    }

    @include responsive("sm") {

        height: calc(100dvh - 500px);

        &.hidden {
            height: calc(100dvh - 120px);
        }
    }
}

.container {
    width: 80%;
    margin: 1rem auto;

    .top-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .btn-page {
            display: flex;
        }
    }

    button {
        padding: .5rem 1rem;
        background-color: rgb(57, 57, 57);
        color: $primary-color;
        border: 1px solid $primary-color;
        margin: .5rem;
        border-radius: 5px;
        display: flex;
        gap: .5rem;

        @include responsive("sm") {
            margin: .5rem;
        }

        &:hover {
            filter: brightness(150%);
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

        @include responsive("lg") {
            font-size: 1.5rem;
        }
    }
}
</style>
