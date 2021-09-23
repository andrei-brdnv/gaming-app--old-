import React, {useEffect, useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFavourites,
    fetchNewGames,
    fetchPopular,
    fetchUpcoming,
    loadGames,
    showLoader,
    addToFavourite,
    deleteFavourite,
    fetchUpcomingStart,
    fetchPopularStart,
    fetchNewGamesStart, fetchSearched, fetchSearchedStart
} from "../actions";
import styled from "styled-components";
import Game from "../components/GameCard";
import { useLocation } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import SimpleLoader from "../components/Loader";
import { AppLangContext, Text } from "../context/AppLangProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {
    CLEAR_GAMESERIES,
    CLEAR_SEARCHED,
    FETCH_NEWGAMES,
    FETCH_POPULAR,
    FETCH_UPCOMING,
    START
} from "../utils/constants";

import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "../components/Skeleton";

import Section from "../components/Section";

import data from '../utils/mockedstate'
import SearchedGames from "../components/SearchedGames";
import FavouriteGames from "../components/FavouriteGames";

const Home = () => {
    const dispatch = useDispatch();

    //const [upcomingCurrentPage, setUpcomingCurrentPage] = useState(1)
    //const [popularCurrentPage, setPopularCurrentPage] = useState(1)
    //const [newGamesCurrentPage, setNewGamesCurrentPage] = useState(1)



    const { upcoming, totalPagesUpcoming, popular, totalPagesPopular, newGames, totalPagesNewGames, fetchingUpcoming, fetchingPopular, fetchingNewGames, searched, totalPagesSearched, fetchingSearched, firstLoading, gameSeries, loaded, upcomingCurrentPage, popularCurrentPage, newGamesCurrentPage, searchedCurrentPage } = useSelector(store => store.games)
    //const { upcoming, popular, newGames } = data.games
    //const { totalPagesUpcoming, totalPagesPopular, totalPagesNewGames, fetchingUpcoming, fetchingPopular, fetchingNewGames, searched, firstLoading, gameSeries, loaded, upcomingCurrentPage, popularCurrentPage, newGamesCurrentPage } = useSelector(store => store.games)
    const { list, fetchFavourite } = useSelector(store => store.favourites)
    const { auth } = useSelector((store => store.firebase))
    const { signIn } = useSelector((store => store.auth))

    /*useFirestoreConnect(['games'])
    const games = useSelector((state => state.firestore.data.games))
    console.log(games)*/

    const location = useLocation()
    const pathId = location.pathname.split('/')[2]

    const { dictionary } = useContext(AppLangContext)

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }


    /*useEffect(() => {
        dispatch(showLoader())
        !loaded && dispatch(loadGames())
    }, [])*/


    /*useEffect(() => {
        if (fetchingUpcoming) {
            dispatch(fetchUpcoming(upcomingCurrentPage))
        }


    }, [fetchingUpcoming])*/

    /*useEffect(() => {
        if (fetchingPopular) {
            dispatch(fetchPopular(popularCurrentPage))
        }

    }, [fetchingPopular])

    useEffect(() => {
        if (fetchingNewGames) {
            dispatch(fetchNewGames(newGamesCurrentPage))
        }
    }, [fetchingNewGames])

    useEffect(() => {
        if (fetchFavourite) {
            dispatch(fetchFavourites())
        }
    }, [fetchFavourite])*/

    return (
        <GameList>
            {pathId && <GameDetail/>}
            <SearchedGames
                gameArray={searched}
                totalPages={totalPagesSearched}
                currentPage={searchedCurrentPage}
                fetching={fetchingSearched}
                fetch={fetchSearched}
                fetchStart={fetchSearchedStart}
                name={"searched"}
            />

            {auth.uid ? (
                <FavouriteGames
                    gameArray={list}
                    fetching={fetchFavourite}
                    fetch={fetchFavourites}
                    name={"favourite"}
                />
            ) : null}

            <Section
                gameArray={upcoming}
                totalPages={totalPagesUpcoming}
                currentPage={upcomingCurrentPage}
                fetching={fetchingUpcoming}
                fetch={fetchUpcoming}
                fetchStart={fetchUpcomingStart}
                name={"upcoming"}
            />
            <Section
                gameArray={popular}
                totalPages={totalPagesPopular}
                currentPage={popularCurrentPage}
                fetching={fetchingPopular}
                fetch={fetchPopular}
                fetchStart={fetchPopularStart}
                name={"popular"}
            />
            <Section
                gameArray={newGames}
                totalPages={totalPagesNewGames}
                currentPage={newGamesCurrentPage}
                fetching={fetchingNewGames}
                fetch={fetchNewGames}
                fetchStart={fetchNewGamesStart}
                name={"new"}
            />
        </GameList>
    )
}

const GameList = styled.div`
  padding: 7rem 2rem 7rem 0;
  width: 100%;

  h2 {
    padding-bottom: 3rem;
  }
`

const Searched = styled.div`
  display: flex;
  align-items: center;

  /*div {
    color: #9e9e9e;
    opacity: .5;
    margin: 0.5rem 0 0 1rem;
    font-size: 2rem;
    cursor: pointer;
  }
  
  div:hover {
    opacity: 1;
    transition: opacity .4s linear;
  }*/

  span {
    bottom: 0;
    color: #9e9e9e;
    opacity: .5;
    padding: 0 0 0 1rem;
    cursor: pointer;
    vertical-align: middle;
  }

  span:hover {
    //color: #000;
    opacity: 1;
    transition: opacity .15s linear;
  }

  /*div:hover {
    opacity: 1;
    transition: opacity .4s linear;
  }*/
`

const SSection = styled(motion.section)`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  
  .btn-load-more {
    margin: 5rem auto 0 auto;
    padding: 1rem 2rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: #cfd8dc;
    cursor: pointer;
    width: 10rem;
    height: 4rem;
    
  }

  .btn-load-more:hover {
    opacity: 0.75;
    transition: all .05s linear;
  }
`

const Games = styled.div`
  min-height: 40vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
`

export default Home