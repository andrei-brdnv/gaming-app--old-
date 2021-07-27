import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {loadDetail, loadGames} from "../actions";
import { Link, useHistory } from "react-router-dom";
import { smallImage } from "../utils/mediaResize";
import getPlatformLogo from "../utils/getPlatformLogo";
import metacriticBorder from "../utils/metacriticBorder";

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

    const { game } = useSelector((store => store.detail))

    return (
        <StyledGame onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <img
                    src={smallImage(image, 640)}
                    alt={name}
                />
                <div className="info">
                    <Platforms>
                        {platforms.map(data => (
                            <Icon key={data.platform.id}>{getPlatformLogo(data.platform.name)}</Icon>
                        ))}
                    </Platforms>
                    <div className={`metacritic ${metacriticBorder(metacritic)}`} title={"Metacritic"}>
                        {metacritic}
                    </div>
                </div>

                <h3>{name}</h3>


                <div className="more-info">
                    <div className="release">
                        <span>Release date:</span>
                        <span>{released}</span>
                    </div>
                    <div className="genre">
                        <span>Genres:</span>
                        <div>
                            {genres.map(genre => (
                                <span className="genre-list" key={genre.id}>{genre.name}</span>
                            ))}
                        </div>

                    </div>
                    <div className="rating">
                        <span>Rating:</span>
                        <span>{rating}</span>
                    </div>
                </div>

            </Link>
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
  cursor: pointer;
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
    padding: 1rem;
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
      font-size: 0.8rem;
      color: #333;
    }
    
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .release {
      margin-bottom: 1rem;
    }
    
    .genre {
      margin-bottom: 1rem;
    }
    
    .genre-list + .genre-list::before {
      content: ", ";
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
  font-size: 1.2rem;
  margin-left: 0.5rem;
  
  &:first-child {
    margin: 0;
  }
`

export default Game