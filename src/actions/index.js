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
    ADD_FAVOURITE,
    CLEAR_SEARCHED, DELETE_FAVOURITE, FAIL, FETCH_DETAIL, FETCH_FAVOURITE,
    FETCH_GAMESERIES,
    FETCH_NEWGAMES,
    FETCH_POPULAR,
    FETCH_SEARCHED,
    FETCH_UPCOMING,
    GET_DETAIL,
    LOADING_DETAIL,
    START,
    SUCCESS
} from "../utils/constants";

/*
export const showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER
    })
}
*/

export const fetchUpcoming = (upcomingCurrentPage) => async (dispatch) => {
    dispatch({
        type: FETCH_UPCOMING + START
    })

    await axios.get(upcomingGamesURL(upcomingCurrentPage))
        .then(response => dispatch({
                type: FETCH_UPCOMING + SUCCESS,
                payload: {
                    upcoming: response.data.results,
                    totalPagesUpcoming: response.data.count,
                    upcomingCurrentPage: upcomingCurrentPage + 1
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
                    totalPagesPopular: response.data.count,
                    popularCurrentPage: popularCurrentPage + 1
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
                    totalPagesNewGames: response.data.count,
                    newGamesCurrentPage: newGamesCurrentPage + 1
                }
            })
        )
}




/*export const loadGames = () => async (dispatch) => {
    const upcomingData = await axios.get(upcomingGamesURL())
    const newGamesData = await axios.get(newGamesURL())
    const popularData = await axios.get(popularGamesURL())

    dispatch({
        type: FETCH_GAMES,
        payload: {
            upcoming: upcomingData.data.results,
            totalPagesUpcoming: upcomingData.data.count,
            newGames: newGamesData.data.results,
            totalPagesNewGames: newGamesData.data.count,
            popular: popularData.data.results,
            totalPagesPopular: popularData.data.count,
        }
    })
}*/

export const loadDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_DETAIL + START
    })

    const detailData = await axios.get(gameDetailURL(id))
    const screenshotData = await axios.get(gameScreenshotURL(id))
    const movieData = await axios.get(gameMovieURL(id))

    dispatch({
        type: FETCH_DETAIL + SUCCESS,
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
    return (dispatch, getState, {getFirebase}) => {

        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
            .then(() => {
                dispatch({type: 'LOGIN_SUCCESS'});
            })
            .then(() => {
                dispatch({ type: FETCH_FAVOURITE + START })
            })
            .catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS' })
            })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                userName: newUser.userName
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).then(() => {
            dispatch({ type: FETCH_FAVOURITE + START })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const addToFavourite = (gameId) => {


    return (dispatch, getState, {getFirebase, getFirestore}) => {

        dispatch({
            type: ADD_FAVOURITE + START
        })

        const firebase = getFirebase()
        const firestore = getFirestore()
        const userId = getState().firebase.auth.uid



        firestore.collection('users').doc(userId).collection('games').add({
            game: gameId,
            addedAt: new Date(),
        })
            .then(() => {
                dispatch({ type: ADD_FAVOURITE + SUCCESS })
            })
            .catch(err => {
                dispatch({ type: ADD_FAVOURITE + FAIL, err })
            })
    }
}

export const fetchFavourites = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const userId = getState().firebase.auth.uid

        dispatch({
            type: FETCH_FAVOURITE + START
        })

            firestore.collection('users').doc(userId).collection('games').orderBy('addedAt', 'desc').get()
                .then(res => {
                    const arr = []
                    res.forEach(document => {
                        arr.push(document.data().game)
                    })

                    return arr


                })
                .then(res => {
                    let requests = res.map(id => axios.get(gameDetailURL(id)))

                    Promise.all(requests)
                        .then(responses => {
                            return responses.map(res => res.data)
                        })
                        .then(res => {
                            dispatch({
                                type: FETCH_FAVOURITE + SUCCESS,
                                payload: res
                            })
                        })
                })
    }
}


export const deleteFavourite = (gameId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({
            type: DELETE_FAVOURITE + START
        })

        const firebase = getFirebase()
        const firestore = getFirestore()
        const userId = getState().firebase.auth.uid

        firestore.collection('users').doc(userId).collection('games').where('game', '==', gameId).get()
            .then(res => {
                res.forEach(doc => {
                    doc.ref.delete()
                })
            })
            .then(() => {
                dispatch({ type: DELETE_FAVOURITE + SUCCESS })
            })
    }
}