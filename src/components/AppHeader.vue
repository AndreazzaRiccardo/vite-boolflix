<script>
export default {

}
</script>

<template>
    <header>
        <h1>BOOLFLIX</h1>
        <div class="search-bar">
            <label for="search"><i class="fa-solid fa-magnifying-glass"></i></label>
            <input @keyup.enter="$emit('search-film')" placeholder="Cerca un titolo" type="text" name="" id="search">
        </div>
    </header>
</template>

<style lang="scss">
@use "../style/partials/mixins" as *;

header {
    padding: 2rem;
    background-color: rgb(41, 41, 41);
    @include flex (row, space-between, center);

    h1 {
        font-size: 2rem;
        color: red;
    }

    .search-bar {
        padding: .5rem;
        background-color: white;

        input {
            border: none;
            margin-left: .5rem;
            outline: none;
            font-weight: bold;
        }
    }
}
</style>
