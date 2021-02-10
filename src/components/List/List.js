import React from "react";

import { StyledList, StyledListItem } from "./StyledList";

const List = ({ items, selected, onClick }) => {
  return (
    <StyledList>
      {items.map((item) => (
        <StyledListItem
          key={item}
          tabIndex="0"
          selected={selected === item}
          onClick={() => {
            onClick(item);
          }}
        >
          {item}
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default List;
