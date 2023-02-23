import styled from "styled-components";

export const AlertDiv = styled.div<{color: String}>`
  position: fixed;
  top: 10%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: ${props => props.color === "red" ? "#ffb3b3" : "#d4ffbc"};
  color: #000;
  padding: 16px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  & p {
    margin: 0 0 8px;
  }
`;