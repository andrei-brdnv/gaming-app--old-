import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions";
import { Link, useHistory } from "react-router-dom";
import { smallImage } from "../utils/mediaResize";

const Game = ({ name, released, image, id }) => {
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

    return (
        <StyledGame onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <h3>{name}</h3>
                <p>{released}</p>
                <img
                    src={smallImage(image, 640)}
                    alt={name}
                />
            </Link>
        </StyledGame>
    )
}

const StyledGame = styled.div`
  max-height: 40vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`

export default Game