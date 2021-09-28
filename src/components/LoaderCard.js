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
  background-color: ${props => props.theme.colors.cardBg};
  color: ${props => props.theme.colors.font};
  
  &:hover {
    background-color: #707070;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.75);
  }
`

export default LoaderCard