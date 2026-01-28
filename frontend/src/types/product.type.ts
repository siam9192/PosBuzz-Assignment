export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export type CreateProductPayload = Pick<Product, "name" | "sku" | "price" | "stock_quantity">;

export type UpdateProductPayload = Partial<CreateProductPayload>;
