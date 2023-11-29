import { reactive } from "vue";

export const store = reactive({
    films: [],
    series: [],
    baseUrl: 'https://api.themoviedb.org/3/',
    // apiKey: import.meta.env.VITE_FUT_API_KEY,
    apiKey: "8c83d4a4bdc4a69e91e0092b1d0762ea",
    loading: false,
    searchText: ""
});

