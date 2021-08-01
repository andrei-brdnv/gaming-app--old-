import React from "react";
import styled from "styled-components";

const Skeleton = () => {
    return (
        <StyledSkeleton>
            <div className="skeleton">
                <div className="skeleton-img"></div>
                <div className="skeleton-icons"></div>
                <div className="skeleton-title"></div>
            </div>
            <div className="shimmer-wrapper">
                <div className="shimmer">

                </div>
            </div>
        </StyledSkeleton>
    )
}

const StyledSkeleton = styled.div`
  max-height: 50vh;
  //max-height: 40vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 1rem;
  //overflow: hidden;
  position: relative;
  overflow: hidden;
  
  .skeleton-img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
    background: #B8B8B8;
  }
  
  .skeleton-icons {
    background: #B8B8B8;
    width: 30%;
    height: 1rem;
    margin: 1rem 1rem 0 1rem;
  }
  
  .skeleton-title {
    margin: 1rem;
    height: 1.5rem;
    background: #B8B8B8;
  }
  
  .shimmer-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loading 2.5s infinite;
  }
  
  .shimmer {
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.25);
    //transform: skewX(-45deg);
    box-shadow: 0 0 5rem 5rem rgba(255, 255, 255, 0.1);
  }
  
  @keyframes loading {
    //0% {transform: translateX(-150%)}
    0% {transform: translateX(-75%)}
    100% {transform: translateX(150%)}
  }
`

export default Skeleton