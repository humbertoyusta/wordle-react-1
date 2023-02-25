import styled, {keyframes} from "styled-components";

// create a keyframe that scales the element up and down
const scale = keyframes`
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

type LetterCellDivProps = {
  status: Number,
  currentlyFilled: Boolean,
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
  background-color: ${props =>
          props.status === 1 ? "#d4ffbc" :
                  props.status === 2 ? "#ffff9f" :
                          props.status === 3 ? "#ffb3b3" :
                                  "#f2f2f2"
  };
  animation: ${props => props.currentlyFilled ? scale : "none"} 0.3s ease-in-out;
`;
