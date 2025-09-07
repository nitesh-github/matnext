import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export default function Sidebar() {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Users", icon: <PeopleIcon />, path: "/users/user-list" },
    { text: "Customers", icon: <PeopleIcon />, path: "/customers/customer-list" },
    { text: "Products", icon: <ShoppingCartIcon />, path: "/products" },
  ];

  return (
    <>
      <List>
        {menuItems.map((item, index) => (
          //   <ListItem key={index} disablePadding>
          //   <ListItemButton component={Link} href={item.path}>
          //     <ListItemIcon>{item.icon}</ListItemIcon>
          //     <ListItemText primary={item.text} />
          //   </ListItemButton>
          // </ListItem>
          <Link
            href={item.path}
            passHref
            key={index}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <ListItem>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
