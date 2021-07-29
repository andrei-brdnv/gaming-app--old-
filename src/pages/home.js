import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames, showLoader } from "../actions";
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

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showLoader())
        dispatch(loadGames())
    }, [dispatch])

    const { upcoming, newGames, popular, searched, loading, gameSeries } = useSelector((store => store.games))

    const location = useLocation()
    const pathId = location.pathname.split('/')[2]

    const { dictionary } = useContext(AppLangContext)

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }

    const clearGameSeries = () => {
        dispatch({type: CLEAR_GAMESERIES})
    }

    return (
        <GameList>
            {pathId && <GameDetail/>}

            {gameSeries.length ? (
                <Section>
                    <Searched>
                        <h2>Games like
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

            {searched.length ? (
                <Section>
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

            <Section id="upcoming">
                <h2><Text tid='upcoming games' /></h2>
                {loading ? <SimpleLoader/> : (
                    <Games>

                        {upcoming.map(game => (
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
                )}
            </Section>


            <Section id="popular">
                <h2>Popular games</h2>
                {loading ? <SimpleLoader/> : (
                    <Games>
                        {console.log(popular.map(game => console.log(game)))}
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
                )}
            </Section>

            <Section id="new-games">
                <h2>New games</h2>
                {loading ? <SimpleLoader/> : (
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
                )}
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

const Section = styled.section`
  margin-bottom: 5rem;
`

const Games = styled.div`
  min-height: 40vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
`

export default Home