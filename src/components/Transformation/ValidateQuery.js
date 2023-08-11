import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import "./ValidateQuery.css";

const ValidateQuery = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileContentClick = (content) => {
    setSelectedFileContent(content);
  };

  const handleFiles = (files) => {
    const textFiles = Array.from(files).filter(
      (file) => file.type === "text/plain"
    );

    if (textFiles.length > 0) {
      textFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, content: content },
          ]);
        };
        reader.readAsText(file);
      });
    } else {
      console.log("Please upload a text file.");
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleDeleteFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <div
      className={`container file-uploader-container ${
        isDragging ? "dragging" : ""
      } w-100`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Row className="w-100">
        <Col md={2} className="full-height">
          <h7>Uploaded Query</h7>
          <div className={`vertical-box ${isDragging ? "dragging" : ""} w-100`}>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-container">
                <div className="file-header">
                  <h7>{file.name}</h7>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFile(file.name)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
                <div
                  className="file-content"
                  onClick={() => handleFileContentClick(file.content)}
                >
                  <pre>{file.content}</pre>
                </div>
              </div>
            ))}

            <input
              type="file"
              id="fileInput"
              accept=".txt"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            <a className="file-input-link" onClick={handleUploadButtonClick}>
              Browse or Drag and Drop your file
            </a>
          </div>
        </Col>
        <Col md={10} className="EnterQueryBox">
          <div className="box-heading w-100">
            <div style={{ textAlign: "left" }}>Enter Query</div>
            <div style={{ textAlign: "right" }}>
              <a
                href="#"
                className="run-link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Run&raquo;&raquo;
              </a>
            </div>
          </div>
          {/* <h7>Enter Query</h7> */}
          <div
            className={`horizontal-box ${isDragging ? "dragging" : ""} w-100`}
          >
            <textarea
              value={selectedFileContent}
              onChange={(e) => setSelectedFileContent(e.target.value)}
            />
          </div>

          <div className="box-heading w-100 ">
            <div style={{ textAlign: "left" }}>Result</div>
            <div style={{ textAlign: "right" }}>
              <a
                href="#"
                className="run-link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Save&raquo;&raquo;
              </a>
            </div>
          </div>
          <div
            className={`horizontal-box ${
              isDragging ? "dragging" : ""
            } w-100 horizontalBoxSIze`}
          >
            {/* Result content */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ValidateQuery;
