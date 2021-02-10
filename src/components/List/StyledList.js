import styled, { css } from "styled-components";

export const StyledList = styled.ul`
  display: flex;
  list-style-type: none;
`;

export const StyledListItem = styled.li`
  padding: 4px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #0f69ff;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: #fff;
      background-color: #0f69ff;

      &:hover {
        color: #fff;
      }
    `}
`;
