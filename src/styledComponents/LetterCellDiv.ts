import styled from "styled-components";

export const LetterCellDiv = styled.div<{status: Number}>`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 45px;
  height: 45px;
  margin: 3px;
  background-color: ${props =>
          props.status === 1 ? "#d4ffbc" :
                  props.status === 2 ? "#ffff9f" :
                          props.status === 3 ? "#ffb3b3" :
                                  "#f2f2f2"
  };
`;
