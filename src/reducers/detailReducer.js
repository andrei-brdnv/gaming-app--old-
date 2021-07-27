import { GET_DETAIL, LOADING_DETAIL } from "../utils/constants";

const initState = {
    game: { platforms: [] },
    screenshot: { results: [] },
    movie: { results: [] },
    isLoading: true
}

const detailReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_DETAIL:
            return {
                ...state,
                game: payload.game,
                screenshot: payload.screenshot,
                movie: payload.movie,
                isLoading: false,
            }
        case LOADING_DETAIL:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return {...state}
    }
}

export default detailReducer