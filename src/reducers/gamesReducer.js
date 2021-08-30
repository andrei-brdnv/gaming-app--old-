import {
    FETCH_SEARCHED,
    CLEAR_SEARCHED,
    FETCH_GAMESERIES,
    CLEAR_GAMESERIES,
    FETCH_UPCOMING,
    START,
    SUCCESS,
    FETCH_POPULAR,
    FETCH_NEWGAMES
} from "../utils/constants";

const initState = {
    upcoming: [],
    fetchingUpcoming: true,
    totalPagesUpcoming: 0,
    upcomingCurrentPage: 1,

    popular: [],
    fetchingPopular: true,
    totalPagesPopular: 0,
    popularCurrentPage: 1,

    newGames: [],
    fetchingNewGames: true,
    totalPagesNewGames: 0,
    newGamesCurrentPage: 1,

    searched: [],
    fetchingSearched: false,

    gameSeries: [],
    fetchingGameSeries: false,

    loaded: false,
}

const gamesReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_UPCOMING + START:
            return {
                ...state,
                fetchingUpcoming: true,
            }
        case FETCH_UPCOMING + SUCCESS:
            return {
                ...state,
                upcoming: [...state.upcoming, ...payload.upcoming],
                totalPagesUpcoming: payload.totalPagesUpcoming,
                upcomingCurrentPage: payload.upcomingCurrentPage,
                fetchingUpcoming: false,
                firstLoading: false,
                loaded: true,
            }
        case FETCH_POPULAR + START:
            return {
                ...state,
                fetchingPopular: true,
            }
        case FETCH_POPULAR + SUCCESS:
            return {
                ...state,
                popular: [...state.popular, ...payload.popular],
                totalPagesPopular: payload.totalPagesPopular,
                popularCurrentPage: payload.popularCurrentPage,
                fetchingPopular: false,
                loaded: true,
            }
        case FETCH_NEWGAMES + START:
            return {
                ...state,
                fetchingNewGames: true,
            }
        case FETCH_NEWGAMES + SUCCESS:
            return {
                ...state,
                newGames: [...state.newGames, ...payload.newGames],
                totalPagesNewGames: payload.totalPagesNewGames,
                newGamesCurrentPage: payload.newGamesCurrentPage,
                fetchingNewGames: false,
                loaded: true,
            }
        case FETCH_SEARCHED:
            return {
                ...state,
                searched: payload.searched,
                totalPages: payload.totalPages,
            }
        case CLEAR_SEARCHED:
            return {
                ...state,
                searched: []
            }
        case FETCH_GAMESERIES:
            return {
                ...state,
                gameSeries: payload.gameSeries,
            }
        case CLEAR_GAMESERIES:
            return {
                ...state,
                gameSeries: [],
            }

        default:
            return {...state}
    }
}

export default gamesReducer