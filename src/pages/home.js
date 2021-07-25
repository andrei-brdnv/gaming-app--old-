import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames, showLoader } from "../actions";
import styled from "styled-components";
import Game from "../components/Game";
import { useLocation } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import SimpleLoader from "../components/Loader";
import { AppLangContext, Text } from "../utils/AppLangProvider";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showLoader())
        dispatch(loadGames())
    }, [dispatch])

    const { upcoming, newGames, popular, searched, loading } = useSelector((store => store.games))

    const location = useLocation()
    const pathId = location.pathname.split('/')[2]

    const { dictionary } = useContext(AppLangContext)

    return (
        <GameList>
            {pathId && <GameDetail/>}

            {searched.length ? (
                <>
                    <h2>Searched games</h2>
                    <Games>

                        {searched.map(game => (
                            <Game
                                key={game.id}
                                id={game.id}
                                name={game.name}
                                released={game.released}
                                image={game.background_image}
                            />
                        ))}
                    </Games>
                </>
            ) : null}

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
                        />
                    ))}
                </Games>
            )}

            <h2>Popular games</h2>
            {loading ? <SimpleLoader/> : (
                <Games>
                    {popular.map(game => (
                        <Game
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            released={game.released}
                            image={game.background_image}
                        />
                    ))}
                </Games>
            )}

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
                        />
                    ))}
                </Games>
            )}
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
    padding: 0 0 0 2rem;
    cursor: pointer;
    vertical-align: middle;
  }

  span:hover {
    color: #000;
  }

  div:hover {
    opacity: 1;
    transition: opacity .4s linear;
  }
`

const Games = styled.div`
  min-height: 40vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  margin-bottom: 3rem;
`

export default Home