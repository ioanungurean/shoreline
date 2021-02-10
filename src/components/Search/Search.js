import React, { useEffect } from "react";
import AsyncSelect from "react-select/async";

import { fetchAutoComplete } from "../../api";
import debounce from "debounce-promise";

import { StyledSearch } from "./StyledSearch";

const Search = ({ onSelect }) => {
  const loadOptions = (inputValue) => fetchAutoComplete(inputValue);

  const debouncedLoadOptions = debounce(loadOptions, 1000, {
    leading: true,
  });

  return (
    <StyledSearch>
      <AsyncSelect
        placeholder="Search for symbols or companies"
        cacheOptions
        loadOptions={(inputValue) => debouncedLoadOptions(inputValue)}
        onChange={onSelect}
      />
    </StyledSearch>
  );
};

export default Search;
