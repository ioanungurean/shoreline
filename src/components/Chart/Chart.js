import React, { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleTime,
  max,
  extent,
} from "d3";

import List from "../List/List";

import { StyledChart } from "./StyledChart";

const Chart = ({
  width = 840,
  height = 360,
  data,
  ranges,
  range,
  setRange,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (data && svgRef.current) {
      const svg = select(svgRef.current);

      const xScale = scaleTime()
        .domain(
          extent(data, function (d) {
            return d.timestamp;
          })
        )
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([
          0,
          max(data, function (d) {
            return d.value;
          }) * 1.2,
        ])
        .range([height, 0]);

      const xAxis = axisBottom(xScale).ticks(6);

      const yAxis = axisRight(yScale);

      const lineChart = line()
        .x((d) => xScale(d.timestamp))
        .y((d) => yScale(d.value))
        .curve(curveCardinal);

      svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      svg
        .select(".y-axis")
        .style("transform", `translateX(${width}px)`)
        .call(yAxis);

      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", lineChart)
        .attr("fill", "none")
        .attr("stroke", "#0f69ff");
    }
  }, [data]);

  return (
    <>
      <StyledChart ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </StyledChart>
      <List items={ranges} selected={range} onClick={setRange} />
    </>
  );
};

export default Chart;
