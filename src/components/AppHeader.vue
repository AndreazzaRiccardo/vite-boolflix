<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        filterForGenres() {
            if (store.filterValue !== 0) {
                this.store.filterFilms = []
                this.store.films.forEach(element => {
                    if (element.genre_ids.includes(this.store.filterValue)) {
                        this.store.filterFilms.push(element)
                    }
                });
                this.store.filterSeries = []
                this.store.series.forEach(element => {
                    if (element.genre_ids.includes(this.store.filterValue)) {
                        this.store.filterSeries.push(element)
                    }
                });
                if (this.store.filterFilms.length == 0 && this.store.filterSeries.length == 0) {
                    this.store.searchErrorMessage = "LA RICERCA NON HA PRODOTTO RISULTATI"
                }
            } else {
                this.store.filterSeries = store.series;
                this.store.filterFilms = store.films;
            }
        },
    }
}
</script>

<template>
    <header>
        <h1>BOOLFLIX</h1>
        <div class="search-section">
            <select v-model="store.filterValue" @change="filterForGenres" name="genres" id="genres">
                <option :value="0" selected>Scegli un genere</option>
                <option v-for="genre in store.allGenres" :value="genre.id">{{ genre.name }}</option>
            </select>
            <button @click="$emit('search')">CERCA</button>
            <div class="search-bar">
                <label for="search"><i class="fa-solid fa-magnifying-glass"></i></label>
                <input @keyup.enter="$emit('search')" placeholder="Cerca un titolo" type="text" name="" id="search"
                    v-model.trim="store.searchText">
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@use "../style/partials/mixins" as *;

header {
    padding: 2rem;
    background-color: rgb(41, 41, 41);
    @include flex (row, space-between, center, nowrap);

    select {
        padding: .5rem 1rem;

    }

    h1 {
        font-size: 2rem;
        color: red;
    }

    .search-section {
        display: flex;

        button {
            margin-right: 1rem;
            margin-left: 2rem;
            padding: .5rem 1rem;
            background-color: white;
            border: none;
            font-weight: bolder;
            border-radius: 5px;

            &:hover {
                cursor: pointer;
                opacity: 70%;
            }
        }
    }

    .search-bar {
        padding: .5rem;
        background-color: white;
        border-radius: 5px;

        input {
            border: none;
            margin-left: .5rem;
            outline: none;
            font-weight: bold;
        }
    }
}
</style>
