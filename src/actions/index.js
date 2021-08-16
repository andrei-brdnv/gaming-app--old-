import axios from "axios";
import {
    popularGamesURL,
    upcomingGamesURL,
    newGamesURL,
    gameDetailURL,
    gameScreenshotURL,
    searchGameURL,
    gameMovieURL,
    gameSeriesURL
} from "../api";
import {
    CLEAR_SEARCHED,
    FETCH_GAMES,
    FETCH_GAMESERIES, FETCH_NEWGAMES, FETCH_POPULAR,
    FETCH_SEARCHED, FETCH_UPCOMING,
    GET_DETAIL,
    LOADING_DETAIL,
    SHOW_LOADER, START, SUCCESS
} from "../utils/constants";
import firebase from "firebase/app";
import {getFirebase} from "react-redux-firebase";

export const showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const fetchUpcoming = (upcomingCurrentPage) => async (dispatch) => {
    dispatch({
        type: FETCH_UPCOMING + START
    })

    await axios.get(upcomingGamesURL(upcomingCurrentPage))
        .then(response => dispatch({
                type: FETCH_UPCOMING + SUCCESS,
                payload: {
                    upcoming: response.data.results,
                    totalPagesUpcoming: response.data.count
                }
            })
        )
}

export const fetchPopular = (popularCurrentPage) => async (dispatch) => {
    dispatch({
        type: FETCH_POPULAR + START
    })

    await axios.get(popularGamesURL(popularCurrentPage))
        .then(response => dispatch({
                type: FETCH_POPULAR + SUCCESS,
                payload: {
                    popular: response.data.results,
                    totalPagesPopular: response.data.count
                }
            })
        )
}

export const fetchNewGames = (newGamesCurrentPage) => async (dispatch) => {
    dispatch({
        type: FETCH_NEWGAMES + START
    })

    await axios.get(newGamesURL(newGamesCurrentPage))
        .then(response => dispatch({
                type: FETCH_NEWGAMES + SUCCESS,
                payload: {
                    newGames: response.data.results,
                    totalPagesNewGames: response.data.count
                }
            })
        )
}




export const loadGames = (upcomingPage) => async (dispatch) => {
    const upcomingData = await axios.get(upcomingGamesURL(upcomingPage))
    const newGamesData = await axios.get(newGamesURL())
    const popularData = await axios.get(popularGamesURL())

    dispatch({
        type: FETCH_GAMES,
        payload: {
            upcoming: upcomingData.data.results,
            totalPagesUpcoming: upcomingData.data.count,
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

export const fetchGameSeries = (id) => async (dispatch) => {
    const gameSeriesData = await axios.get(gameSeriesURL(id))

    dispatch({
        type: FETCH_GAMESERIES,
        payload: {
            gameSeries: gameSeriesData.data.results,
        }
    })
}

export const signIn = (credentials) => {
    return (dispatch, getFirebase) => {


        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
            .then(() => {
                dispatch({type: 'LOGIN_SUCCESS'});
            }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getFirebase) => {

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS' })
            })
    }
}
