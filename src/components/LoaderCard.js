import React from "react";
import styled from "styled-components";

const LoaderCard = ({ onClick }) => {
    return (
        <Loader onClick={() => onClick()}>
            Load more games
        </Loader>
    )
}

const Loader = styled.div`
  max-height: 50vh;
  min-height: 40vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-align: center;
  transition: all 0.15s linear;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #B8B8B8;
    color: white;
  }
`

export default LoaderCard