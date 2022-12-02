import { useDefaultProvider } from "../context/Default";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

function Tasks() {
  const { tasks, projects } = useDefaultProvider();
  const { setDeleteStatus } = useDefaultProvider();

  const deleteTasks = (id: string) => {
    return axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setDeleteStatus("Delete Successful" + `${id}`));
  };

  type Name = {
    name: string;
    id: string;
    projectId: string;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Container style={{ paddingTop: "50px" }}>
        <Row className="justify-content-md-center">
          <Col xl="11" sm>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tasks</th>
                  <th>Project Name</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((item: Name) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ width: "50%" }}>
                      {
                        projects.filter((obj: { id: string }) => {
                          return obj.id === item.projectId;
                        })[0].name
                      }
                    </td>
                    <td style={{ width: "25%" }}>
                      <a
                        onClick={() => deleteTasks(item.id)}
                        style={{ paddingRight: "20px" }}
                      >
                        <AiOutlineDelete size={22} />
                      </a>
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

export default Tasks;
