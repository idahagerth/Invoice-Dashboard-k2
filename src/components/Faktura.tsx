import { useDefaultProvider } from "../context/Default";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import uuid from "react-uuid";
import axios from "axios";

function Faktura() {
  const [show, setShow] = useState(false);
  const { isMobile, projects, tasks, timeLogs, setDeleteStatus, invoices } =
    useDefaultProvider();
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [invoicedTasks, setInvoicedTasks] = useState<any[]>([]);
  const [invoicedProject, setInvoicedProject] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [totalTime, setTotalTime] = useState<number>(0);
  const [priceTotal, setPriceTotal] = useState<number>(0);

  function createInvoice() {
    let date = new Date();
    date.setDate(date.getDate());

    let dueDate = new Date();

    dueDate.setDate(dueDate.getDate() + 30);

    const invoice = {
      id: uuid(),
      status: "Unpaid",
      due_date: dueDate,
      amount: parseInt(hourlyRate) * totalTime,
      project: projectId,
      customer_name: customer,
      created_date: date,
    };
    axios
      .post(`http://localhost:3000/invoices/`, invoice)
      .then(() => setDeleteStatus("" + uuid()));
  }

  function addTime(taskId: string) {
    const time = timeLogs.filter((obj: { taskId: string }) => {
      return obj.taskId === taskId;
    });
    

    const sec = parseInt(time[0].time.split(":")[2]) / 3600; //sec to hours
    const min = parseInt(time[0].time.split(":")[1]) / 60; //min to hours
    const h = parseInt(time[0].time.split(":")[0]);

    const total = sec + min + h;

    setTotalTime(totalTime + total);

    
  }

  function handleTask(name: string) {
    setInvoicedTasks((current) => [...current, name]);
  }
  function handleProject(name: string) {
    setInvoicedProject(name);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  type FuTs = {
    name: string;
    proj: string;
    id: string;
    hourlyrate: string;
    iv: string;
    customer_name: string;
    amount: number;
    due_date: string;
    status: string;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginTop: isMobile ? "60px" : "0px" }}
      >
        Create invoice
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="horizontal" gap={4}>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                id="input-group-dropdown-1"
                title={projectName ? projectName : "project"}
              >
                {projects.map((proj: FuTs) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setInvoicedProject(proj.name);
                        setProjectName(proj.name);
                        setProjectId(proj.id);
                        setHourlyRate(proj.hourlyrate);
                      }}
                    >
                      {proj.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <DropdownButton
                variant="outline-secondary"
                id="input-group-dropdown-1"
                title={projectName ? "task" : null}
              >
                {tasks
                  .filter((obj: { projectId: string }) => {
                    return obj.projectId === projectId;
                  })
                  .map((item: FuTs) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          handleTask(item.name);
                          addTime(item.id);
                        }}
                      >
                        {item.name}
                      </Dropdown.Item>
                    );
                  })}
              </DropdownButton>
              <Form.Control
                aria-label="Text input with dropdown button"
                onChange={(e) => setCustomer(e.target.value)}
                value={customer}
                placeholder="customer name"
              />
            </InputGroup>
          </Stack>

          <Container>
            <Row className="justify-content-md-right">
              <Col xl="5" sm>
                <Table striped bordered hover>
                  {invoicedProject ? (
                    <thead>
                      <tr>
                        <th>Tasks</th>
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {invoicedTasks
                      ? invoicedTasks.map((task) => {
                          return (
                            <tr>
                              <td>{task}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              createInvoice();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((iv: FuTs) => {
            return (
              <tr>
                <td>{iv.customer_name}</td>
                <td>{iv.amount}</td>
                <td>{iv.due_date}</td>
                <td>{iv.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Faktura;
