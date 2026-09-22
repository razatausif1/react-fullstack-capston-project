export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  availableQty: number;
  price: number;
  thumbnail?: string;
}
