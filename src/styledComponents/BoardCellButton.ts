// Create a styled component for a board cell with a letter inside
// having a background color depending on the status of the letter
// with borders soft rounded and a shadow
import styled from "styled-components";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export const BoardCellButton = styled.button<{status: Number, letter: String}>`
  justify-content: center;
  align-items: center;
  width: ${props => props.letter.length === 1 ? "56px" : "74px"};
  color: rgba(0, 0, 0, 0.7);
  margin: 4px;
  height: 56px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${props =>
      props.status === LetterCellStatusEnum.REVEALED ? "#bfe7a9" :
          props.status === LetterCellStatusEnum.CORRECT ? "#d4ffbc" :
                  props.status === LetterCellStatusEnum.BAD_POSITION ? "#ffff9f" :
                          props.status === LetterCellStatusEnum.INCORRECT ? "#ffb3b3" :
                                  "#ffffff"
  };
`;