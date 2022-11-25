import { useDefaultProvider } from "./context/Default";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Dashboard from "./components/Dashboard";
import TimeLogs from "./components/TimeLogs";
import Faktura from "./components/Faktura";
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
    id: string;
    taskId: string;
    start: string;
    end: string;
    time: string;
    date: string;
  };

  const {
    setProjects,
    deleteStatus,
    setTasks,
    setTimeLogs,
    setinvoices,
    setIsMobile,
  } = useDefaultProvider();

  function handleSize() {
    
    return window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    return window.addEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    return window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  useEffect(() => {
    axios.get<Projects[]>("http://localhost:3000/projects").then((res) => {
      
      setProjects(res.data);
    });
  }, [deleteStatus]);

  useEffect(() => {
    axios.get<Tasks[]>("http://localhost:3000/tasks").then((res) => {
      
      setTasks(res.data);
    });
  }, [deleteStatus]);

  useEffect(() => {
    axios.get<Time[]>("http://localhost:3000/timelogs").then((res) => {
      
      setTimeLogs(res.data);
    });
  }, [deleteStatus]);

  useEffect(() => {
    axios.get("http://localhost:3000/invoices").then((res) => {
      setinvoices(res.data);
    });
  }, [deleteStatus]);

  return (
    <div className="App">
      <SideBar />
      <NavBar />
      <Routes>
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TimeLogs" element={<TimeLogs />} />
        <Route path="/Faktura" element={<Faktura />} />
      </Routes>
    </div>
  );
}

export default App;
