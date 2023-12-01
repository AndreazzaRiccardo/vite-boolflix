<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            menuArray: ["HOME", "PROFILO", "CERCA", "IMPOSTAZIONI", "LOGOUT"]
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
                if (this.store.searchText == "") {
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
            this.store.visibleMenuUser = !this.store.visibleMenuUser
        },
        clickMenuOption(option) {
            event.preventDefault()
            if (option === "LOGOUT") {
                this.store.loadingMessage = "LOGOUT IN CORSO";
                this.store.loading = true;
                localStorage.removeItem("Username");
                setTimeout(() => {
                    this.store.loading = false;
                    this.store.login = true;
                }, 3000);
            }
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
                <p>BENTORNATO {{ store.username.toLocaleUpperCase() }}</p>
            </div>
            <div @click="showMenu" class="user-option">
                <img :src="getImg()" alt="">
                <div v-if="store.visibleMenuUser">
                    <ul>
                        <li @click="clickMenuOption(item)" v-for="item in menuArray">
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
    height: 100px;
    border-bottom: 1px solid $primary-color;

    @include responsive("lg") {
        height: 300px;
    }

    @include responsive("sm") {
        @include flex (column, space-between, center, nowrap);
        height: 400px;
        text-align: center;
    }

    .search-bar {
        padding: .5rem;
        background-color: white;
        border-radius: 5px;

        input {
            border: none;
            outline: none;
            font-weight: bold;
        }
    }

    select {
        padding: .5rem 1rem;
    }

    .log {
        font-size: 1.5rem;
        color: $primary-color;
    }

    h1 {
        font-size: 2rem;
        color: $primary-color;

        @include responsive("lg") {
            font-size: 1.5rem;
        }
    }

    .search-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;

        @include responsive("lg") {
            flex-direction: column;
            gap: 1rem;
        }

        .src-btn {
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
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;

            @include responsive("lg") {
                width: 20%;
            }

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
                        font-size: 2rem;
                        line-height: 3rem;
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }

    }
}
</style>
