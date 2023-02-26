import styled from "styled-components";

export const RevealPositionButton = styled.button`
    background-image: url("/hint.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    width: 56px;
    color: rgba(0, 0, 0, 0.7);
    height: 56px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    margin: 0 50% 0 50%;
    transform: translateX(-50%);
    margin-top: 10px;
`;