import React from "react";
import "./Volume_Anamoly_Detection.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const VolumeAnomalyDetection = () => {
  return (
    <div className="volume_anomaly_container">
      <div className="volume-anomaly-header">
        <p className="font_styling_heading">Volume - Anomaly Detection </p>
        <p className="font_styling_content">
          This Dashboards helps in identifying varaitions (Spikes and Drops) in
          Data Volume over a period of time.
        </p>
      </div>

      <div className="total_anomaly">
        <div className="total_anomaly_details">
          <p className="Anomaly_change_font_style_first">Total Anamalies</p>
          <p className="Anomaly_change_font_style_second"> 60</p>
        </div>
        <div className="total_anomaly_Link">
          <p className="font_styling_content">
            Click to{" "}
            <span
              style={{
                color: "rgb(135, 206, 235)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Add Metrics
            </span>
          </p>
        </div>
      </div>

      <div className="Anomaly_graph_table">
        <div className="Anomaly_graph">
          <ResponsiveContainer width="80%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="Anomaly_table font_styling_content">
          <p className="list_of_anomalies"> List Of Anomalies</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="Aomaly_change">
        <div className="Aomaly_change_common_style">
          <p className="Anomaly_change_font_style_first"> Previous period</p>
          <p className="Anomaly_change_font_style_second "> 19.89B</p>
        </div>
        <div className="Aomaly_change_common_style">
          {" "}
          <p className="Anomaly_change_font_style_first"> Current Period</p>
          <p className="Anomaly_change_font_style_second "> 21.22B</p>
        </div>
        <div className="Aomaly_change_common_style">
          <p className="Anomaly_change_font_style_first">Difference</p>
          <p className="Anomaly_change_font_style_second Anpmaly_change_color">
            {" "}
            1.32B
          </p>
        </div>
        <div className="Aomaly_change_common_style">
          <p className="Anomaly_change_font_style_first"> % Change</p>
          <p className="Anomaly_change_font_style_second Anpmaly_change_color">
            {" "}
            6.66%
          </p>
        </div>
        <div className="Aomaly_change_common_style">
          <p className="Anomaly_change_font_style_first"> Anomalies</p>
          <p className="Anomaly_change_font_style_second"> 0</p>
        </div>
      </div>

      <div className="Anomaly_Source">
        <div className="Anomaly_Source_Common_style font_styling_content">
          <p>Source </p>
          <p>redshift_uat:uat.public.deezer</p>
        </div>
        <div className="Anomaly_Source_Common_style font_styling_content">
          {" "}
          <p>Attributes </p>
          <p>streams - sum</p>{" "}
        </div>
        <div className="Anomaly_Source_Common_style font_styling_content">
          {" "}
          <p>Group By </p>
          <p>report_date</p>{" "}
        </div>
        <div className="Anomaly_Source_Common_style font_styling_content">
          <p>Time Period </p>
          <p>last 365 Days</p>
        </div>
      </div>

      <div className="Anomaly_zig-zag">
        <div className="Anomaly_zig-zag_graph">
          <LineChart
            width={1000}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default VolumeAnomalyDetection;
