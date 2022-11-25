import { useDefaultProvider } from "../context/Default";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";

function TimeLogs() {
  const { timeLogs, tasks } = useDefaultProvider();
  const { setDeleteStatus } = useDefaultProvider();
  const [sum, setSum] = useState(100);

  function handleSum(event: any) {
    setSum(event.target.value);
  }
  function monthNameToNumb(monthName: string) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months.indexOf(monthName);
    return month ? month + 1 : 0;
  }

  type Tasks = {
    id: string;
    name: string;
    projectId: string;
    projectColor: string;
  };
  function getTasksName(id: string) {
    return axios
      .get<Tasks[]>(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        return response.data;
      });
  }

  const deleteTimeLogs = (id: string) => {
    return axios
      .delete(`http://localhost:3000/timelogs/${id}`)
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
    date: string;
    time: string;
    taskId: string;
    start: string;
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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {timeLogs.map((item: Name) => {
                  const [strDay, strMonth, day, year] = item.start.split(" ");
                  const month = monthNameToNumb(strMonth);

                  const past = new Date(
                    year + "-" + month.toString() + "-" + day
                  );
                  const now = new Date();
                  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
                  const diff = now.getTime() - past.getTime();
                  if (diff >= thirtyDaysMs) return;

                  return (
                    <tr key={item.id}>
                      <td>
                        {
                          tasks.filter((obj: { id: string }) => {
                            return obj.id === item.taskId;
                          })[0].name
                        }
                      </td>
                      <td>{item.date}</td>
                      <td style={{ width: "30%" }}>{item.time}</td>

                      <td>
                        <a
                          onClick={() => deleteTimeLogs(item.id)}
                          style={{ paddingRight: "20px" }}
                        >
                          <AiOutlineDelete size={22} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TimeLogs;
