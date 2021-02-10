import React, { useEffect, useState } from "react";

import { RANGES } from "./constants";
import { fetchChartData } from "./api";

import Search from "./components/Search/Search";
import Chart from "./components/Chart/Chart";

import { StyledApp } from "./styles/StyledApp";
import GlobalStyle from "./styles/GlobalStyles";

const App = () => {
  const [symbol, setSymbol] = useState("");
  const [range, setRange] = useState(RANGES[0]);
  const [chartData, setChartData] = useState(null);

  const handleChartData = async () => {
    const formattedData = await fetchChartData(symbol, range);
    setChartData(formattedData);
  };

  useEffect(() => {
    if (symbol) {
      handleChartData();
    }
  }, [symbol, range]);

  const onSelect = (selection) => {
    setSymbol(selection.value);
  };

  return (
    <StyledApp>
      <GlobalStyle />
      <Search onSelect={onSelect} />
      {symbol && chartData && (
        <Chart
          symbol={symbol}
          data={chartData}
          ranges={RANGES}
          range={range}
          selectedRange={range}
          setRange={setRange}
        />
      )}
      {symbol}
    </StyledApp>
  );
};

export default App;
