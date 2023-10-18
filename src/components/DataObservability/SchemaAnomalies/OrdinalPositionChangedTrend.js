import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OrdinalPositionChangedTrend = () => {
  const selectedData = {
    "2023-01-15": 2,
    "2023-03-30": 0,
    "2023-06-15": 1,
    "2023-10-01": 0,
  };

  const dataForChart = Object.keys(selectedData).map((date) => ({
    date: new Date(date), // Convert to JavaScript Date object
    value: selectedData[date],
  }));

  const formatXAxisTick = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const xAxisLabelStyle = {
    fontSize: "10px", // Adjust the font size as desired
  };

  console.log(dataForChart);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          Ordinal Position Changed Trend
        </p>
      </div>
      <LineChart width={600} height={100} data={dataForChart}>
        <XAxis
          dataKey="date"
          type="category"
          domain={["auto", "auto"]}
          tickFormatter={formatXAxisTick}
          height={50} // Adjust the height to accommodate the font size
          tick={{ style: xAxisLabelStyle }} // Apply the custom style directly
        />
        <YAxis dataKey="value" tick={{ style: xAxisLabelStyle }} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="value" stroke="#b3c100" />
        <Tooltip labelFormatter={(date) => formatXAxisTick(new Date(date))} />
      </LineChart>
    </div>
  );
};

export default OrdinalPositionChangedTrend;
