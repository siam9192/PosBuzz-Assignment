export interface Sale {
  id: string
  product_id: string
  quantity: number
  total_price: number
  created_at: string
  updated_at: string
}

export type CreateSalePayload = {
    productId:string,
    quantity:string
}