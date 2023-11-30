<script>
export default {
    props: {
        film: Object,
        filterValue: Number,
    },
    data() {
        return {
            languageNotFound: false,
            imgNotFound: false,
            visible: false,
            flagArray: ["it", "fr", "en", "ja", "es",]
        }
    },
    methods: {
        getImgFlagUrl(lang) {
            if (this.flagArray.includes(lang)) {
                return new URL(`../assets/img/flag-${lang}.png`, import.meta.url).href;
            } else {
                this.languageNotFound = true
            }
            
        },
        getImg() {
            if (this.film.poster_path == undefined) {
                this.imgNotFound = true
            } else {
                return `https://image.tmdb.org/t/p/w342${this.film.poster_path}`
            }
        },
        showData() {
            setTimeout(() => {
                this.visible = true
            }, 100)
        },
        hiddenData() {
            setTimeout(() => {
                this.visible = false
            }, 100)
        },
        vote(vote) {
            return Math.ceil(vote / 2)
        },
        altImg() {
            if (this.film.title === undefined) {
                return "Poster of " + this.film.name
            } else {
                return "Poster of " + this.film.title
            }
        },
    },
}
</script>

<template>
    <div class="card" @mouseover="showData" @mouseleave="hiddenData"
        v-if="film.genre_ids.includes(filterValue) || filterValue == 0">

        <img v-show="!visible" v-if="!imgNotFound" class="poster" :src="getImg()" :alt="altImg()">

        <div class="data" v-show="visible || imgNotFound">

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
                    <i class="fa-solid fa-star" v-for="star in vote(film.vote_average)"></i>
                </span>
                <span>
                    <i v-for="star in 5 - vote(film.vote_average)" class="fa-regular fa-star"></i>
                </span>
            </p>
            <p>Trama:
                <span v-if="film.overview">{{ film.overview }}</span>
                <span v-else>Trama non disponibile</span>
            </p>

        </div>

    </div>
</template>

<style lang="scss">
.card {
    color: white;
    width: calc(100% / 4);
    background-color: rgb(77, 76, 76);

    .poster {
        width: 100%;
        aspect-ratio: .6;
        transition: all 1s linear;
        display: block;
        transform: rotateY(0deg);

        &:hover {
            transform: rotateY(90deg);
            transition: all .1s linear;
        }
    }

    .data {
        overflow: auto;
        width: 100%;
        aspect-ratio: .6;
        padding: 1rem;

        h3 {
            text-align: center;
            margin-bottom: 1rem;
            color: rgb(224, 67, 67);
            border-bottom: 2px solid rgb(156, 73, 73);
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
