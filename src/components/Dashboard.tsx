import { useDefaultProvider } from "../context/Default";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

function Dashboard() {
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
  type Name = {
    name: string;
    id: string;
    hourlyrate: string;
    date: string;
    time: string;
    taskId: string;
    start: string;
    amount: number;
  };

  const { isMobile, projects, tasks, timeLogs, invoices } =
    useDefaultProvider();
  const [priceTotal, setPriceTotal] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  function monthNameToNumb2(monthName: string) {
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

  useEffect(() => {
    for (let i = 0; i < invoices.length; i++) {
      setPriceTotal((priceTotal) => priceTotal + invoices[i].amount);
    }
  }, [invoices]);

  useEffect(() => {
    for (let i = 0; i < timeLogs.length; i++) {
      const [strDay, strMonth, day, year] = timeLogs[i].start.split(" ");
      const month = monthNameToNumb2(strMonth);

      const past = new Date(year + "-" + month.toString() + "-" + day);
      const now = new Date();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      const diff = now.getTime() - past.getTime();

      const sec = parseInt(timeLogs[0].time.split(":")[2]) / 3600; //sec to hours
      const min = parseInt(timeLogs[0].time.split(":")[1]) / 60; //min to hours
      const h = parseInt(timeLogs[0].time.split(":")[0]);

      const total = sec + min + h;

      setTotalTime(totalTime + total);

      if (diff >= thirtyDaysMs) return;
    }
  }, [timeLogs]);

  return (
    <div>
      <h1
        style={{
          paddingLeft: isMobile ? "15%" : "20%",
          marginTop: isMobile ? "20px" : "0px",
        }}
      >
        Overview
      </h1>
      <Stack
        direction={isMobile ? "vertical" : "horizontal"}
        gap={4}
        style={{ paddingLeft: isMobile ? "17%" : "20%" }}
      >
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Total Projects</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <h1>{projects.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Total Tasks</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <h1>{tasks.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Total Invoices</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <h1>{invoices.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>

      <Stack
        direction={isMobile ? "vertical" : "horizontal"}
        gap={4}
        style={{ paddingLeft: isMobile ? "17%" : "26%", paddingTop: "5%" }}
      >
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Total Time</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <h1>{totalTime}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>Price Amount</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <h1>{priceTotal}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </div>
  );
}

export default Dashboard;
