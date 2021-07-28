import axios from "axios";
import {
    popularGamesURL,
    upcomingGamesURL,
    newGamesURL,
    gameDetailURL,
    gameScreenshotURL,
    searchGameURL,
    gameMovieURL
} from "../api";
import { CLEAR_SEARCHED, FETCH_GAMES, FETCH_SEARCHED, GET_DETAIL, LOADING_DETAIL, SHOW_LOADER } from "../utils/constants";

export const showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const loadGames = () => async (dispatch) => {
    const upcomingData = await axios.get(upcomingGamesURL())
    const newGamesData = await axios.get(newGamesURL())
    const popularData = await axios.get(popularGamesURL())

    dispatch({
        type: FETCH_GAMES,
        payload: {
            upcoming: upcomingData.data.results,
            newGames: newGamesData.data.results,
            popular: popularData.data.results
        }
    })
}

export const loadDetail = (id) => async (dispatch) => {
    dispatch({
        type: LOADING_DETAIL
    })

    const detailData = await axios.get(gameDetailURL(id))
    const screenshotData = await axios.get(gameScreenshotURL(id))
    const movieData = await axios.get(gameMovieURL(id))

    dispatch({
        type: GET_DETAIL,
        payload: {
            game: detailData.data,
            screenshot: screenshotData.data,
            movie: movieData.data,
        }
    })
}

export const fetchSearched = (game_name) => async (dispatch) => {
    const searchedData = await axios.get(searchGameURL(game_name))

    dispatch({
        type: FETCH_SEARCHED,
        payload: {
            searched: searchedData.data.results,
        }
    })
}
