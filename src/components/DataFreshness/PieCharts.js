// import React from "react";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Category A", value: 400 },
//   { name: "Category B", value: 300 },
//   { name: "Category C", value: 200 },
//   { name: "Category D", value: 278 },
//   { name: "Category E", value: 189 },
//   // Add more data points as needed
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

// const renderActiveShape = (props) => {
//   const {
//     cx,
//     cy,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//   } = props;

//   const RADIAN = Math.PI / 180;
//   const angle = RADIAN * (endAngle - startAngle);

//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-angle);
//   const y = cy + radius * Math.sin(-angle);

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {`${payload.name} (${(percent * 100).toFixed(2)}%)`}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         fill={fill}
//       />
//       <Sector
//         cx={x}
//         cy={y}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path d={`M${x},${y}L${cx},${cy}`} fill="none" stroke={fill} />
//     </g>
//   );
// };

// function CustomActiveShapePieChart() {
//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <PieChart>
//         <Pie
//           activeShape={renderActiveShape}
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           startAngle={90}
//           endAngle={-270}
//           dataKey="value"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default CustomActiveShapePieChart;

import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Category A", value: 9 },
  { name: "Category B", value: 5 },
];

const COLORS = ["#c93208", "#e8c010", "rgb(145, 211, 239)"];

const renderCenterLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  return (
    <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#888">
      {`${data.reduce((acc, entry) => acc + entry.value, 0)}`}
    </text>
  );
};

const CustomActiveShapePieChart = () => {
  return (
    <div>
      <h5
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Total
      </h5>
      <PieChart width={300} height={230}>
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
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomActiveShapePieChart;
