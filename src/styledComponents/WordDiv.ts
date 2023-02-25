/*convert this component to a normal styled component*/
import styled, {keyframes} from "styled-components";

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

export const WordDiv = styled.div<{shouldShake: Boolean}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  animation: ${props => props.shouldShake ? shake : "none"} 0.3s ease-in-out;
`;