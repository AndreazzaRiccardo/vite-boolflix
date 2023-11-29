<script>
export default {
    props: {
        film: Object,
    },
    data() {
        return {
            languageNotFound: false,
            imgNotFound: false,
            visible: false
        }
    },
    methods: {
        getImgFlagUrl(img) {
            if (this.film.original_language == "it") {
                img = 'flag-italy.png'
            } else if (this.film.original_language == "us") {
                img = 'flag-us.png'
            } else if (this.film.original_language == "en") {
                img = 'flag-gb.png'
            } else if (this.film.original_language == "ja") {
                img = 'flag-jp.png'
            } else if (this.film.original_language == "es") {
                img = 'flag-es.png'
            } else if (this.film.original_language == "fr") {
                img = 'flag-fr.png'
            } else {
                this.languageNotFound = true
            }
            return new URL(`../assets/img/${img}`, import.meta.url).href;
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
        }
    }
}
</script>

<template>
    <div class="card" @mouseover="showData" @mouseleave="hiddenData">
        <img v-show="!visible" v-if="!imgNotFound" class="poster" :src="getImg()" alt="">
        <div class="data" v-show="visible || imgNotFound">
            <h3 v-if="imgNotFound">IMMAGINE NON DISPONIBILE</h3>
            <p>Titolo: <span>{{ film.name }}{{ film.title }}</span></p>
            <p>Titolo originale: <span>{{ film.original_name }}{{ film.original_title }}</span></p>
            <p>Lingua: <span v-if="languageNotFound">{{ film.original_language }}</span><img v-else :src="getImgFlagUrl()"
                    alt=""></p>
            <p>Voto: <span v-if="vote(film.vote_average) !== 0"><i class="fa-solid fa-star"
                        v-for="star in vote(film.vote_average)"></i></span><span v-else>0</span></p>
            <p>Trama: <span v-if="film.overview">{{ film.overview }}</span> <span v-else>Trama non disponibile</span></p>
        </div>
    </div>
</template>

<style lang="scss">
.card {
    color: white;
    width: calc(100% / 5);
    background-color: rgb(77, 76, 76);



    .poster {
        width: 100%;
        object-fit: cover;
        aspect-ratio: .6;
        transition: all .5s ease-in-out;
        transform: rotateY(0deg);

        &:hover {
            transform: rotateY(90deg);
            transition: all .1s linear;
        }
    }

    .data {
        overflow: auto;

        h3 {
            text-align: center;
            margin-bottom: 1rem;
            color: rgb(224, 67, 67);
            border-bottom: 2px solid rgb(156, 73, 73);
        }

        width: 100%;
        aspect-ratio: .6;
        padding: 1rem;

        p {
            font-weight: bolder;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1rem;

            span {
                font-weight: normal;
                margin-left: .5rem;

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
