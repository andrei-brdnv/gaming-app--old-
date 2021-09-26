import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavourite, deleteFavourite, loadDetail } from "../actions";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const GameCardMore = ({ released, genres, rating, id }) => {
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store.firebase)
    const { list } = useSelector(store => store.favourites)

    const addToFavouriteHandler = () => {
        dispatch(addToFavourite(id))
    }

    const deleteFavHandler = () => {
        dispatch(deleteFavourite(id))
    }

    const loadDetailHandler = () => {
        dispatch(loadDetail(id))
    }

    return (
        <Container>
            <InfoItem>
                <span>Release date:</span>
                <span>{released}</span>
            </InfoItem>
            <InfoItem>
                <span>Genres:</span>
                <span>
                    {genres.map((genre, i) => (
                        <>
                            <UnderlinedLink key={genre.id}>
                                {genre.name}
                            </UnderlinedLink>
                            {i !== genres.length - 1 ? ', ' : ''}
                        </>
                    ))}
                </span>
            </InfoItem>
            <InfoItem>
                <span>Rating:</span>
                <span>{rating}</span>
            </InfoItem>
            {
                auth.uid && list && list.length && list.some(game => game.id === id) &&
                <FavouriteButton onClick={deleteFavHandler}>
                    Remove from favourite
                </FavouriteButton> ||
                auth.uid &&
                <FavouriteButton onClick={addToFavouriteHandler}>
                    Add to favourite
                </FavouriteButton>
            }
            <Link to={`/game/${id}`} onClick={loadDetailHandler}>
                <ShowMoreButton>
                    <span>Show more info</span>
                    <FontAwesomeIcon icon={faChevronRight} title={'Show more'} />
                </ShowMoreButton>
            </Link>
        </Container>
    )
}

export const Container = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 99%;
  left: 0;
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  transition: all .25s linear;
  background-color: #F8F8F8;
  padding: 1rem;
  z-index: 10;
  
  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
  }
`

const UnderlinedLink = styled(Link)`
  text-decoration-line: underline;
  text-decoration-color: #9e9e9e;
  text-underline-offset: 2px;
  cursor: pointer;
  transition: all .15s ease;
  
  &:hover {
    opacity: 0.75;
  }
`

const ShowMoreButton = styled.div`
  background-color: #9e9e9e;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;

  span {
    width: 100%;
    cursor: pointer;
    display: block;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    transition: all .15s ease;
  }
  
  svg {
    font-size: 1.25rem;
    transition: all .15s ease;
  }

  &:hover {
    span {
      color: #ffe082;
    }
    
    svg {
      color: #ffe082;
    }
  }
`

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  
  span:first-child {
    margin-right: 1rem;
  }
`

const FavouriteButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  background-color: #bdbdbd;
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #333;
  font-weight: 400;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  transition: all .25s ease;
  
  &:hover {
    opacity: 0.75;
  }
`

export default GameCardMore