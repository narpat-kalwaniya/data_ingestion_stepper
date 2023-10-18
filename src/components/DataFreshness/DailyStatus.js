import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";

const generateRandomColor = () => {
  const colors = ["#c93208", "green", "#e8c010"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
};

const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

const generateColumnDates = (startDate, numDays) => {
  const columnDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = moment(startDate).add(i, "days");
    columnDates.push(date.format("MMM D, YYYY"));
  }
  return columnDates;
};

const numRows = 3; // Define the number of rows
const numColumns = 14; // Define the number of columns (e.g., 6 days)

const columnDates = generateColumnDates("2023-05-21", numColumns);
const colors = generateRandomColors(numRows);

const DailyStatus = () => {
  return (
    <div style={{ height: "150px", overflowY: "scroll" }}>
      <Table striped bordered hover responsive>
        <caption style={{ captionSide: "top", textAlign: "center" }}>
          Daily Status
        </caption>
        <thead>
          <tr>
            <th>Data Format</th>
            {columnDates.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(numRows)
            .fill(null)
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>uat.public.spotify</td>
                {Array(numColumns)
                  .fill(null)
                  .map((_, colIndex) => (
                    <td key={colIndex}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: colors[rowIndex],
                        }}
                      ></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DailyStatus;
