import { reactive } from "vue";

export const store = reactive({
    films: [],
    series: [],
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: import.meta.env.VITE_FUT_API_KEY,
    loading: false,
    searchText: ""
});

