import React, { Fragment, useEffect, useState } from "react";
import {
    Col,
    Row,
    Button,
    FormGroup,
    Input,
    Table,
    FormText,
} from "reactstrap";
import { read, utils } from "xlsx";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";



const requiredFields = ["Salle"];

function Salle() {
    const [loading, setLoading] = useState(false);
    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/salle");
            const result = response.data;
            console.log("data", result);
            setRows(result);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("fetchData error: ", error);
        }
    };

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                setExcelRows(json);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const uploadData = async () => {
        try {
            setLoading(true);

            const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);

            let requiredValidation = false;

            if (firstItemKeys.length) {
                requiredFields.forEach((element) => {
                    if (!firstItemKeys.find((x) => x === element)) {
                        requiredValidation = true;
                    }
                });
            }

            if (requiredValidation) {
                alert("Required fields " + JSON.stringify(requiredFields));
                setLoading(false);
                return;
            }

            const jokesResponse = (
                await axios.get("http://localhost:3000/salle")
            ).data;
           // const jokeList = jokesResponse.data || [];
            const jokes = excelRows.map((obj) => ({
                salle: obj["Salle"] || "",
            }));

            const updatedJokes = jokes.filter((x) => x._id);
            const newJokes = jokes.filter((x) => !x._id);

            if (updatedJokes.length) {
                const result = (
                    await axios.post(
                        "http://localhost:3000/salle/updateSalle",
                        updatedJokes
                    )
                ).data;

                if (result) {
                    alert("Successfully updated " + updatedJokes.length + " documents");
                }
            }

            if (newJokes.length) {
                const result = (
                    await axios.post(
                        "http://localhost:3000/salle/addSalle",
                        newJokes
                    )
                ).data;

                if (result) {
                    alert("Successfully added " + newJokes.length + " documents");
                }
            }

            fetchData();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("uploadData error: ", error);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setExcelRows([]);
        window.location.reload();
    };

    const handleDeleteAllSalles = () => {
        axios.delete('http://localhost:3000/salle/delete/all') 
          .then((response) => {
            console.log(response.data.message);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting all classes:", error.response.data.error);
          });
      };

    function renderDataTable() {
        return (
            <div>


                <Table border={1}>
                    <thead>
                        <tr style={{ color: "white" }}>
                            <th>Classe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((item, idx) => (
                            <tr style={{ color: "white" }} key={idx}>
                                <td>{item.salle}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#071329" }}>
            <NavBar></NavBar>

            <Fragment>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div className="container">
                    <Row>

                        <Col md="6 text-left">
                            <FormGroup>
                                <Input
                                    id="inputEmpGroupFile"
                                    name="file"
                                    type="file"
                                    onChange={readUploadFile}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                />
                                <FormText>
                                    {
                                        "You can upload a file that contains 299 line max , the file header should be : "
                                    }
                                    {requiredFields.join(", ")}
                                </FormText>
                            </FormGroup>
                        </Col>
                    
                        <Col md="6 text-left">
                            {selectedFile?.name && (
                                <Button disabled={loading} color="success" onClick={uploadData}>
                                    {"Upload data"}
                                </Button>
                            )}{" "}
                            {selectedFile?.name && (
                                <Button disabled={loading} color="danger" onClick={removeFile}>
                                    {"Remove file"}
                                </Button>
                            )}
                            <Button color="danger" type="submit" onClick={handleDeleteAllSalles}>Delete all classes</Button>
                        </Col>
                    </Row>
                    {loading && <progress style={{ width: "100%" }}></progress>}
                    
                    {renderDataTable()}
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Fragment>
            <Footer></Footer>
        </div>
    );
}

export default Salle;