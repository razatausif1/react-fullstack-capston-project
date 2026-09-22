//Filepath: src/pages/SupplierPage.tsx
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SupplierList from "../components/suppliers/SupplierList";
import { useCreateSupplierMutation, useDeleteSupplierMutation, useGetSuppliersQuery } from "../store/backendApi";

const SupplierPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState({ name: "", address: "" });
    const { data: suppliers = [], isLoading: loading, isError } = useGetSuppliersQuery();
    const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();
    const [deleteSupplier] = useDeleteSupplierMutation();

    const handleCreate = async () => {
        if (!form.name.trim() || !form.address.trim()) return;
        try {
            await createSupplier({ name: form.name.trim(), address: form.address.trim() }).unwrap();
            setForm({ name: "", address: "" });
            setFormOpen(false);
        } catch {
            // The API error is shown through the page-level query state.
        }
    };

    const handleDelete = async (name: string) => {
        try {
            await deleteSupplier(name).unwrap();
        } catch {
            alert("Delete Failed");
        };
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="lg" className="page-container">
            <Box className="page-heading">
                <Box>
                    <Typography variant="overline" color="primary" className="page-kicker">SUPPLIER MANAGEMENT</Typography>
                    <Typography variant="h3" className="page-title">Suppliers</Typography>
                    <Typography color="text.secondary">Manage your supplier network and contact details.</Typography>
                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} className="supplier-heading-button" onClick={() => setFormOpen(true)}>Add supplier</Button>
                </Box>
            </Box>

            {isError && <Alert severity="error">Failed to load suppliers.</Alert>}

            {suppliers.length === 0 ? <Card><CardContent><Typography color="text.secondary">No suppliers found. Add your first supplier.</Typography></CardContent></Card> : <SupplierList suppliers={suppliers} onDelete={handleDelete} />}

            <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Add supplier</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Supplier name" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <TextField margin="dense" label="Address" fullWidth value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </DialogContent>
                <DialogActions><Button onClick={() => setFormOpen(false)}>Cancel</Button><Button variant="contained" onClick={() => void handleCreate()} disabled={creating || !form.name.trim() || !form.address.trim()}>{creating ? "Saving..." : "Save supplier"}</Button></DialogActions>
            </Dialog>

        </Container>
    );
};

export default SupplierPage;