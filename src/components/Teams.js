import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Table, Button } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";


function Teams() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [numTeams, setNumTeams] = useState();

    const handleNumTeamsChange = (event) => {
        const value = parseInt(event.target.value);
        setNumTeams(value);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/team");
            const result = response.data;
            console.log("data", result);
            setRows(result);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("fetchData error: ", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Liste des equipes displonible :", 10, 10);


        const tableData = rows.map(item => [
            `Team ${rows.indexOf(item) + 1}`,
            item.students.map(student => `${student.nom} ${student.prenom}`).join("\n"),
            item.students.map(student => student.email).join("\n"),
            item.students.map(student => student.ci).join("\n"),
            item.salle,
            item.tuteur
        ]);

        doc.autoTable({
            head: [["Numero d'equipe", "Nom et Prenom", "Email", "classe internationale", "Salle", "Tuteur"]],
            body: tableData

        });

        doc.save("teams.pdf");
    };
    const generateTeams = async () => {


        try {
            if (!numTeams || numTeams <= 0) {
                alert("Please enter a valid number of teams to generate.");
                return;
            }
            setLoading(true);
            const response = await axios.post("http://localhost:3000/team/generate", { numTeams });
            const generatedTeams = response.data;
            console.log("Generated teams:", generatedTeams);
            setRows(generatedTeams);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("generateTeams error: ", error);
        }
    };

    const sendMail = async () => {

        try {

            setLoading(true);
            const response = await axios.post("http://localhost:3000/team/send");
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDeleteTeams = (id) => {
        axios.delete(`http://localhost:3000/team/${id}`)
            .then((response) => {
                console.log(response.data.message);
                console.log("Deleted team:", response.data.deletedStudent);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting student:", error.response.data.error);
            });
    };

    const handleDeleteAllTeams = () => {
        axios.delete('http://localhost:3000/team/delete/all')
            .then((response) => {
                console.log(response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting all teams:", error.response.data.error);
            });
    };
  

    const exportToExcel = () => {
        const formattedData = rows.map((item) => {
          const studentsInfo = item.students
            .map(
              (student) =>
                `Team ${rows.indexOf(item) + 1}: ${student.nom} ${student.prenom} (${student.email})\n`
            )
            .join("");
          return {
            "Student Full Name": studentsInfo,
            Room: item.salle,
            Tutor: item.tuteur,
          };
        });
      
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
      
        // Adjusting column widths
        const colWidths = [
          { wpx: 500 }, 
          { wpx: 100 }, 
          { wpx: 150 }, 
        ];
        worksheet["!cols"] = colWidths;
      

        formattedData.forEach((_, index) => {
          const cellAddress = `A${index + 2}`; 
          worksheet[cellAddress].s = { alignment: { wrapText: true } };
        });
      
        const headerStyle = XLSX.utils.book_new();
        headerStyle.SheetNames.push("Teams Data");
        headerStyle.Sheets["Teams Data"] = worksheet;
      
        XLSX.writeFile(headerStyle, "teams.xlsx");
      };
    function renderDataTable() {
        return (
            <div className="table-responsive">
                <Table bordered>
                    <thead>
                        <tr style={{ color: "white" }}>
                            <th>Team Number</th>
                            <th>Student full name</th>
                            <th>Insternational class</th>
                            <th>Email1</th>
                            <th>Email2</th>
                            <th>Room</th>
                            <th>Tutor</th>
                            <th>Delete Team</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                        {rows.map((item, idx) => (
                            <tr key={idx}>
                                <td>Team {idx + 1}</td>
                                <td>
                                    <ul>
                                        {item.students.map((student, studentIdx) => (
                                            <li key={studentIdx}>
                                                {student.nom} {student.prenom}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {item.students.map((student, studentIdx) => (
                                            <li key={studentIdx}>
                                                {student.ci}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {item.students.map((student, studentIdx) => (
                                            <li key={studentIdx}>
                                                {student.email}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {item.students.map((student, studentIdx) => (
                                            <li key={studentIdx}>
                                                {student.email1}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{item.salle}</td>
                                <td>{item.tuteur}</td>
                                <td>
                                    <Button color="danger" onClick={() => handleDeleteTeams(item._id)}>Delete</Button>
                                </td>
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
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div className="container">
                    <Row>
                        <Col md="6 text-left">
                            <form onSubmit={generateTeams}>
                                <input
                                    type="number"
                                    placeholder="Number of teams to generate"
                                    value={numTeams}
                                    onChange={handleNumTeamsChange}
                                />
                                <Button type="submit" color="primary">
                                    Generate Teams
                                </Button>
                                <Button color="success" onClick={exportToPDF}>
                                    Export to PDF
                                </Button>
                            
                            </form>
                        </Col>
                        <Button color="info" onClick={exportToExcel}>
                            Export to Excel
                        </Button>
                        <Button color="danger" type="submit" onClick={handleDeleteAllTeams}>Delete all teams</Button>
                        <Button color="success" onClick={sendMail}>
                                    Send email 
                                </Button>

                    </Row>

                    {loading && <progress style={{ width: "100%" }}></progress>}

                    {renderDataTable()}
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Fragment>
            <Footer></Footer>
        </div>
    );
}
export default Teams;