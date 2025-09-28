import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function D3Chart({ budgetData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!budgetData || budgetData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const width = 960;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(['Eat out', 'Rent', 'Groceries'])
      .range(['#ffcd56', '#ff6384', '#36a2eb']);

    const pie = d3.pie()
      .value(d => d.budget);

    const arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = g.selectAll(".arc")
      .data(pie(budgetData))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.title))
      .style("stroke", "white")
      .style("stroke-width", "2px");

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text(d => d.data.title);

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Budget Breakdown (D3.js)");

  }, [budgetData]);

  return (
    <div>
      <svg
        ref={svgRef}
        width="960"
        height="500"
        style={{ display: 'block', margin: '0 auto' }}
      ></svg>
    </div>
  );
}

export default D3Chart;
