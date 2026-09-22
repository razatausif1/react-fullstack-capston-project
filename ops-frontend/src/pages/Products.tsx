import { Alert, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useGetProductsQuery } from "../store/productApi";
import ProductList from "../components/products/ProductList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setProductPage } from "../store/productPaginationSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Products() {
  const { data: products = [], isLoading: loading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  const { page, pageSize } = useAppSelector((state) => state.productPagination);
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const visiblePageCount = Math.min(pageCount, Math.max(3, currentPage + 1));

  return <Container maxWidth="lg" className="page-container">
    <Box className="page-heading">
      <Box>
        <Typography variant="overline" color="primary" className="page-kicker">INVENTORY</Typography>
        <Typography variant="h3" className="page-title">Products</Typography>
        <Typography color="text.secondary">View inventory, availability, and pricing at a glance.</Typography>
      </Box>
    </Box>
    {isError && <Alert severity="error" className="page-alert">Unable to load products from DummyJSON.</Alert>}
    {loading ? <CircularProgress /> : products.length ? <>
      <ProductList products={paginatedProducts} />
      <Box className="product-pagination">
        <Typography variant="body2" color="text.secondary">Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, products.length)} of {products.length} products</Typography>
        <Box className="product-page-numbers">
          <Button aria-label="Previous page" variant="outlined" color="primary" className="product-page-button" onClick={() => dispatch(setProductPage(currentPage - 1))} disabled={currentPage === 1}>
            <ArrowBackIcon />
          </Button>
          {Array.from({ length: visiblePageCount }, (_, index) => index + 1).map((pageNumber) => (
            <Button key={pageNumber} variant={pageNumber === currentPage ? "contained" : "outlined"} color="primary" className="product-page-button" onClick={() => dispatch(setProductPage(pageNumber))}>
              {pageNumber}
            </Button>
          ))}
          <Button aria-label="Next page" variant="outlined" color="primary" className="product-page-button" onClick={() => dispatch(setProductPage(currentPage + 1))} disabled={currentPage === pageCount}>
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </> : <Typography color="text.secondary">No products found.</Typography>}
  </Container>;
}

export default Products;