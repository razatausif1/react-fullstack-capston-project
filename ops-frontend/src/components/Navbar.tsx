// //File : src/components/Navbar.tsx
// src/components/Navbar.tsx

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Navbar = () => {

    const [open, setOpen] =
        useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // const loggedIn =
    //     isAuthenticated();
    const loggedIn = Boolean(useAppSelector((state) => state.auth.token));
    const dispatch = useAppDispatch();

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");
    };

    const menuItems = [
        {
            text: "Products",
            path: "/products"
        },
        {
            text: "Suppliers",
            path: "/suppliers"
        },
        {
            text: "Customers",
            path: "/customers"
        },
        {
            text: "Profile",
            path: "/profile"
        }
    ];

    return (

        <AppBar position="sticky" className="app-navbar">

            <Toolbar className="navbar-toolbar">

                <Box
                    component={Link}
                    to="/"
                    className="navbar-brand"
                >
                    <Box>
                        <Typography variant="h6" className="navbar-title">
                            OPS
                        </Typography>
                        <Typography variant="caption" className="navbar-subtitle">
                            Operations platform
                        </Typography>
                    </Box>
                </Box>

                {/* Desktop Menu */}

                <Box
                    className="navbar-menu"
                >

                    {menuItems.map(item => (

                        <Button
                            key={item.path}
                            color="inherit"
                            component={Link}
                            to={item.path}
                            className={`navbar-link ${location.pathname === item.path ? "navbar-link-active" : ""}`}
                        >
                            {item.text}
                        </Button>

                    ))}

                    {loggedIn ? (
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            className="navbar-logout"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                    )}

                </Box>

                {/* Mobile Menu */}

                <IconButton
                    color="inherit"
                    edge="end"
                    className="navbar-mobile"
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon />
                </IconButton>

            </Toolbar>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >

                <Box
                    className="navbar-drawer"
                    role="presentation"
                >

                    <List>

                        {menuItems.map(item => (

                            <ListItem
                                key={item.path}
                                disablePadding
                            >

                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <ListItemText
                                        primary={item.text}
                                    />

                                </ListItemButton>

                            </ListItem>

                        ))}

                        {!loggedIn ? (

                            <ListItem disablePadding>

                                <ListItemButton
                                    component={Link}
                                    to="/login"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >
                                    <ListItemText primary="Login" />
                                </ListItemButton>

                            </ListItem>

                        ) : (

                            <ListItem disablePadding>

                                <ListItemButton
                                    onClick={() => {

                                        handleLogout();

                                        setOpen(false);
                                    }}
                                >
                                    <ListItemText primary="Logout" />
                                </ListItemButton>

                            </ListItem>

                        )}

                    </List>

                </Box>

            </Drawer>

        </AppBar>

    );
};

export default Navbar;


// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box
// } from "@mui/material";

// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const isLoggedIn = false;

//   return (
//     <AppBar position="static">
//       <Toolbar>

//         <Typography
//           variant="h6"
//         >
//           OPS
//         </Typography>

//         <Box>

//           <Button
//             color="inherit"
//             component={Link}
//             to="/products"
//           >
//             Products
//           </Button>

//           <Button
//             color="inherit"
//             component={Link}
//             to="/suppliers"
//           >
//             Suppliers
//           </Button>

//           <Button
//             color="inherit"
//             component={Link}
//             to="/customers"
//           >
//             Customers
//           </Button>

//           <Button
//             color="inherit"
//             component={Link}
//             to="/profile"
//           >
//             Profile
//           </Button>

//           {!isLoggedIn ? (
//             <Button
//               color="inherit"
//               component={Link}
//               to="/login"
//             >
//               Login
//             </Button>
//           ) : (
//             <Button
//               color="inherit"
//             >
//               Logout
//             </Button>
//           )}

//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;