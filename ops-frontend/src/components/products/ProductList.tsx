import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { Product } from "../../types/Product";

interface Props {
  products: Product[];
}

const shortTitle = (title: string) => {
  const words = title.trim().split(/\s+/);
  return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : title;
};

const ProductList = ({ products }: Props) => {
  return <Box className="product-grid">
    {products.map((product) => {
      return <Box key={product.id} className="product-cell">
        <Card className="product-card">
          {product.thumbnail && <Box component="img" className="product-image" src={product.thumbnail} alt={product.name} />}
          <CardContent className="product-content">
            <Typography variant="h6" className="product-title">{shortTitle(product.name)}</Typography>
            <Box className="product-category">
              <Chip label={`${product.availableQty} available`} color="success" size="small" />
            </Box>
            <Typography color="text.secondary" className="product-category">{product.category} · {product.subcategory}</Typography>
            <Typography variant="h5" color="primary" className="product-price">₹{product.price.toLocaleString()}</Typography>
            <Button fullWidth variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} className="product-cart">
              Add to cart
            </Button>
          </CardContent>
        </Card>
      </Box>;
    })}
  </Box>;
};

export default ProductList;