import { FETCH_GAMES, FETCH_SEARCHED, SHOW_LOADER, CLEAR_SEARCHED } from "../utils/constants";

const initState = {
    upcoming: [],
    newGames: [],
    popular: [],
    searched: [],
    loading: false,
}

const gamesReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SHOW_LOADER:
            return {
                ...state,
                loading: true
            }
        case FETCH_GAMES:
            return {
                ...state,
                upcoming: payload.upcoming,
                newGames: payload.newGames,
                popular: payload.popular,
                loading: false
            }
        case FETCH_SEARCHED:
            return {
                ...state,
                searched: payload.searched
            }
        case CLEAR_SEARCHED:
            return {
                ...state,
                searched: []
            }
        default:
            return {...state}
    }
}

export default gamesReducer