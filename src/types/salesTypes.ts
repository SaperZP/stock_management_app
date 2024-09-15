export interface ISalesReq {
  brand_id: number;
  product_id: number;
  quantity: number;
  price: string;
}

export interface ISalesResp extends ISalesReq {
  id: number;
  user: string;
  brand: string;
  product: string;
  category: {
    id: number;
    name: string;
  }[];
  price_total: string;
  created: string;
  createds: string;
  time_hour: string;
}
