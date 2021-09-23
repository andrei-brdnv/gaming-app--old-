import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loadDetail } from "../actions";
import { smallImage } from "../utils/mediaResize";
import getPlatformLogo from "../utils/getPlatformLogo";
import metacriticBorderStyle from "../utils/metacriticBorderStyle";
// Styles
import styled from "styled-components";
import GameCardMore, {Container} from "./GameCardMore";

const GameCard = ({ name, released, image, id, platforms, genres, rating, metacritic }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    if (history.location.pathname === '/') {
        document.body.style.overflow = 'auto'
        document.body.style.marginRight = '0'
    } else {
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = '8px'
    }

    const showPlatformLogo = useMemo(() => {
        return platforms.map(data => (
            <Icon key={data.platform.id}>{getPlatformLogo(data.platform.name)}</Icon>
        ))
    }, [platforms])

    const showMetacriticBorder = useMemo(() => {
        return metacriticBorderStyle(metacritic)
    }, [metacritic])

    const loadDetailHandler = () => {
        dispatch(loadDetail(id))
    }

    return (
        <Card>
            <Link to={`/game/${id}`} onClick={loadDetailHandler}>
                <img src={smallImage(image, 640)} alt={name} />
            </Link>
            <Info>
                <Platforms>{platforms && showPlatformLogo}</Platforms>
                <Metascore className={`metacritic ${showMetacriticBorder}`} title={"Metascore"}>{metacritic}</Metascore>
            </Info>
            <Link to={`/game/${id}`}>
                <h3 onClick={loadDetailHandler}>{name}</h3>
            </Link>

            <GameCardMore
                released={released}
                genres={genres}
                rating={rating}
                id={id}
            />
        </Card>
    )
}

export const Card = styled.div`
  max-height: 50vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  text-align: left;
  border-radius: 1rem;
  position: relative;
  
  img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
  }

  h3 {
    padding: 1rem;
  }

  h3:hover {
    opacity: 0.75;
    transition: all 0.15s linear;
  }
  
  &:hover {
    border-radius: 1rem 1rem 0 0;
    box-shadow: none;
    transform: scale(1.025);
    transition: all .05s ease-in-out;
    background-color: #ededed;
    z-index: 10;
  }
  
  &:hover ${Container} {
    display: flex;
  }
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
`

const Metascore = styled.div`
  font-weight: bold;

  &.green {
    border: 2px solid green;
    padding: 0.1rem 0.2rem;
  }

  &.yellow {
    border: 2px solid orange;
    padding: 0.1rem 0.2rem;
  }

  &.red {
    border: 2px solid red;
    padding: 0.1rem 0.2rem;
  }

  &.not-active {
    border: none;
  }
`

export const Platforms = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`

export const Icon = styled.div`
  display: block;
  font-size: 1rem;
  margin-right: 0.5rem;
  color: #3d3d3d;
`

export default GameCard