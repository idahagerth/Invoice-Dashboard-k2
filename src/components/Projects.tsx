import { useDefaultProvider } from "../context/Default";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Projects() {
  const { projects, tasks } = useDefaultProvider();
  const { setDeleteStatus } = useDefaultProvider();
  const [sum, setSum] = useState(100);

  function handleSum(event: any) {
    setSum(event.target.value);
  }

  const deleteProject = (id: string) => {
    return axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then(() => setDeleteStatus("Delete Successful" + `${id}`));
  };

  const hourlyRate = (id: string, sum: number) => {
    const faktura = {
      hourlyrate: sum,
    };
    return axios
      .patch(`http://localhost:3000/projects/${id}`, faktura)
      .then(() => setDeleteStatus("" + `${id}`));
  };

  type Name = {
    name: string;
    id: string;
    hourlyrate: string;
    projectId: string;
    tasks: string;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Container style={{ paddingTop: "50px" }}>
        <Row className="justify-content-md-center">
          <Col xl="11" sm>
            <Table size="sm" striped bordered hover>
              <thead>
                <tr>
                  <th>Projects</th>
                  <th>Hourly Rate</th>
                  <th>Price</th>
                  <th># Tasks</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((item: Name) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.hourlyrate}kr</td>

                    <td style={{ width: "25%" }}>
                      <InputGroup className="mb-3">
                        <a
                          onClick={() => deleteProject(item.id)}
                          style={{ paddingRight: "20px" }}
                        >
                          <AiOutlineDelete size={22} />
                        </a>
                        <InputGroup.Text>sek</InputGroup.Text>
                        <Form.Control
                          onChange={handleSum}
                          placeholder={
                            item.hourlyrate !== "0" ? item.hourlyrate : "100"
                          }
                        />

                        <Button
                          onClick={() => hourlyRate(item.id, sum)}
                          variant="primary"
                        >
                          Add
                        </Button>
                      </InputGroup>
                    </td>
                    <td>
                      {
                        tasks.filter((obj: { projectId: string }) => {
                          return obj.projectId === item.id;
                        }).length
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
