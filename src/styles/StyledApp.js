import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > :not(:last-child) {
    margin-bottom: 48px;
  }
`;
