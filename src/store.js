import { reactive } from "vue";

export const store = reactive({
    films: [],
    series: [],
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: import.meta.env.VITE_FUT_API_KEY,
    loading: false,
    searchText: "",
    filmsGenres: [],
    seriesGenres: [],
    allGenres: [],
    filterValue: 0,
    filterFilms: [],
    filterSeries: [],
    searchMessage: "I PIU' VISTI:",
    username: "",
    login: true,
    loadingMessage: ""
});

