//Filepath: src/components/suppliers/SupplierList.tsx
import { Avatar, Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Supplier } from "../../types/Supplier";

interface Props {
    suppliers: Supplier[];
    onDelete: (name: string) => void;
}

const SupplierList = ({ suppliers, onDelete }: Props) => {
    return <Box className="supplier-grid">
        {suppliers.map((supplier) => (
            <Card key={supplier._id} className="supplier-card">
                <CardContent className="supplier-card-content">
                    <Box className="supplier-head">
                        <Avatar className="supplier-avatar">{supplier.name.charAt(0).toUpperCase()}</Avatar>
                        <Box>
                            <Typography variant="h6" className="supplier-name">{supplier.name}</Typography>
                            <Chip label="Active supplier" size="small" color="success" variant="outlined" />
                        </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="supplier-address">{supplier.address}</Typography>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        className="supplier-delete"
                        onClick={() => onDelete(supplier.name)}
                    >
                        Delete supplier
                    </Button>
                </CardContent>
            </Card>
        ))}
    </Box>;
};

export default SupplierList;