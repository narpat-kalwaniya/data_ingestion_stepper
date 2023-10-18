import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", SLA: 400, Delay: 2400, amt: 2400 },
  { name: "Feb", SLA: 300, Delay: 4567, amt: 2400 },
  { name: "Mar", SLA: 200, Delay: 1398, amt: 2400 },
  // Add more data points here
];

function DoubleLineChart() {
  return (
    <div>
      <h5
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Daily Failure Trend (In Days)
      </h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="SLA" stroke="#e8c010" name="SLA" />
          <Line type="monotone" dataKey="Delay" stroke="#c93208" name="Delay" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DoubleLineChart;
