<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        login() {
            if (this.store.username !== "") {
                this.store.loadingMessage = "ACCESSO IN CORSO";
                this.store.loading = true;

                localStorage.setItem("Username", this.store.username)
                setTimeout(() => {
                    this.store.loading = false;
                    this.store.login = false;
                    this.store.loadingMessage = "RICERCA IN CORSO";
                }, 3000);
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <h2>DEVI EFFETTUARE IL LOGIN PER IL TUO PRIMO ACCESSO</h2>
        <label for="login">INSERISCI IL TUO NOME</label>
        <input type="text" id="login" @keyup.enter="login" v-model.trim="store.username">
        <button @click="login">LOGIN</button>
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use '../style/partials/variables' as *;

.container {
    padding: 3rem;
    @include flex (column, center, center, nowrap);
    gap: 2rem;

    button {
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

    label {
        color: white;
        font-size: 1.5rem;
    }

    h2 {
        color: $primary-color;
        font-size: 2rem;
    }

    input {
        padding: .5rem 1rem;
    }
}
</style>
