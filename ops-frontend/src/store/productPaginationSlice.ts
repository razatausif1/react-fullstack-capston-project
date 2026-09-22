import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductPaginationState {
  page: number;
  pageSize: number;
}

const initialState: ProductPaginationState = {
  page: 1,
  pageSize: 6,
};

const productPaginationSlice = createSlice({
  name: "productPagination",
  initialState,
  reducers: {
    setProductPage: (state, action: PayloadAction<number>) => {
      state.page = Math.max(1, action.payload);
    },
    resetProductPage: (state) => {
      state.page = 1;
    },
  },
});

export const { setProductPage, resetProductPage } = productPaginationSlice.actions;
export default productPaginationSlice.reducer;
