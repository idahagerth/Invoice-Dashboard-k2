import { useDefaultProvider } from "./context/Default";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "./components/SideBar";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Dashboard from "./components/Dashboard";
import TimeLogs from "./components/TimeLogs";
import { useEffect } from "react";
import axios from "axios";

function App() {
  type Name = {
    name: string;
    id: string;
  };
  type Projects = {
    id: string;
    name: string;
    color: string;
  };
  type Tasks = {
    id: string;
    name: string;
    projectId: string;
    projectColor: string;
  };
  type Time = {
    id:string;
    taskId: string;
    start: string;
    end:string;
    time: string;
    date:string;
  }

  const { setProjects, deleteStatus, setTasks, setTimeLogs } = useDefaultProvider();

  useEffect(() => {
    axios.get<Projects[]>("http://localhost:3000/projects").then((res) => {
      console.log(res.data);
      setProjects(res.data);
    });
  }, [deleteStatus]);

  useEffect(() => {
    axios.get<Tasks[]>("http://localhost:3000/tasks").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [deleteStatus]);

  useEffect(() => {
    axios.get<Time[]>("http://localhost:3000/timelogs").then((res) => {
      console.log(res.data);
      setTimeLogs(res.data);
    });
  },[deleteStatus]);

  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TimeLogs" element={<TimeLogs />}/>
      </Routes>
    </div>
  );
}

export default App;
