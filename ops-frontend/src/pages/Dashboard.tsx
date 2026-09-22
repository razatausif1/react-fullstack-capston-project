import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const stats = [
  { label: "Products", value: "4", icon: <Inventory2OutlinedIcon color="primary" /> },
  { label: "Suppliers", value: "Live", icon: <LocalShippingOutlinedIcon color="primary" /> },
  { label: "Customers", value: "3", icon: <PeopleOutlinedIcon color="primary" /> },
];

const Dashboard = () => <Container maxWidth="lg" className="page-container">
  <Typography variant="overline" color="primary" className="page-kicker">OVERVIEW</Typography>
  <Typography variant="h3" className="page-title">Good morning, Admin</Typography>
  <Typography color="text.secondary" className="page-description">Here is what is happening across your operations.</Typography>
  <Box className="dashboard-stat-grid">{stats.map((stat) => <Card key={stat.label} className="dashboard-stat-card"><CardContent><Box className="dashboard-stat-content"><Box><Typography color="text.secondary">{stat.label}</Typography><Typography variant="h4" className="dashboard-stat-value">{stat.value}</Typography></Box>{stat.icon}</Box></CardContent></Card>)}</Box>
</Container>;

export default Dashboard;