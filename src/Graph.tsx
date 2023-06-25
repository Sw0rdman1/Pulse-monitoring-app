import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GraphComponentProps {
  heartRateData: number[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ heartRateData }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set up initial graph dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 650 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Create scales for x and y axes
    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height * 2, 20]);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Create a line generator
    const line = d3
      .line<number>()
      .x((_: any, i: any) => xScale(i))
      .y((d: any) => yScale(d));

    // Append the x and y axes to the graph

    // Append a path for the line graph
    svg
      .append("path")
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke", "rgb(4, 171, 115)")
      .style("stroke-width", "2px");

    // Function to update the graph based on heart rate data
    const updateGraph = () => {
      // Update x and y scales
      xScale.domain([0, heartRateData.length - 1]);
      yScale.domain([0, d3.max(heartRateData) || 0]);

      // Select and update the x and y axes
      svg.select<SVGGElement>(".x-axis").call(xAxis);
      svg.select<SVGGElement>(".y-axis").call(yAxis);

      // Update the line graph
      svg.select<SVGPathElement>(".line").datum(heartRateData).attr("d", line);
    };

    // Update the graph whenever heart rate data changes
    updateGraph();

    // Cleanup function
    return () => {
      // Remove the SVG element when the component is unmounted
      svg.selectAll("*").remove();
    };
  }, [heartRateData]);

  return (
    <svg ref={svgRef} width="650" height="250">
      {/* SVG content will be rendered here */}
    </svg>
  );
};

export default GraphComponent;
