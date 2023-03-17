import { getOneMonthAgoReleaseDate } from "./utilityFunctions";
const ONE_MONTH_AGO = getOneMonthAgoReleaseDate();

export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
	fetchSearchQuery: `/search/multi?api_key=${API_KEY}&query=`,
	fetchTrendingAll: `/trending/all/week?api_key=${API_KEY}&sort_by=popularity.desc`,
	fetchReleasedMoviesByOneMonth: `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${ONE_MONTH_AGO}&sort_by=popularity.desc`,

	//MOVIES
	fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&sort_by=popularity.desc`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&sort_by=popularity.desc`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
	fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	discoverMovies: `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,

	//SERIES
	fetchTrendingSeries: `/trending/tv/week?api_key=${API_KEY}&sort_by=popularity.desc`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&sort_by=popularity.desc`,
	fetchActionAdventureSeries: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
	fetchAnimationSeries: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
	fetComedySeries: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
	fetchCrimeSeries: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
	fetchDocumentarySeries: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
	fetchFamilySeries: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
	fetchKidsSeries: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
	fetchSciFiFantasySeries: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
	discoverSeries: `/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`,
};

export default requests;
