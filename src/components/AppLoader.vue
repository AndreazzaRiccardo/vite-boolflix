<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="loader">
        <h2>{{ store.loadingMessage }}</h2>
        <div class="col-xs-12">
            <div class="well">
                <i class="ex-10-icon fas fa-circle-notch"></i>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
}

h2 {
    color: white;
    font-size: 4rem;
}

.ex-10-icon {
    color: white;
    font-size: 5rem;
    animation: rotation .9s linear infinite reverse;

    @keyframes rotation {
        25% {
            transform: rotate(90deg)
        }

        50% {
            transform: rotate(180deg);
        }

        75% {
            transform: rotate(270deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
