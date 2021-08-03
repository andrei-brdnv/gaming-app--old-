import React, {useEffect, useLayoutEffect, useRef} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {fetchGameSeries, loadDetail, loadGames} from "../actions";
import { Link, useHistory } from "react-router-dom";
import { smallImage } from "../utils/mediaResize";
import getPlatformLogo from "../utils/getPlatformLogo";
import metacriticBorder from "../utils/metacriticBorder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faTimes} from "@fortawesome/free-solid-svg-icons";
import {CLEAR_GAMESERIES, CLEAR_SEARCHED} from "../utils/constants";

import usePrevious from "../utils/usePrevious";

const Game = ({ name, released, image, id, platforms, genres, rating, metacritic }) => {
    // Fix scrolling when hitting back in browser
    const history = useHistory()
    if (history.location.pathname === '/') {
        document.body.style.overflow = 'auto'
        document.body.style.marginRight = '0'
    } else {
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = '8px'
    }

    const dispatch = useDispatch()
    const loadDetailHandler = () => {
        document.body.style.overflow = 'hidden'
        dispatch(loadDetail(id))
    }

    /*useEffect(() => {
        dispatch(fetchGameSeries())
        dispatch({type: CLEAR_SEARCHED})
    }, [dispatch])*/

    const loadGameSeries = (e) => {
        e.preventDefault()
        dispatch(fetchGameSeries(id))
        console.log(id)
        dispatch({type: CLEAR_SEARCHED})

    }

    const { gameSeries } = useSelector((store => store.games))

    const prevState = usePrevious(gameSeries)
    console.log(prevState)

    useLayoutEffect(() => {

        if (gameSeries.length > 0) {
            const element = document.querySelector("#game-series").offsetTop


            window.scrollTo({
                top: element - 112
            })
        }

    }, [gameSeries])

    return (
        <StyledGame>

                <img
                    src={smallImage(image, 640)}
                    alt={name}
                />
                <div className="info">
                    <Platforms>
                        {platforms && platforms.map(data => (
                            <Icon key={data.platform.id}>{getPlatformLogo(data.platform.name)}</Icon>
                        ))}
                    </Platforms>
                    <div className={`metacritic ${metacriticBorder(metacritic)}`} title={"Metacritic"}>
                        {metacritic}
                    </div>
                </div>
            <Link to={`/game/${id}`}>

                <h3 onClick={loadDetailHandler}>{name}</h3>
            </Link>

                <div className="more-info">
                    <div className="release">
                        <span>Release date:</span>
                        <span>{released}</span>
                    </div>
                    <div className="genre">
                        <span>Genres:</span>
                        <div>
                            {genres.map((genre, i) => (
                                <span className="genre-list" key={genre.id}>
                                {genre.name}
                            </span>
                            ))}
                        </div>

                    </div>
                    <div className="rating">
                        <span>Rating:</span>
                        <span>{rating}</span>
                    </div>
                    <div className="show-more">
                        <button onClick={loadGameSeries}>
                            Show more of this game series
                            <span>
                                <FontAwesomeIcon icon={faChevronRight} title={'Show more'} />
                            </span>
                        </button>
                    </div>
                </div>


        </StyledGame>
    )
}

const StyledGame = styled.div`
  max-height: 50vh;
  //max-height: 40vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 1rem;
  //overflow: hidden;
  position: relative;

  img {
    width: 100%;
    //height: auto;
    height: 30vh;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
  }
  
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem 0 1rem;
  }
  
  .metacritic {
    font-weight: bold;
  }
  
  .metacritic.green {
    border: 2px solid green;
    padding: 0.1rem 0.2rem;
  }
  
  .metacritic.yellow {
    border: 2px solid orange;
    padding: 0.1rem 0.2rem;
  }

  .metacritic.red {
    border: 2px solid red;
    padding: 0.1rem 0.2rem;
  }
  
  .metacritic.not-active {
    border: none;
  }
  
  h3 {
    padding: 1rem;
  }
  
  h3:hover {
    opacity: 0.75;
    transition: all 0.15s linear;
  }

  .more-info {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: calc(100% + 2px);
    border-radius: 0 0 1rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top: none;
    //box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.5);
    transition: all .25s linear;
    margin-left: -1px;
    margin-right: -1px;
    background-color: #fff;
    
    padding: 1rem;
    z-index: 10;
    
    span {
      font-size: 0.75rem;
      font-weight: 500;
      color: #333;
    }
    
    /*div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }*/
    
    .release {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }
    
    .genre {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
      
      div {
        display: inline;
      }
    }
    
    .genre-list {
      text-decoration: underline;
      cursor: pointer;
    }
    
    .genre-list + .genre-list::before {
      display: inline-block;
      white-space: pre-wrap;
      content: ", ";
    }
    
    .rating {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }
    
    .show-more {
      
      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.5rem;
        cursor: pointer;

        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        
        span {
          font-size: 1.5rem;
        }
      }
    }
  }
  
  &:hover {
    border-radius: 1rem 1rem 0 0;
    //box-shadow: 5px -5px 5px -2px rgba(0, 0, 0, 0.5);
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: none;
    transform: scale(1.05);
    transition: all .05s ease-in-out;
    z-index: 10;
  }
  
  &:hover .more-info {
    display: flex;
    
  }
`

const Platforms = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //padding: 1rem 0 0 0.5rem;
`

const Icon = styled.div`
  display: block;
  font-size: 1rem;
  margin-left: 0.5rem;
  color: #3d3d3d;
  
  &:first-child {
    margin: 0;
  }
`

export default Game