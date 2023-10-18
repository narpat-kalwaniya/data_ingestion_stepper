import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Missing Data Source", value: 1 },
  { name: "Missing Attributes", value: 2 },
  {
    name: "New Attributes",
    value: 3,
  },
  {
    name: "Data Type Changed",
    value: 1,
  },
  {
    name: "Ordinal Position Changed",
    value: 1,
  },
];

const COLORS = [
  "#4f4f4f",
  "rgb(245, 181, 110)",
  "rgb(145, 211, 239)",
  "#90EE90",
  "#b3c100",
];
const legendStyle = {
  fontSize: "10px", // Adjust the font size as desired for the legend
};

const renderCenterLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  return (
    <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#888">
      {`${data.reduce((acc, entry) => acc + entry.value, 0)}`}
    </text>
  );
};

const SchemaSummary = () => {
  return (
    <PieChart width={300} height={346}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        label={renderCenterLabel}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        formatter={(value, entry) => <span style={legendStyle}>{value}</span>} // Apply custom style to legend text
        iconType="circle"
        iconSize={10}
      />
    </PieChart>
  );
};

export default SchemaSummary;
