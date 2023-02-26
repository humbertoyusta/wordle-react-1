import styled, {keyframes} from "styled-components";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

// create a keyframe that scales the element up and down
const scaleAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

// create a keyframe that changes the background color of the element
const colorAnimation = keyframes`
    0% {
        background-color: #f2f2f2;
        border: 1px solid #ccc;
    }
    100% {
        background-color: var(--color-animation-color);
        border: 0 solid #fff;
    }
`;

type LetterCellDivProps = {
  status: Number,
  currentlyFilled: Boolean,
  shouldColor: Boolean,
  position: Number,
};

export const LetterCellDiv = styled.div<LetterCellDivProps>`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 45px;
  height: 45px;
  margin: 3px;
  border: ${props => props.currentlyFilled ? "1px solid #ccc" : "none"};
  background-color: #f2f2f2;

  --color-animation-color: ${props =>
      props.status === LetterCellStatusEnum.REVEALED ? "#bfe7a9" :
        props.status === LetterCellStatusEnum.CORRECT ? "#d4ffbc" :
            props.status === LetterCellStatusEnum.BAD_POSITION ? "#ffff9f" :
                props.status === LetterCellStatusEnum.INCORRECT ? "#ffb3b3" :
                    "#f2f2f2"
  };
  animation-name: ${props => 
      props.shouldColor || props.status === LetterCellStatusEnum.REVEALED ? colorAnimation : 
          props.currentlyFilled ? scaleAnimation : "none"
  };
  animation-duration: ${props => props.shouldColor ? "0.2s" : "0.3s"};
  animation-timing-function: ease-in-out;
  animation-delay: ${props => props.shouldColor ? props.position.valueOf() * 0.2 + "s" : "0s"};
  animation-fill-mode: both;
`;
