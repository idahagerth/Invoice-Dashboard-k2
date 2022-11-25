import { createContext, useContext, useState } from "react";

export const DefaultContext = createContext();

export function DefaultProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [invoices, setinvoices] = useState([]);

  return (
    <DefaultContext.Provider
      value={{
        isMobile,
        setIsMobile,
        projects,
        setProjects,
        deleteStatus,
        setDeleteStatus,
        tasks,
        setTasks,
        timeLogs,
        setTimeLogs,
        invoices,
        setinvoices,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
}

export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context) {
    throw new Error("useDefaultProvider is outside of defaultProvider");
  }

  return context;
}
