<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        getImg() {
            return new URL(this.store.imgSelect, import.meta.url).href
        },
        vote(vote) {
            return Math.ceil(vote / 2);
        },
        stremThis() {
            event.preventDefault();
            window.open(`https://www.google.com/search?q=streming+${this.store.filmCard.title}`);
        },
        viewTrailer() {
            event.preventDefault();
            window.open(`https://www.google.com/search?q=trailer+${this.store.filmCard.title}`);
        },
    },
}
</script>

<template>
    <div class="poster">
        <img :src="getImg()" alt="">
        <div class="data-container">
            <h2>{{ store.filmCard.title }}</h2>
            <p>
                <i class="fa-star" v-for="star in 5" :class="star <= vote(store.filmCard.vote) ? 'fa-solid' : 'fa-regular'"
                    :key="star"></i>
            </p>
            <p>
                <span v-if="store.filmCard.overview != ''">{{ store.filmCard.overview }}</span>
                <span v-else>Trama non disponibile</span>
            </p>
            <div class="btns">
                <button @click="stremThis">
                    <a class="streaming" href="">GUARDA</a>
                </button>
                <button @click="viewTrailer">
                    <a class="streaming" href="">TRAILER</a>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use '../style/partials/variables' as *;


.poster {
    position: relative;

    img {
        width: 100%;
        height: 800px;
        object-fit: cover;

    }

    .data-container {
        position: absolute;
        top: 5%;
        left: 3%;
        font-size: 2rem;
        color: white;
        width: 50%;

        h2 {
            margin-bottom: 1rem;
        }


        font-weight: normal;

        &:first-child {
            margin-left: .5rem;
        }

        i {
            color: gold;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
        }


        p {
            margin-bottom: 1.5rem;
        }

        button {
            padding: .5rem 1rem;
            background-color: rgb(27, 27, 27);
            border: 1px solid $primary-color;
            margin-top: 2rem;
            align-self: flex-end;
            border-radius: 5px;

            &:last-child {
                margin-left: 1rem;
            }

            .streaming {
                text-decoration: none;
                color: $primary-color;
            }

            &:hover {
                filter: brightness(200%);
                cursor: pointer;
            }
        }
    }


}
</style>