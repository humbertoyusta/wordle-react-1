// Create a styled component for a board cell with a letter inside
// having a background color depending on the status of the letter
// with borders soft rounded and a shadow
import styled, {keyframes} from "styled-components";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

// create a keyframe that changes the background color of the element
const colorAnimation = keyframes`
    0% {
        background-color: #f2f2f2;
    }
    100% {
        background-color: var(--color-animation-color);
    }
`;

export const BoardCellButton = styled.button<{status: Number, letter: String}>`
  justify-content: center;
  align-items: center;
  width: ${props => props.letter.length === 1 ? "56px" : "74px"};
  color: rgba(0, 0, 0, 0.7);
  margin: 4px;
  height: 56px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  
  --color-animation-color:${props =>
      props.status === LetterCellStatusEnum.REVEALED ? "#bfe7a9" :
          props.status === LetterCellStatusEnum.CORRECT ? "#d4ffbc" :
              props.status === LetterCellStatusEnum.BAD_POSITION ? "#ffff9f" :
                  props.status === LetterCellStatusEnum.INCORRECT ? "#ffb3b3" :
                      "#ffffff"
  };
  animation: ${props => props.status !== LetterCellStatusEnum.EMPTY ? colorAnimation : "none"} 0.3s ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;