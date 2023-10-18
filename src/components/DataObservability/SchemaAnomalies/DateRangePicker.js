import React, { useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = (props) => {
  const dateRange = props.dateRange;
  const setDateRange = props.setDateRange;
  const [openDatePicker, setOpenDatePicker] = useState(null);
  const handleDateChange = (date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
      setOpenDatePicker("end");
    } else {
      if (date >= dateRange.start) {
        setDateRange({ ...dateRange, end: date });
      } else {
        setDateRange({ start: date, end: null });
      }
      setOpenDatePicker("start");
    }
  };

  console.log(dateRange);
  return (
    <Row>
      <Row className="mb-2">
        <Col>
          <Form.Label
            style={{
              color: "#4f4f4f",
              fontSize: "12px",
              opacity: "0.8",
              marginLeft: "5px",
              marginBottom: "2px",
              marginTop: "5px",
            }}
          >
            Start Date
          </Form.Label>
        </Col>
        <Col>
          <DatePicker
            className="custom-select custom-style"
            selected={dateRange.start}
            selectsStart
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={handleDateChange}
            onClickOutside={() => setOpenDatePicker(null)}
            open={openDatePicker === "start"}
            style={{ border: "none" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label
            style={{
              color: "#4f4f4f",
              fontSize: "12px",
              opacity: "0.8",
              marginLeft: "5px",
              marginBottom: "2px",
              marginTop: "5px",
            }}
          >
            End Date
          </Form.Label>
        </Col>
        <Col>
          <DatePicker
            className="custom-select custom-style"
            selected={dateRange.end}
            selectsEnd
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={handleDateChange}
            onClickOutside={() => setOpenDatePicker(null)}
            open={openDatePicker === "end"}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default DateRangePicker;
