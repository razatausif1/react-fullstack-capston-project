import { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

type Customer = { name: string; occupation: string; email: string; status: "Active" | "Pending"; image: string };

const customers: Customer[] = [
  { name: "Aarav Sharma", occupation: "Retail Manager", email: "aarav.sharma@example.com", status: "Active", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Mia Johnson", occupation: "Product Director", email: "mia.johnson@example.com", status: "Active", image: "https://i.pravatar.cc/300?img=47" },
  { name: "Rohan Patel", occupation: "Operations Lead", email: "rohan.patel@example.com", status: "Pending", image: "https://i.pravatar.cc/300?img=12" },
  { name: "Sophia Williams", occupation: "Finance Manager", email: "sophia.williams@example.com", status: "Active", image: "https://i.pravatar.cc/300?img=45" },
  { name: "Daniel Brown", occupation: "Business Owner", email: "daniel.brown@example.com", status: "Pending", image: "https://i.pravatar.cc/300?img=13" },
  { name: "Emma Davis", occupation: "Procurement Officer", email: "emma.davis@example.com", status: "Active", image: "https://i.pravatar.cc/300?img=32" },
];

const Customers = () => {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setQuery(searchText.trim()), 300);
    return () => window.clearTimeout(timeoutId);
  }, [searchText]);
  const filteredCustomers = useMemo(() => customers.filter((customer) => {
    const matchesSearch = `${customer.name} ${customer.occupation} ${customer.email}`.toLowerCase().includes(query.toLowerCase());
    return matchesSearch && (statusFilter === "all" || customer.status === statusFilter);
  }), [query, statusFilter]);

  return <Container maxWidth="lg" className="page-container">
    <Box className="page-heading">
      <Typography variant="overline" color="primary" className="page-kicker">RELATIONSHIPS</Typography>
      <Typography variant="h3" className="page-title">Customers</Typography>
      <Typography color="text.secondary">Keep your customer relationships organized and visible.</Typography>
    </Box>
    <Box className="customer-toolbar">
      <TextField className="customer-search" label="Search customers" placeholder="Name, occupation, or email" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <FormControl className="customer-filter"><InputLabel id="customer-status-label">Filter</InputLabel><Select labelId="customer-status-label" value={statusFilter} label="Filter" onChange={(event) => setStatusFilter(event.target.value)}><MenuItem value="all">All customers</MenuItem><MenuItem value="Active">Active</MenuItem><MenuItem value="Pending">Pending</MenuItem></Select></FormControl>
    </Box>
    {filteredCustomers.length === 0 ? <Card><CardContent><Typography color="text.secondary" className="empty-state">No customers match your search.</Typography></CardContent></Card> : <Box className="customer-grid">
      {filteredCustomers.map((customer) => <Card key={customer.email} className="customer-card"><CardContent className="customer-card-content">
        <Box component="img" className="customer-image" src={customer.image} alt={customer.name} />
        <Typography variant="h6" className="customer-name">{customer.name}</Typography>
        <Typography color="text.secondary" className="customer-occupation">{customer.occupation}</Typography>
        <Typography variant="body2" className="customer-email">{customer.email}</Typography>
        <Button variant="contained" color={customer.status === "Active" ? "success" : "warning"} size="small" className="customer-status">{customer.status}</Button>
      </CardContent></Card>)}
    </Box>}
  </Container>;
};

export default Customers;