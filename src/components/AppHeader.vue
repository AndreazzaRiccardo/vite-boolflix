<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            visibleMenuUser: false,
            menuArray: ["HOME", "PROFILO", "CERCA", "IMPOSTAZIONI"]
        }
    },
    props: {
        login: Boolean
    },
    methods: {
        filterForGenres() {
            if (store.filterValue !== 0) {
                this.store.searchMessage = `RICERCA PER GENERE`
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
                    this.store.searchMessage = "LA RICERCA NON HA PRODOTTO RISULTATI"
                }
            } else {
                if(this.store.searchText == "") {
                    this.store.searchMessage = "I PIU'VISTI:"
                } else {
                    this.store.searchMessage = `Risultati di ${this.store.searchText.trim()}:`.toLocaleUpperCase();
                }
                this.store.filterSeries = store.series;
                this.store.filterFilms = store.films;
            }
        },
        getImg() {
            return new URL(`../assets/img/user-ico.png`, import.meta.url).href;
        },
        showMenu() {
            this.visibleMenuUser = !this.visibleMenuUser
        }
    }
}
</script>

<template>
    <header>
        <h1>BOOLFLIX</h1>
        <div class="search-section" v-if="!store.login">
            <select v-model="store.filterValue" @change="filterForGenres" name="genres" id="genres">
                <option :value="0" selected>Scegli un genere</option>
                <option v-for="genre in store.allGenres" :value="genre.id">{{ genre.name }}</option>
            </select>
            <button class="src-btn" @click="$emit('search-whit-button')">CERCA</button>
            <div class="search-bar">
                <label for="search"><i class="fa-solid fa-magnifying-glass"></i></label>
                <input @keyup="$emit('search-whit-input')" placeholder="Cerca un titolo" type="text" name="" id="search"
                    v-model="store.searchText">
            </div>
            <div class="log">
                <p v-if="store.loading == false">BENTORNATO {{ store.username.toLocaleUpperCase() }}</p>
            </div>
            <div @click="showMenu" class="user-option">
                <img :src="getImg()" alt="">
                <div v-if="visibleMenuUser">
                    <ul>
                        <li v-for="item in menuArray">
                            <a href="">{{ item }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use '../style/partials/variables' as *;

header {
    padding: 2rem 4rem;
    background-color: rgb(41, 41, 41);
    @include flex (row, space-between, center, nowrap);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;

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

    select {
        padding: .5rem 1rem;
    }

    .log {
        font-size: 1.5rem;
        margin-left: 1rem;
        color: $primary-color;
    }

    h1 {
        font-size: 2rem;
        color: $primary-color;
    }

    .search-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .src-btn {
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

        .user-option {
            width: 5%;
            position: relative;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 100%;
                cursor: pointer;
            }

            ul {
                list-style-type: none;
                position: absolute;
                right: -4%;
                top: 155%;

                li {
                    background-color: gray;
                    padding: .5rem 1rem;
                    border-bottom: 1px solid $primary-color;

                    &:hover {
                        opacity: 70%;
                    }

                    a {
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }

    }
}
</style>
