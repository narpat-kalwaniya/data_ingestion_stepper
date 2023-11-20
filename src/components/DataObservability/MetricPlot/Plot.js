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

const Plot = (props) => {
  const selectedData = props.selectedData;
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

  const y_label = props.selectedMetric;

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
          {/* Missing Attributes Trend */}
        </p>
      </div>
      <LineChart
        width={600}
        height={300}
        data={dataForChart}
        style={{ marginTop: "40px" }}
      >
        <XAxis
          dataKey="date"
          type="category"
          domain={["auto", "auto"]}
          tickFormatter={formatXAxisTick}
          height={50} // Adjust the height to accommodate the font size
          tick={{ style: xAxisLabelStyle }} // Apply the custom style directly
        />
        <YAxis
          dataKey="value"
          tick={{ style: xAxisLabelStyle }}
          label={{
            value: props.selectedMetric,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="value" stroke="rgb(245, 181, 110)" />
        <Tooltip labelFormatter={(date) => formatXAxisTick(new Date(date))} />
      </LineChart>
    </div>
  );
};

export default Plot;
