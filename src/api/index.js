import { timeParse } from "d3";

import { HOST } from "../constants";
import { API_KEY } from "../constants/secrets";
import { GET_CHART, AUTO_COMPLETE } from "../mock";

const formattedChartData = (response) => {
  if (!response.chart.result) return null;

  return response.chart.result[0].timestamp.map((timestamp, index) => {
    return {
      timestamp: timeParse("%s")(timestamp),
      value: response.chart.result[0].indicators.quote[0].close[index],
    };
  });
};

export const fetchChartData = async (symbol, range) => {
  const interval = range === "1d" || range === "5d" ? "60m" : "1d";

  return fetch(
    `${HOST}/stock/v2/get-chart?interval=${interval}&symbol=${symbol}&range=${range}&region=US`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return formattedChartData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // return formattedChartData(GET_CHART);
};

const parseAutoComplete = (response) => {
  return response.quotes.map(({ symbol, longname, typeDisp, exchange }) => {
    return {
      value: symbol,
      label: `${symbol}: ${longname}: ${typeDisp} - ${exchange}`,
    };
  });
};

export const fetchAutoComplete = async (term) => {
  return fetch(`${HOST}/auto-complete?q=${term}&region=US`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return parseAutoComplete(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // return parseAutoComplete(AUTO_COMPLETE);
};
