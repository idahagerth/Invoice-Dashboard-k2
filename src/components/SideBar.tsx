import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";


function SideBar() {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight:"98vh" }}>
      <Sidebar>
        <Menu>
        <MenuItem routerLink={<Link to="/Dashboard" />}> Dashboard </MenuItem>
          <SubMenu label="Projects">
          
            <MenuItem routerLink={<Link to="/Projects" />}> Projects </MenuItem>
            <MenuItem routerLink={<Link to="/Tasks"/>}> Tasks </MenuItem>
            
          </SubMenu>
          <MenuItem> Faktura </MenuItem>
          <MenuItem routerLink={<Link to="/TimeLogs"/>}> TimeLogs </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
