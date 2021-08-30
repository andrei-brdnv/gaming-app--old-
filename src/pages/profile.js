import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchFavourites } from "../actions";
import {Redirect} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector((store => store.firebase))
    const { list } = useSelector((store => store.favourites))

    const handleClick = () => {
        dispatch(fetchFavourites())
    }

    /*useEffect(() => {
        dispatch(fetchFavourites())
    }, [list])*/

    if (!auth.uid) return <Redirect to={"/"} />

    return (
                <StyledProfile>
                    {list && list.length ? list.map(game => (
                        <div>
                            <p>{game.name}</p>
                            <p>{game.rating}</p>
                            <p>{game.released}</p>
                        </div>
                    )) : null}
                    This is list of favourite games
                    <button onClick={handleClick}>Fetch favourites</button>
                </StyledProfile>

    )
}

const StyledProfile = styled.div`
  margin: 10rem;
`

export default Profile