import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useDefaultProvider } from "../context/Default";

function SideBar() {
  const { isMobile } = useDefaultProvider();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: isMobile ? "" : "98vh",
      }}
    >
      {isMobile ? null : (
        <Sidebar>
          <Menu>
            <MenuItem routerLink={<Link to="/Dashboard" />}>
              {" "}
              Dashboard{" "}
            </MenuItem>
            <SubMenu label="Projects">
              <MenuItem routerLink={<Link to="/Projects" />}>
                {" "}
                Projects{" "}
              </MenuItem>
              <MenuItem routerLink={<Link to="/Tasks" />}> Tasks </MenuItem>
            </SubMenu>
            <MenuItem routerLink={<Link to="/TimeLogs" />}> TimeLogs </MenuItem>
            <MenuItem routerLink={<Link to="/Faktura" />}> Faktura </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
}

export default SideBar;
