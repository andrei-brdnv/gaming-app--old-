import React, {useEffect, useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchNewGames, fetchPopular, fetchUpcoming, loadGames, showLoader} from "../actions";
import styled from "styled-components";
import Game from "../components/Game";
import { useLocation } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import SimpleLoader from "../components/Loader";
import { AppLangContext, Text } from "../utils/AppLangProvider";
import { clearSearched } from "../actions";
import getPlatformLogo from "../utils/getPlatformLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {CLEAR_GAMESERIES, CLEAR_SEARCHED} from "../utils/constants";

import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "../components/Skeleton";

const Home = () => {
    const dispatch = useDispatch();

    const [upcomingCurrentPage, setUpcomingCurrentPage] = useState(1)
    const [popularCurrentPage, setPopularCurrentPage] = useState(1)
    const [newGamesCurrentPage, setNewGamesCurrentPage] = useState(1)

    /*useEffect(() => {
        dispatch(showLoader())
        dispatch(loadGames(upcomingPage))
    }, [dispatch, upcomingPage])*/

    const { upcoming, totalPagesUpcoming, popular, totalPagesPopular, newGames, totalPagesNewGames, fetching, searched, firstLoading, gameSeries } = useSelector((store => store.games))

    const location = useLocation()
    const pathId = location.pathname.split('/')[2]

    const { dictionary } = useContext(AppLangContext)

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }

    const clearGameSeries = () => {
        dispatch({type: CLEAR_GAMESERIES})
    }


    useEffect(() => {
        if (!upcoming.length) {
            dispatch(showLoader())
        }

        dispatch(fetchUpcoming(upcomingCurrentPage))
    }, [upcomingCurrentPage])

    useEffect(() => {
        dispatch(fetchPopular(popularCurrentPage))
    }, [popularCurrentPage])

    useEffect(() => {
        dispatch(fetchNewGames(newGamesCurrentPage))
    }, [newGamesCurrentPage])



    return (
        <GameList>
            {pathId && <GameDetail/>}
            <AnimatePresence>
                {gameSeries.length ? (
                    <Section
                        id="game-series"
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Searched>
                            <h2>Games series
                                <span onClick={clearGameSeries}>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    title={'Delete'}
                                />
                            </span>
                            </h2>
                        </Searched>

                        <Games>

                            {gameSeries.map(game => (
                                <Game
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    released={game.released}
                                    image={game.background_image}
                                    platforms={game.platforms}
                                    genres={game.genres}
                                    rating={game.rating}
                                    metacritic={game.metacritic}
                                />
                            ))}
                        </Games>
                    </Section>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {searched.length ? (
                    <Section
                        id="searched"
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Searched>
                            <h2>Searched games
                                <span onClick={clearSearched}>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    title={'Delete'}
                                />
                            </span>
                            </h2>
                        </Searched>

                        <Games>

                            {searched.map(game => (
                                <Game
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    released={game.released}
                                    image={game.background_image}
                                    platforms={game.platforms}
                                    genres={game.genres}
                                    rating={game.rating}
                                    metacritic={game.metacritic}
                                />
                            ))}
                        </Games>
                    </Section>
                ) : null}
            </AnimatePresence>


            <Section id="upcoming">
                <h2><Text tid='upcoming games'/></h2>

                <Games>
                    {!upcoming.length && Array.from({length: 20}, (_, i) => i + 1).map((n) => <Skeleton key={n} />)}

                    {upcoming && upcoming.map(game => (
                        <Game
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            released={game.released}
                            image={game.background_image}
                            platforms={game.platforms}
                            genres={game.genres}
                            rating={game.rating}
                            metacritic={game.metacritic}
                        />
                    ))}


                </Games>
                {upcoming.length < totalPagesUpcoming && totalPagesUpcoming !== upcomingCurrentPage &&
                    <button className="btn-load-more" onClick={() => setUpcomingCurrentPage(upcomingCurrentPage + 1)}>
                        {fetching ? <SimpleLoader /> : "Load More"}
                    </button>
                }
            </Section>

            <Section id="popular">
                <h2>Popular games</h2>

                <Games>
                    {popular.map(game => (
                        <Game
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            released={game.released}
                            image={game.background_image}
                            platforms={game.platforms}
                            genres={game.genres}
                            rating={game.rating}
                            metacritic={game.metacritic}
                        />
                    ))}
                </Games>
                {popular.length < totalPagesPopular && totalPagesPopular !== popularCurrentPage &&
                    <button className="btn-load-more" onClick={() => setPopularCurrentPage(popularCurrentPage + 1)}>
                        {'Load More'}
                    </button>
                }
            </Section>

            <Section id="new-games">
                <h2>New games</h2>

                <Games>
                    {newGames.map(game => (
                        <Game
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            released={game.released}
                            image={game.background_image}
                            platforms={game.platforms}
                            genres={game.genres}
                            rating={game.rating}
                            metacritic={game.metacritic}
                        />
                    ))}
                </Games>
                {newGames.length < totalPagesNewGames && totalPagesNewGames !== newGamesCurrentPage &&
                    <button className="btn-load-more" onClick={() => setNewGamesCurrentPage(newGamesCurrentPage + 1)}>
                        {'Load More'}
                    </button>
                }
            </Section>

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

const Section = styled(motion.section)`
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
`

export default Home