<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    props: {
        film: Object,
        filterValue: Number,
        api_key: String,
    },
    data() {
        return {
            languageNotFound: false,
            imgNotFound: false,
            visible: false,
            flagArray: ["it", "fr", "en", "ja", "es",],
            actorsArray: [],
            searchError: false,
            store
        }
    },
    created() {
        this.selectThis();
    },
    methods: {
        getImgFlagUrl(lang) {
            if (this.flagArray.includes(lang)) {
                return new URL(`../assets/img/flag-${lang.trim()}.png`, import.meta.url).href;
            } else {
                this.languageNotFound = true;
            }
        },
        getImg() {
            if (this.film.poster_path == undefined) {
                this.imgNotFound = true;
            } else {
                return `https://image.tmdb.org/t/p/w342${this.film.poster_path}`;
            }
        },
        showData() {
            setTimeout(() => {
                this.visible = true;
            }, 100)
        },
        hiddenData() {
            setTimeout(() => {
                this.visible = false;
            }, 100)
        },
        vote(vote) {
            return Math.ceil(vote / 2);
        },
        altImg() {
            if (this.film.title === undefined) {
                return "Poster of " + this.film.name;
            } else {
                return "Poster of " + this.film.title;
            }
        },
        showActors() {
            event.preventDefault();
            axios
                .get(`https://api.themoviedb.org/3/movie/${this.film.id}/credits`, {
                    params: {
                        api_key: this.api_key
                    }
                })
                .then((resp) => {
                    this.actorsArray = resp.data.cast;
                })
                .catch((err) => {
                    this.searchError = true;
                })
        },
        stremThis() {
            event.preventDefault();
            if (this.film.title === undefined) {
                window.open(`https://www.google.com/search?q=streming+${this.film.name}`);
            } else {
                window.open(`https://www.google.com/search?q=streming+${this.film.title}`);
            }
        },
        selectThis() {
            if (this.film.backdrop_path != undefined) {
                this.store.imgSelect = `https://image.tmdb.org/t/p/original${this.film.backdrop_path}`;
                if (this.film.title == undefined) {
                    this.store.filmCard.title = this.film.name;
                } else {
                    this.store.filmCard.title = this.film.title;
                }
                this.store.filmCard.language = this.film.original_language;
                this.store.filmCard.vote = this.film.vote_average;
                this.store.filmCard.overview = this.film.overview;
            }
        }
    },
}
</script>

<template>
    <div @click="selectThis" class="card" @mouseover="showData" @mouseleave="hiddenData">

        <img v-show="!visible" v-if="!imgNotFound" class="poster" :src="getImg()" :alt="altImg()">

        <div class="data" v-show="visible || imgNotFound">
            <div class="data-container">

                <h3 v-if="imgNotFound">IMMAGINE NON DISPONIBILE</h3>
                <p>Titolo:
                    <span>{{ film.name }}{{ film.title }}</span>
                </p>
                <p>Titolo originale:
                    <span>{{ film.original_name }}{{ film.original_title }}</span>
                </p>
                <p>Lingua:
                    <span v-if="languageNotFound">{{ film.original_language }}</span>
                    <img v-else :src="getImgFlagUrl(film.original_language)" :alt="`${film.original_language} flag`">
                </p>
                <p>Voto:
                    <span>
                        <i class="fa-star" v-for="star in 5"
                            :class="star <= vote(film.vote_average) ? 'fa-solid' : 'fa-regular'" :key="star"></i>
                    </span>
                </p>
                <p>Trama:
                    <span v-if="film.overview">{{ film.overview }}</span>
                    <span v-else>Trama non disponibile</span>
                </p>
                <a class="cast" @click="showActors" href="">Cast</a>
                <p v-if="!searchError" v-for="actor in actorsArray.slice(0, 5)">{{ actor.name }}</p>
                <p v-else>LA RICERCA NON HA PRODOTTO RISULTATI</p>

            </div>
            <button @click="stremThis">
                <i class="fa-solid fa-play"></i>
                <a class="streaming" href="">GUARDA</a>
            </button>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use '../style/partials/variables' as *;
@use '../style/partials/mixins' as *;

.card {
    color: white;
    width: calc((100% - 1.5rem) / 4);
    background: linear-gradient(180deg, rgba(27, 27, 27, 1) 35%, rgba(84, 84, 84, 1) 68%);

    @include responsive("xlg") {
        width: calc((100% - 2.5rem) / 6);
    }

    @include responsive("lg") {
        width: calc((100% - 0.5rem) / 2);
    }

    @include responsive("sm") {
        width: 100%;
    }


    .poster {
        width: 100%;
        aspect-ratio: .6;
        object-fit: cover;
        transition: all 1s linear;
        display: block;
        filter: saturate(130%);

        &:hover {
            transform: rotateY(90deg);
            transition: all .1s linear;
        }
    }

    .data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
            padding: .8rem 1.5rem;
            background-color: $primary-color;
            align-self: flex-end;
            border-radius: 20px;
            border: none;
            display: flex;
            align-items: center;
            gap: .5rem;
            color: white;

            .streaming {
                text-decoration: none;
                color: white;
                font-weight: bolder;
            }

            &:hover {
                filter: brightness(200%);
                cursor: pointer;
            }
        }

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: #ccc;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
        }

        &::-webkit-scrollbar-thumb {
            background: $primary-color;
        }

        overflow: auto;
        width: 100%;
        aspect-ratio: .6;
        padding: 1rem;

        .cast {
            color: $primary-color;
            margin-bottom: 1rem;
            display: block;
        }

        h3 {
            text-align: center;
            margin-bottom: 2rem;
            color: $primary-color;
            border-bottom: 2px solid $primary-color;
        }

        p {
            font-weight: bolder;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1rem;

            span {
                font-weight: normal;

                &:first-child {
                    margin-left: .5rem;
                }

                i {
                    color: gold;
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: black;
                }
            }

            img {
                margin-left: .5rem;
                width: 30px;
            }
        }
    }
}
</style>
