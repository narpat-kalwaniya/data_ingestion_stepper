import { Table, Form, Input, Col, Row } from "react-bootstrap";
import TableData from "./TableData";


const headers = [
  "",
  ...Object.keys(TableData),
  "TargetDatatype",
  "PrimaryKey",
  "BusinessKey",
  "TransformationLogic",
];

const ThData = () => {
  return headers.map((name) =>  <th key={name}>{name}</th>
  );
};

const TbData = () => {
  return TableData.ColumnName.map((d,index) => (
<tr>
              <td>
                <Form.Check onClick={checkHandler}></Form.Check>
              </td>
              <td>{d}</td>
              <td>{TableData.SourceDatatype[index]}</td>
              {/* <td>
                {TableData.SampleValues[index].map((val) => (
                  <p>{val}</p>
                ))}
              </td> */}
              <td>
                <Form.Select aria-label="Default select example">
                  <option value="1">Datatype1</option>
                  <option value="2">Datatype2</option>
                  <option value="3">Datatype3</option>
                </Form.Select>
              </td>
              <td>
                <Form.Check></Form.Check>
              </td>
              <td>
                <Form.Check></Form.Check>
              </td>
              <td>
                <Form.Control></Form.Control>
              </td>
            </tr>
  ))
  
}
const checkHandler = () => {};

export const TargetSchema = () => {
  return (
      <Table responsive>
        <thead>
          <tr>{ThData()}</tr>
        </thead>
        <tbody>{TbData()}</tbody>
      </Table>
  );
};
