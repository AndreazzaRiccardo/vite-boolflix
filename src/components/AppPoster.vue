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
            <h2 class="data-poster">{{ store.filmCard.title }}</h2>
            <p>
                <i class="fa-star" v-for="star in 5" :class="star <= vote(store.filmCard.vote) ? 'fa-solid' : 'fa-regular'"
                    :key="star"></i>
            </p>
            <p>
                <span class="data-poster" v-if="store.filmCard.overview != ''">{{ store.filmCard.overview }}</span>
                <span v-else>Trama non disponibile</span>
            </p>
            <div class="btns">
                <button @click="stremThis">
                    <i class="fa-solid fa-play"></i>
                    <a class="streaming" href="">GUARDA</a>
                </button>
                <button @click="viewTrailer">
                    <i class="fa-solid fa-play"></i>
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

        .data-poster {
            -webkit-text-stroke-width: .5px;
            -webkit-text-stroke-color: black;
        }

        h2 {
            margin-bottom: 1rem;
            font-size: 4rem;
        }


        font-weight: normal;

        &:first-child {
            margin-left: .5rem;
        }

        .fa-star {
            color: gold;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
        }


        p {
            margin-bottom: 1.5rem;

            .data-poster {
                font-size: 3rem;
            }
        }

        .btns {
            display: flex;
        }

        button {
            padding: .8rem 1.5rem;
            background-color: $primary-color;
            margin-top: 2rem;
            border-radius: 20px;
            border: none;
            display: flex;
            align-items: center;
            gap: .5rem;
            color: white;

            &:last-child {
                margin-left: 1rem;
            }

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
    }


}
</style>