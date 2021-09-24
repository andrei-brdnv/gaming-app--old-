import React from "react";
// Styles
import styled from "styled-components";

const LoaderCard = ({ onClick, name }) => {
    return (
        <Loader onClick={() => onClick()}>
            <span>{`Load more ${name} games`}</span>
        </Loader>
    )
}

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 35vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-size: 1.5rem;
  text-align: center;
  transition: all 0.15s linear;
  cursor: pointer;
  color: #333;
  
  &:hover {
    background-color: #B8B8B8;
    color: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.75);
  }
`

export default LoaderCard