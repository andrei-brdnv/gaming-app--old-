import {
    FETCH_GAMES,
    FETCH_SEARCHED,
    SHOW_LOADER,
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
    totalPagesUpcoming: 0,
    upcomingCurrentPage: 1,
    popular: [],
    totalPagesPopular: 0,
    popularCurrentPage: 1,
    newGames: [],
    totalPagesNewGames: 0,
    newGamesCurrentPage: 1,
    searched: [],
    gameSeries: [],
    fetchingUpcoming: true,
    fetchingPopular: true,
    fetchingNewGames: true,
    loaded: false,
    firstLoading: false
}

const gamesReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SHOW_LOADER:
            return {
                ...state,
                firstLoading: true
            }
        case FETCH_GAMES:
            return {
                ...state,
                upcoming: [...state.upcoming, ...payload.upcoming],
                totalPagesUpcoming: payload.totalPagesUpcoming,
                newGames: payload.newGames,
                popular: payload.popular,
                loading: false,
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

        default:
            return {...state}
    }
}

export default gamesReducer