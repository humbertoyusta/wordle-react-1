import styled, {css, keyframes} from "styled-components";

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

// create a keyframe that makes an element shake horizontally
const shake = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(5px); 
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
        transform: translateX(0);
    }
`;

function getAnimation({shouldShake, currentlyFilled}: {shouldShake: Boolean, currentlyFilled: Boolean}) {
  if (shouldShake && !currentlyFilled) {
    return css`${shake} 0.3s ease-in-out`;
  } else if (!shouldShake && currentlyFilled) {
    return css`${scale} 0.3s ease-in-out`;
  } else if (shouldShake && currentlyFilled) {
    return css`${shake} 0.3s ease-in-out, ${scale} 0.3s ease-in-out`;
  } else {
    return "none";
  }
}

export const LetterCellDiv = styled.div<{status: Number, currentlyFilled: Boolean, shouldShake: Boolean}>`
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
  animation: ${props => getAnimation({
    shouldShake: props.shouldShake, 
    currentlyFilled: props.currentlyFilled
  })};
`;
